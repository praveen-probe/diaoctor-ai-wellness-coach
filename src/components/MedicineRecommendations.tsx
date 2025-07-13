import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pill, ExternalLink, ShoppingCart, Plus, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MedicineRecommendations = () => {
  const { toast } = useToast();
  const [quantities, setQuantities] = useState<{[key: number]: number}>({});
  const [selectedPharmacy, setSelectedPharmacy] = useState<{[key: number]: string}>({});

  const medications = [
    {
      name: "Metformin",
      type: "First-line treatment",
      description: "Helps reduce glucose production by the liver",
      dosage: "500mg twice daily",
      price: "₹45",
      prescription: true,
      pharmacies: [
        { name: "1mg", link: "https://www.1mg.com/drugs/metformin-500mg-tablet-1316" },
        { name: "PharmEasy", link: "https://pharmeasy.in/search/all?name=metformin" },
        { name: "Netmeds", link: "https://www.netmeds.com/catalogsearch/result/?q=metformin" }
      ]
    },
    {
      name: "Glucometer Test Strips",
      type: "Monitoring supplies",
      description: "For daily blood sugar monitoring",
      dosage: "As needed for testing",
      price: "₹350",
      prescription: false,
      pharmacies: [
        { name: "1mg", link: "https://www.1mg.com/categories/diabetes-care-devices-424" },
        { name: "PharmEasy", link: "https://pharmeasy.in/health-care/diabetes-care" },
        { name: "Amazon Pharmacy", link: "https://www.amazon.in/s?k=glucometer+test+strips" }
      ]
    },
    {
      name: "Insulin Pens",
      type: "Injectable medication",
      description: "For blood sugar control when oral medications aren't enough",
      dosage: "As prescribed by doctor",
      price: "₹120",
      prescription: true,
      pharmacies: [
        { name: "1mg", link: "https://www.1mg.com/categories/diabetes-care-424" },
        { name: "PharmEasy", link: "https://pharmeasy.in/health-care/diabetes-care" },
        { name: "Apollo Pharmacy", link: "https://www.apollopharmacy.in/search?searchparam=insulin" }
      ]
    }
  ];

  const updateQuantity = (index: number, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [index]: Math.max(1, (prev[index] || 1) + change)
    }));
  };

  const handleAddToCart = (medIndex: number) => {
    const quantity = quantities[medIndex] || 1;
    const pharmacy = selectedPharmacy[medIndex];
    
    if (!pharmacy) {
      toast({
        title: "Select Pharmacy",
        description: "Please select a pharmacy before adding to cart.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Added to Cart",
      description: `${quantity}x ${medications[medIndex].name} from ${pharmacy}`,
    });
  };

  const handleBuyNow = (medIndex: number) => {
    const pharmacy = selectedPharmacy[medIndex];
    const med = medications[medIndex];
    
    if (!pharmacy) {
      toast({
        title: "Select Pharmacy",
        description: "Please select a pharmacy first.",
        variant: "destructive"
      });
      return;
    }

    const selectedPharmacyData = med.pharmacies.find(p => p.name === pharmacy);
    if (selectedPharmacyData) {
      window.open(selectedPharmacyData.link, '_blank');
    }
  };

  const supplements = [
    { name: "Chromium", benefit: "May improve insulin sensitivity" },
    { name: "Alpha-lipoic acid", benefit: "Antioxidant that may help with nerve health" },
    { name: "Omega-3", benefit: "Supports heart health" },
    { name: "Vitamin D", benefit: "Important for overall health" }
  ];

  return (
    <Card className="bg-gradient-card shadow-medical border-0">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-foreground">
          <Pill className="w-6 h-6 text-medical-blue" />
          Medicine & Supplies
        </CardTitle>
        <CardDescription>
          Common diabetes medications and monitoring supplies
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-3 rounded-lg bg-orange-50 border border-orange-200">
          <p className="text-sm text-orange-800 font-medium">
            ⚠️ Disclaimer: Always consult your healthcare provider before taking any medication. 
            This is for informational purposes only.
          </p>
        </div>

        <div className="space-y-4">
          {medications.map((med, index) => (
            <div key={index} className="p-4 rounded-lg bg-wellness-light border border-wellness-green/20">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{med.name}</h3>
                    <span className="text-medical-blue font-semibold">{med.price}</span>
                    {med.prescription && (
                      <Badge variant="secondary" className="bg-destructive/10 text-destructive border-destructive/20">
                        Rx Required
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-medical-blue font-medium mb-1">{med.type}</p>
                  <p className="text-sm text-muted-foreground mb-2">{med.description}</p>
                  <p className="text-sm font-medium text-foreground">Dosage: {med.dosage}</p>
                </div>
              </div>
              
              {/* Pharmacy Selection */}
              <div className="mt-3 space-y-3">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">
                    Select Pharmacy:
                  </label>
                  <Select 
                    value={selectedPharmacy[index] || ""} 
                    onValueChange={(value) => setSelectedPharmacy(prev => ({...prev, [index]: value}))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose pharmacy" />
                    </SelectTrigger>
                    <SelectContent>
                      {med.pharmacies.map((pharmacy) => (
                        <SelectItem key={pharmacy.name} value={pharmacy.name}>
                          {pharmacy.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Quantity Selection */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">Quantity:</span>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => updateQuantity(index, -1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium">
                      {quantities[index] || 1}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => updateQuantity(index, 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white"
                    onClick={() => handleAddToCart(index)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-medical-blue text-white hover:bg-medical-blue/90"
                    onClick={() => handleBuyNow(index)}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-lg bg-medical-light border border-medical-blue/20">
          <h3 className="font-semibold mb-3 text-foreground">Helpful Supplements</h3>
          <div className="grid gap-2">
            {supplements.map((supplement, index) => (
              <div key={index} className="flex justify-between items-start text-sm">
                <span className="font-medium text-foreground">{supplement.name}</span>
                <span className="text-muted-foreground text-right max-w-xs">{supplement.benefit}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            * Consult your doctor before starting any supplements
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicineRecommendations;