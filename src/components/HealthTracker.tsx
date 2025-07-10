import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Activity, Heart, Thermometer, Scale, Pill, Droplet } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useVoiceFeedback } from "@/hooks/useVoiceFeedback";

const HealthTracker = () => {
  const { currentLanguage } = useLanguage();
  const voiceSettings = { enabled: false, apiKey: "", voiceId: "", volume: 0.5 };
  const { announceBloodSugar } = useVoiceFeedback(voiceSettings);
  const [bloodPressure, setBloodPressure] = useState({ systolic: "", diastolic: "" });
  const [heartRate, setHeartRate] = useState("");
  const [temperature, setTemperature] = useState("");
  const [weight, setWeight] = useState("");
  const [bloodSugar, setBloodSugar] = useState("");

  const translations = {
    en: {
      title: "Health Tracker",
      description: "Monitor your vital signs and health metrics",
      bloodPressure: "Blood Pressure",
      heartRate: "Heart Rate",
      temperature: "Temperature",
      weight: "Weight",
      bloodSugar: "Blood Sugar",
      systolic: "Systolic",
      diastolic: "Diastolic",
      bpm: "BPM",
      celsius: "°C",
      fahrenheit: "°F",
      kg: "kg",
      lbs: "lbs",
      mgdl: "mg/dL",
      mmoll: "mmol/L",
      record: "Record",
      normal: "Normal",
      high: "High",
      low: "Low",
      optimal: "Optimal"
    },
    ta: {
      title: "சுகாதார கண்காணிப்பு",
      description: "உங்கள் முக்கிய அறிகுறிகள் மற்றும் சுகாதார அளவீடுகளைக் கண்காணிக்கவும்",
      bloodPressure: "இரத்த அழுத்தம்",
      heartRate: "இதயத் துடிப்பு",
      temperature: "வெப்பநிலை",
      weight: "எடை",
      bloodSugar: "இரத்த சர்க்கரை",
      systolic: "சிஸ்டோலிக்",
      diastolic: "டயாஸ்டோலிக்",
      bpm: "BPM",
      celsius: "°C",
      fahrenheit: "°F",
      kg: "கிலோ",
      lbs: "பவுண்ட்",
      mgdl: "mg/dL",
      mmoll: "mmol/L",
      record: "பதிவு செய்",
      normal: "சாதாரணம்",
      high: "அதிகம்",
      low: "குறைவு",
      optimal: "சிறந்த"
    }
  };

  const getText = (key: string) => {
    return translations[currentLanguage as keyof typeof translations]?.[key as keyof typeof translations.en] || 
           translations.en[key as keyof typeof translations.en];
  };

  const getBloodPressureStatus = (systolic: number, diastolic: number) => {
    if (systolic < 90 || diastolic < 60) return "low";
    if (systolic < 120 && diastolic < 80) return "optimal";
    if (systolic < 140 || diastolic < 90) return "normal";
    return "high";
  };

  const getHeartRateStatus = (rate: number) => {
    if (rate < 60) return "low";
    if (rate <= 100) return "normal";
    return "high";
  };

  const getBloodSugarStatus = (sugar: number) => {
    if (sugar < 70) return "low";
    if (sugar <= 140) return "normal";
    return "high";
  };

  const handleRecordVital = (type: string, value: any) => {
    let status = "normal";
    let message = "";

    switch (type) {
      case "bloodSugar":
        status = getBloodSugarStatus(parseFloat(value));
        message = `Blood sugar ${value} mg/dL is ${status}`;
        announceBloodSugar(parseFloat(value));
        break;
      case "bloodPressure":
        const sys = parseFloat(value.systolic);
        const dia = parseFloat(value.diastolic);
        status = getBloodPressureStatus(sys, dia);
        message = `Blood pressure ${sys}/${dia} is ${status}`;
        break;
      case "heartRate":
        status = getHeartRateStatus(parseFloat(value));
        message = `Heart rate ${value} BPM is ${status}`;
        break;
    }

    // Here you would typically save to a database
    console.log(`Recorded ${type}:`, value, `Status: ${status}`);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-6 h-6 text-primary" />
          {getText('title')}
        </CardTitle>
        <CardDescription>
          {getText('description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bloodPressure" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="bloodPressure" className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span className="hidden md:inline">BP</span>
            </TabsTrigger>
            <TabsTrigger value="heartRate" className="flex items-center gap-1">
              <Activity className="w-4 h-4" />
              <span className="hidden md:inline">HR</span>
            </TabsTrigger>
            <TabsTrigger value="temperature" className="flex items-center gap-1">
              <Thermometer className="w-4 h-4" />
              <span className="hidden md:inline">Temp</span>
            </TabsTrigger>
            <TabsTrigger value="weight" className="flex items-center gap-1">
              <Scale className="w-4 h-4" />
              <span className="hidden md:inline">Weight</span>
            </TabsTrigger>
            <TabsTrigger value="bloodSugar" className="flex items-center gap-1">
              <Droplet className="w-4 h-4" />
              <span className="hidden md:inline">Sugar</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bloodPressure" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="systolic">{getText('systolic')}</Label>
                <Input
                  id="systolic"
                  type="number"
                  placeholder="120"
                  value={bloodPressure.systolic}
                  onChange={(e) => setBloodPressure(prev => ({ ...prev, systolic: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="diastolic">{getText('diastolic')}</Label>
                <Input
                  id="diastolic"
                  type="number"
                  placeholder="80"
                  value={bloodPressure.diastolic}
                  onChange={(e) => setBloodPressure(prev => ({ ...prev, diastolic: e.target.value }))}
                />
              </div>
            </div>
            <Button 
              onClick={() => handleRecordVital("bloodPressure", bloodPressure)}
              disabled={!bloodPressure.systolic || !bloodPressure.diastolic}
              className="w-full"
            >
              {getText('record')} {getText('bloodPressure')}
            </Button>
          </TabsContent>

          <TabsContent value="heartRate" className="space-y-4">
            <div>
              <Label htmlFor="heartRate">{getText('heartRate')} ({getText('bpm')})</Label>
              <Input
                id="heartRate"
                type="number"
                placeholder="72"
                value={heartRate}
                onChange={(e) => setHeartRate(e.target.value)}
              />
            </div>
            <Button 
              onClick={() => handleRecordVital("heartRate", heartRate)}
              disabled={!heartRate}
              className="w-full"
            >
              {getText('record')} {getText('heartRate')}
            </Button>
          </TabsContent>

          <TabsContent value="temperature" className="space-y-4">
            <div>
              <Label htmlFor="temperature">{getText('temperature')} ({getText('celsius')})</Label>
              <Input
                id="temperature"
                type="number"
                step="0.1"
                placeholder="37.0"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
              />
            </div>
            <Button 
              onClick={() => handleRecordVital("temperature", temperature)}
              disabled={!temperature}
              className="w-full"
            >
              {getText('record')} {getText('temperature')}
            </Button>
          </TabsContent>

          <TabsContent value="weight" className="space-y-4">
            <div>
              <Label htmlFor="weight">{getText('weight')} ({getText('kg')})</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                placeholder="70.0"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <Button 
              onClick={() => handleRecordVital("weight", weight)}
              disabled={!weight}
              className="w-full"
            >
              {getText('record')} {getText('weight')}
            </Button>
          </TabsContent>

          <TabsContent value="bloodSugar" className="space-y-4">
            <div>
              <Label htmlFor="bloodSugar">{getText('bloodSugar')} ({getText('mgdl')})</Label>
              <Input
                id="bloodSugar"
                type="number"
                placeholder="100"
                value={bloodSugar}
                onChange={(e) => setBloodSugar(e.target.value)}
              />
            </div>
            <Button 
              onClick={() => handleRecordVital("bloodSugar", bloodSugar)}
              disabled={!bloodSugar}
              className="w-full"
            >
              {getText('record')} {getText('bloodSugar')}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default HealthTracker;