import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MapPin, Clock, Search, Filter } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface DoctorFinderProps {
  onDoctorSelect?: (doctor: any) => void;
}

const DoctorFinder = ({ onDoctorSelect }: DoctorFinderProps) => {
  const { currentLanguage, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      rating: 4.8,
      reviews: 152,
      location: "Downtown Medical Center",
      experience: "15 years",
      availableToday: true,
      consultationFee: 150,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Endocrinologist",
      rating: 4.9,
      reviews: 203,
      location: "City Health Hospital",
      experience: "12 years",
      availableToday: false,
      consultationFee: 120,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Dr. Priya Patel",
      specialty: "General Physician",
      rating: 4.7,
      reviews: 89,
      location: "Community Clinic",
      experience: "8 years",
      availableToday: true,
      consultationFee: 80,
      image: "/placeholder.svg"
    }
  ];

  const specialties = ["All", "Cardiologist", "Endocrinologist", "General Physician", "Dermatologist", "Neurologist"];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "" || selectedSpecialty === "All" || 
                            doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const translations = {
    en: {
      title: "Find Doctors",
      description: "Search and connect with qualified healthcare professionals",
      searchPlaceholder: "Search doctors or specialties...",
      availableToday: "Available Today",
      years: "years experience",
      reviews: "reviews",
      consultationFee: "Consultation Fee",
      bookAppointment: "Book Appointment",
      viewProfile: "View Profile"
    },
    ta: {
      title: "மருத்துவர்களைக் கண்டறியுங்கள்",
      description: "தகுதியான சுகாதார நிபுணர்களைத் தேடி இணைக்கவும்",
      searchPlaceholder: "மருத்துவர்கள் அல்லது சிறப்புகளைத் தேடுங்கள்...",
      availableToday: "இன்று கிடைக்கும்",
      years: "ஆண்டுகள் அனுபவம்",
      reviews: "மதிப்புரைகள்",
      consultationFee: "ஆலோசனை கட்டணம்",
      bookAppointment: "சந்திப்பு முன்பதிவு",
      viewProfile: "சுயவிவரத்தைப் பார்க்கவும்"
    }
  };

  const getText = (key: string) => {
    return translations[currentLanguage as keyof typeof translations]?.[key as keyof typeof translations.en] || 
           translations.en[key as keyof typeof translations.en];
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-6 h-6 text-primary" />
          {getText('title')}
        </CardTitle>
        <CardDescription>
          {getText('description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder={getText('searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {specialties.map((specialty) => (
              <Button
                key={specialty}
                variant={selectedSpecialty === specialty ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSpecialty(specialty)}
              >
                {specialty}
              </Button>
            ))}
          </div>
        </div>

        {/* Doctors List */}
        <div className="space-y-4">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={doctor.image} alt={doctor.name} />
                    <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-semibold">{doctor.name}</h3>
                        <p className="text-muted-foreground">{doctor.specialty}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{doctor.location}</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center gap-1 justify-end md:justify-start">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{doctor.rating}</span>
                          <span className="text-sm text-muted-foreground">({doctor.reviews} {getText('reviews')})</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{doctor.experience} {getText('years')}</p>
                        <p className="text-lg font-semibold text-primary">${doctor.consultationFee}</p>
                        <p className="text-xs text-muted-foreground">{getText('consultationFee')}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mt-4">
                      <div className="flex gap-2">
                        {doctor.availableToday && (
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {getText('availableToday')}
                          </Badge>
                        )}
                        <Badge variant="outline">{doctor.specialty}</Badge>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          {getText('viewProfile')}
                        </Button>
                        <Button size="sm" onClick={() => onDoctorSelect?.(doctor)}>
                          {getText('bookAppointment')}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorFinder;