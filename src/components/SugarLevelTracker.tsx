import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Activity, TrendingUp, TrendingDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SugarLevelTracker = () => {
  const [sugarLevel, setSugarLevel] = useState("");
  const [lastReading, setLastReading] = useState<number | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const level = parseFloat(sugarLevel);
    if (isNaN(level)) return;
    
    setLastReading(level);
    setSugarLevel("");
    
    let status = "";
    let variant: "default" | "destructive" = "default";
    
    if (level < 70) {
      status = "Low - Please consume fast-acting carbohydrates immediately";
      variant = "destructive";
    } else if (level >= 70 && level <= 140) {
      status = "Normal - Good job maintaining healthy levels!";
    } else if (level > 140 && level <= 200) {
      status = "Elevated - Consider light exercise and avoid sugary foods";
      variant = "destructive";
    } else {
      status = "High - Please consult your healthcare provider immediately";
      variant = "destructive";
    }
    
    toast({
      title: "Sugar Level Recorded",
      description: status,
      variant,
    });
  };

  const getSugarLevelStatus = (level: number) => {
    if (level < 70) return { text: "Low", color: "text-destructive", icon: TrendingDown };
    if (level <= 140) return { text: "Normal", color: "text-wellness-green", icon: Activity };
    if (level <= 200) return { text: "Elevated", color: "text-orange-500", icon: TrendingUp };
    return { text: "High", color: "text-destructive", icon: TrendingUp };
  };

  return (
    <Card className="bg-gradient-card shadow-medical border-0">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-foreground">
          <Activity className="w-6 h-6 text-medical-blue" />
          Blood Sugar Tracker
        </CardTitle>
        <CardDescription>
          Monitor your glucose levels and get instant feedback
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sugar-level">Blood Sugar Level (mg/dL)</Label>
            <Input
              id="sugar-level"
              type="number"
              placeholder="Enter your reading..."
              value={sugarLevel}
              onChange={(e) => setSugarLevel(e.target.value)}
              className="border-medical-light focus:border-medical-blue"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-medical-blue hover:bg-medical-blue/90"
            disabled={!sugarLevel}
          >
            Record Reading
          </Button>
        </form>
        
        {lastReading && (
          <div className="p-4 rounded-lg bg-wellness-light border border-wellness-green/20">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Last Reading:</span>
              <div className="flex items-center gap-2">
                {(() => {
                  const status = getSugarLevelStatus(lastReading);
                  const Icon = status.icon;
                  return (
                    <>
                      <span className="font-bold">{lastReading} mg/dL</span>
                      <Icon className={`w-4 h-4 ${status.color}`} />
                      <span className={`text-sm font-medium ${status.color}`}>
                        {status.text}
                      </span>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SugarLevelTracker;