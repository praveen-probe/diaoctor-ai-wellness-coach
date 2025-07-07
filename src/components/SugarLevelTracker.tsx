import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import VoiceSettings, { VoiceSettings as VoiceSettingsType } from "@/components/VoiceSettings";
import { useVoiceFeedback } from "@/hooks/useVoiceFeedback";
import { Activity, Plus, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SugarReading {
  id: string;
  level: number;
  timestamp: Date;
  category: string;
}

const SugarLevelTracker = () => {
  const [currentLevel, setCurrentLevel] = useState<string>("");
  const [readings, setReadings] = useState<SugarReading[]>([]);
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettingsType>({
    apiKey: '',
    voiceId: 'EXAVITQu4vr4xnSDxMaL',
    enabled: false,
    volume: 0.7
  });
  const { toast } = useToast();
  const { announceBloodSugar } = useVoiceFeedback(voiceSettings);

  useEffect(() => {
    const savedReadings = localStorage.getItem("diaoctor-readings");
    if (savedReadings) {
      const parsed = JSON.parse(savedReadings);
      setReadings(parsed.map((r: any) => ({
        ...r,
        timestamp: new Date(r.timestamp)
      })));
    }
  }, []);

  const getCategory = (level: number): string => {
    if (level < 70) return "Low";
    if (level <= 140) return "Normal";
    if (level <= 200) return "High";
    return "Very High";
  };

  const addReading = async () => {
    const level = parseFloat(currentLevel);
    if (isNaN(level) || level <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid blood sugar level.",
        variant: "destructive",
      });
      return;
    }

    const newReading: SugarReading = {
      id: Date.now().toString(),
      level,
      timestamp: new Date(),
      category: getCategory(level),
    };

    const updatedReadings = [newReading, ...readings.slice(0, 9)];
    setReadings(updatedReadings);
    localStorage.setItem("diaoctor-readings", JSON.stringify(updatedReadings));
    setCurrentLevel("");

    // Announce the blood sugar level with voice feedback
    if (voiceSettings.enabled) {
      await announceBloodSugar(level);
    }

    toast({
      title: "Reading Added",
      description: `Blood sugar level: ${level} mg/dL (${newReading.category})`,
    });
  };

  const removeReading = (id: string) => {
    const updatedReadings = readings.filter(reading => reading.id !== id);
    setReadings(updatedReadings);
    localStorage.setItem("diaoctor-readings", JSON.stringify(updatedReadings));
    toast({
      title: "Reading Removed",
      description: "Blood sugar reading has been deleted.",
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Low":
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "Normal":
        return "bg-wellness-green/20 text-wellness-green border-wellness-green/30";
      case "High":
        return "bg-red-100 text-red-800 border-red-300";
      case "Very High":
        return "bg-red-200 text-red-900 border-red-400";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getTrend = () => {
    if (readings.length < 2) return null;
    const latest = readings[0].level;
    const previous = readings[1].level;
    if (latest > previous) return { icon: TrendingUp, color: "text-red-500", text: "Rising" };
    if (latest < previous) return { icon: TrendingDown, color: "text-wellness-green", text: "Falling" };
    return { icon: Activity, color: "text-medical-blue", text: "Stable" };
  };

  const trend = getTrend();

  return (
    <Card className="bg-gradient-card shadow-medical border-0">
      <CardHeader className="text-center">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-medical-blue" />
            <CardTitle className="text-foreground">Blood Sugar Tracker</CardTitle>
          </div>
          <VoiceSettings onSettingsChange={setVoiceSettings} />
        </div>
        <CardDescription>
          Monitor your blood glucose levels throughout the day with voice feedback
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Input Section */}
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Enter reading (mg/dL)"
            value={currentLevel}
            onChange={(e) => setCurrentLevel(e.target.value)}
            className="border-medical-light focus:border-medical-blue"
            onKeyPress={(e) => e.key === 'Enter' && addReading()}
          />
          <Button 
            onClick={addReading}
            disabled={!currentLevel}
            className="bg-medical-blue hover:bg-medical-blue/90"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Trend Indicator */}
        {trend && readings.length > 0 && (
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
            <span className="text-sm font-medium">Latest: {readings[0].level} mg/dL</span>
            <div className="flex items-center gap-2">
              <trend.icon className={`w-4 h-4 ${trend.color}`} />
              <span className={`text-sm font-medium ${trend.color}`}>{trend.text}</span>
            </div>
          </div>
        )}

        {/* Recent Readings */}
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground">Recent Readings</h3>
          {readings.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No readings yet. Add your first blood sugar reading above.
            </p>
          ) : (
            <div className="space-y-2">
              {readings.map((reading) => (
                <div key={reading.id} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{reading.level} mg/dL</span>
                    <Badge variant="outline" className={getCategoryColor(reading.category)}>
                      {reading.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {reading.timestamp.toLocaleTimeString()}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeReading(reading.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Tips */}
        <div className="p-3 rounded-lg bg-medical-light border border-medical-blue/20">
          <h4 className="font-medium text-medical-blue mb-2">Quick Reference</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>Normal: 70-140 mg/dL</div>
            <div>High: 141-200 mg/dL</div>
            <div>Low: &lt;70 mg/dL</div>
            <div>Very High: &gt;200 mg/dL</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SugarLevelTracker;