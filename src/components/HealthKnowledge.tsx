import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Heart, AlertCircle, TrendingUp } from "lucide-react";

const HealthKnowledge: React.FC = () => {
  return (
    <Card className="shadow-medical">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <CardTitle className="text-primary">Health Knowledge Center</CardTitle>
        </div>
        <CardDescription>
          Learn essential information about health management and wellness
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="basics" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basics">Basics</TabsTrigger>
            <TabsTrigger value="sugar-levels">Sugar Levels</TabsTrigger>
            <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
            <TabsTrigger value="tips">Daily Tips</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basics" className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">What is Diabetes?</h3>
              <p className="text-sm text-muted-foreground">
                Diabetes is a group of metabolic disorders characterized by high blood sugar levels. 
                It occurs when your body doesn&apos;t produce enough insulin or can&apos;t effectively use the insulin it produces.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-medical-light rounded-lg">
                  <h4 className="font-medium text-medical-blue mb-1">Type 1 Diabetes</h4>
                  <p className="text-xs text-muted-foreground">
                    Body doesn&apos;t produce insulin. Usually diagnosed in children and young adults.
                  </p>
                </div>
                <div className="p-3 bg-wellness-light rounded-lg">
                  <h4 className="font-medium text-wellness-green mb-1">Type 2 Diabetes</h4>
                  <p className="text-xs text-muted-foreground">
                    Body doesn&apos;t use insulin properly. Most common form, often linked to lifestyle.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sugar-levels" className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>Normal Blood Sugar Ranges</span>
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="text-sm font-medium">Fasting (8+ hours)</span>
                  <Badge variant="secondary">70-100 mg/dL</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="text-sm font-medium">2 hours after eating</span>
                  <Badge variant="secondary">&lt; 140 mg/dL</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="text-sm font-medium">A1C (average 3 months)</span>
                  <Badge variant="secondary">&lt; 7%</Badge>
                </div>
              </div>
              <div className="p-3 bg-wellness-light rounded-lg">
                <h4 className="font-medium text-wellness-green mb-2">How to Maintain Normal Levels:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Monitor blood sugar regularly</li>
                  <li>• Follow a balanced diet</li>
                  <li>• Exercise regularly (30 min/day)</li>
                  <li>• Take medications as prescribed</li>
                  <li>• Stay hydrated</li>
                  <li>• Get adequate sleep (7-9 hours)</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="symptoms" className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground flex items-center space-x-2">
                <AlertCircle className="h-4 w-4" />
                <span>Warning Signs</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-medium text-red-800 mb-2">High Blood Sugar</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• Frequent urination</li>
                    <li>• Excessive thirst</li>
                    <li>• Blurred vision</li>
                    <li>• Fatigue</li>
                    <li>• Slow healing wounds</li>
                  </ul>
                </div>
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <h4 className="font-medium text-orange-800 mb-2">Low Blood Sugar</h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Shakiness</li>
                    <li>• Sweating</li>
                    <li>• Confusion</li>
                    <li>• Rapid heartbeat</li>
                    <li>• Dizziness</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tips" className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground flex items-center space-x-2">
                <Heart className="h-4 w-4" />
                <span>Daily Management Tips</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-medical-light rounded-lg">
                  <h4 className="font-medium text-medical-blue mb-2">Morning Routine</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Check blood sugar upon waking</li>
                    <li>• Take morning medications</li>
                    <li>• Eat a balanced breakfast</li>
                    <li>• Plan your day&apos;s meals</li>
                  </ul>
                </div>
                <div className="p-3 bg-wellness-light rounded-lg">
                  <h4 className="font-medium text-wellness-green mb-2">Evening Routine</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Check blood sugar before bed</li>
                    <li>• Reflect on the day&apos;s choices</li>
                    <li>• Prepare healthy snacks</li>
                    <li>• Ensure good sleep hygiene</li>
                  </ul>
                </div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Emergency Preparedness</h4>
                <p className="text-sm text-muted-foreground">
                  Always carry glucose tablets, keep emergency contacts handy, 
                  and wear medical identification. Know when to call your healthcare provider.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default HealthKnowledge;