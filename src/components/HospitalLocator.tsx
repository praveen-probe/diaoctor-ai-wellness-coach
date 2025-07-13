import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Phone, Clock, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HospitalLocator = () => {
  const { toast } = useToast();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [showTokenInput, setShowTokenInput] = useState(true);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  // Mock hospital data - in real app, this would come from an API
  const hospitals = [
    {
      id: 1,
      name: "City General Hospital",
      address: "123 Main Street, Downtown",
      phone: "+1-234-567-8900",
      rating: 4.5,
      type: "General",
      distance: "0.8 km",
      coordinates: [77.2090, 28.6139], // Delhi coordinates as example
      hours: "24/7 Emergency",
      specialties: ["Emergency", "Cardiology", "Orthopedics"]
    },
    {
      id: 2,
      name: "St. Mary's Medical Center",
      address: "456 Health Avenue, Medical District",
      phone: "+1-234-567-8901",
      rating: 4.7,
      type: "Specialized",
      distance: "1.2 km",
      coordinates: [77.2190, 28.6239],
      hours: "6 AM - 10 PM",
      specialties: ["Diabetes Care", "Endocrinology", "Internal Medicine"]
    },
    {
      id: 3,
      name: "Metro Emergency Clinic",
      address: "789 Quick Care Lane, Central",
      phone: "+1-234-567-8902",
      rating: 4.2,
      type: "Clinic",
      distance: "2.1 km",
      coordinates: [77.1990, 28.5939],
      hours: "8 AM - 8 PM",
      specialties: ["Walk-in", "Primary Care", "Lab Services"]
    }
  ];

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    // Get user location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: [number, number] = [position.coords.longitude, position.coords.latitude];
        setUserLocation(coords);
        
        map.current = new mapboxgl.Map({
          container: mapContainer.current!,
          style: 'mapbox://styles/mapbox/light-v11',
          zoom: 12,
          center: coords,
        });

        // Add navigation controls
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

        // Add user location marker
        new mapboxgl.Marker({ color: '#3b82f6' })
          .setLngLat(coords)
          .setPopup(new mapboxgl.Popup().setHTML('<div class="p-2"><strong>Your Location</strong></div>'))
          .addTo(map.current);

        // Add hospital markers
        hospitals.forEach((hospital) => {
          const marker = new mapboxgl.Marker({ color: '#ef4444' })
            .setLngLat(hospital.coordinates as [number, number])
            .setPopup(
              new mapboxgl.Popup().setHTML(`
                <div class="p-3 max-w-xs">
                  <h3 class="font-semibold text-sm">${hospital.name}</h3>
                  <p class="text-xs text-gray-600 mt-1">${hospital.address}</p>
                  <p class="text-xs text-gray-600">${hospital.phone}</p>
                  <div class="flex items-center gap-1 mt-1">
                    <span class="text-yellow-500">★</span>
                    <span class="text-xs">${hospital.rating}</span>
                  </div>
                </div>
              `)
            )
            .addTo(map.current!);
        });

        map.current.on('load', () => {
          // Fit map to show all hospitals
          const bounds = new mapboxgl.LngLatBounds();
          bounds.extend(coords);
          hospitals.forEach(hospital => {
            bounds.extend(hospital.coordinates as [number, number]);
          });
          map.current?.fitBounds(bounds, { padding: 50 });
        });
      },
      (error) => {
        console.error('Geolocation error:', error);
        // Fallback to a default location (Delhi, India)
        const defaultCoords: [number, number] = [77.2090, 28.6139];
        setUserLocation(defaultCoords);
        
        map.current = new mapboxgl.Map({
          container: mapContainer.current!,
          style: 'mapbox://styles/mapbox/light-v11',
          zoom: 11,
          center: defaultCoords,
        });

        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

        // Add hospital markers only
        hospitals.forEach((hospital) => {
          new mapboxgl.Marker({ color: '#ef4444' })
            .setLngLat(hospital.coordinates as [number, number])
            .setPopup(
              new mapboxgl.Popup().setHTML(`
                <div class="p-3 max-w-xs">
                  <h3 class="font-semibold text-sm">${hospital.name}</h3>
                  <p class="text-xs text-gray-600 mt-1">${hospital.address}</p>
                  <p class="text-xs text-gray-600">${hospital.phone}</p>
                  <div class="flex items-center gap-1 mt-1">
                    <span class="text-yellow-500">★</span>
                    <span class="text-xs">${hospital.rating}</span>
                  </div>
                </div>
              `)
            )
            .addTo(map.current!);
        });
      }
    );
  };

  const handleTokenSubmit = () => {
    if (!mapboxToken.trim()) {
      toast({
        title: "Token Required",
        description: "Please enter your Mapbox public token",
        variant: "destructive"
      });
      return;
    }
    setShowTokenInput(false);
    setTimeout(initializeMap, 100);
  };

  const callHospital = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const getDirections = (coordinates: number[]) => {
    if (userLocation) {
      const url = `https://www.google.com/maps/dir/${userLocation[1]},${userLocation[0]}/${coordinates[1]},${coordinates[0]}`;
      window.open(url, '_blank');
    } else {
      const url = `https://www.google.com/maps/search/${coordinates[1]},${coordinates[0]}`;
      window.open(url, '_blank');
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <Card className="bg-gradient-card shadow-medical border-0">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-foreground">
          <MapPin className="w-6 h-6 text-medical-blue" />
          Nearby Hospitals & Clinics
        </CardTitle>
        <CardDescription>
          Find healthcare facilities near you for diabetes care and emergencies
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {showTokenInput ? (
          <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
            <div className="space-y-3">
              <p className="text-sm text-blue-800">
                To show hospital locations on the map, please enter your Mapbox public token.
              </p>
              <p className="text-xs text-blue-600">
                Get your free token at <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="underline">mapbox.com</a>
              </p>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter Mapbox public token"
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleTokenSubmit} size="sm">
                  Load Map
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-64 rounded-lg overflow-hidden border border-gray-200">
            <div ref={mapContainer} className="w-full h-full" />
          </div>
        )}

        {/* Hospital List */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Healthcare Facilities</h3>
          {hospitals.map((hospital) => (
            <div key={hospital.id} className="p-4 rounded-lg bg-wellness-light border border-wellness-green/20">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-foreground">{hospital.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {hospital.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{hospital.address}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span>{hospital.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Navigation className="w-3 h-3" />
                      <span>{hospital.distance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{hospital.hours}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {hospital.specialties.map((specialty, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => callHospital(hospital.phone)}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-medical-blue text-white hover:bg-medical-blue/90"
                  onClick={() => getDirections(hospital.coordinates)}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Directions
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 rounded-lg bg-red-50 border border-red-200">
          <p className="text-sm text-red-800 font-medium">
            🚨 Emergency: For life-threatening situations, call your local emergency number immediately.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default HospitalLocator;