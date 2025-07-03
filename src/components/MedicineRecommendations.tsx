import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pill, ExternalLink } from "lucide-react";

const MedicineRecommendations = () => {
  const medications = [
    {
      name: "Metformin",
      type: "First-line treatment",
      description: "Helps reduce glucose production by the liver",
      dosage: "500mg twice daily",
      orderLink: "https://www.1mg.com/drugs/metformin-500mg-tablet-1316",
      prescription: true
    },
    {
      name: "Glucometer Test Strips",
      type: "Monitoring supplies",
      description: "For daily blood sugar monitoring",
      dosage: "As needed for testing",
      orderLink: "https://www.1mg.com/categories/diabetes-care-devices-424",
      prescription: false
    },
    {
      name: "Insulin Pens",
      type: "Injectable medication",
      description: "For blood sugar control when oral medications aren't enough",
      dosage: "As prescribed by doctor",
      orderLink: "https://www.1mg.com/categories/diabetes-care-424",
      prescription: true
    }
  ];

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
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-3 border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white"
                onClick={() => window.open(med.orderLink, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Order Online
              </Button>
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