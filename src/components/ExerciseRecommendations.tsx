import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Clock, Heart } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const ExerciseRecommendations = () => {
  const { t } = useLanguage();

  const exercises = [
    {
      category: t("exercise.cardio"),
      icon: Heart,
      color: "text-medical-blue",
      exercises: [
        { name: t("exercise.brisk_walking"), duration: "30 min", frequency: "5 days/week", intensity: "Moderate", totalMinutes: 150 },
        { name: t("exercise.swimming"), duration: "25 min", frequency: "3 days/week", intensity: "Low impact", totalMinutes: 75 },
        { name: t("exercise.cycling"), duration: "25 min", frequency: "4 days/week", intensity: "Moderate", totalMinutes: 100 },
        { name: t("exercise.dancing"), duration: "20 min", frequency: "3 days/week", intensity: "Fun & engaging", totalMinutes: 60 }
      ]
    },
    {
      category: t("exercise.strength"),
      icon: Dumbbell,
      color: "text-wellness-green",
      exercises: [
        { name: t("exercise.squats"), duration: "15 min", frequency: "3 days/week", intensity: "Beginner", totalMinutes: 45 },
        { name: t("exercise.pushups"), duration: "10 min", frequency: "3 days/week", intensity: "Beginner", totalMinutes: 30 },
        { name: t("exercise.resistance"), duration: "15 min", frequency: "3 days/week", intensity: "Light", totalMinutes: 45 },
        { name: t("exercise.dumbbells"), duration: "20 min", frequency: "2 days/week", intensity: "Progressive", totalMinutes: 40 }
      ]
    },
    {
      category: t("exercise.flexibility"),
      icon: Clock,
      color: "text-purple-600",
      exercises: [
        { name: t("exercise.yoga"), duration: "20 min", frequency: "Daily", intensity: "Gentle", totalMinutes: 140 },
        { name: t("exercise.tai_chi"), duration: "20 min", frequency: "3 days/week", intensity: "Low impact", totalMinutes: 60 },
        { name: t("exercise.stretching"), duration: "10 min", frequency: "Daily", intensity: "Gentle", totalMinutes: 70 },
        { name: t("exercise.balance"), duration: "10 min", frequency: "Daily", intensity: "Stability focused", totalMinutes: 70 }
      ]
    }
  ];

  const tips = [
    "Check blood sugar before and after exercise",
    "Start slowly and gradually increase intensity",
    "Stay hydrated during workouts",
    "Exercise at the same time each day when possible",
    "Stop if you feel dizzy or unwell",
    "Carry glucose tablets during exercise"
  ];

  const getIntensityColor = (intensity: string) => {
    if (intensity.includes("Beginner") || intensity.includes("Gentle") || intensity.includes("Light")) {
      return "bg-wellness-green/20 text-wellness-green border-wellness-green/30";
    }
    if (intensity.includes("Moderate")) {
      return "bg-medical-blue/20 text-medical-blue border-medical-blue/30";
    }
    return "bg-secondary text-secondary-foreground";
  };

  return (
    <Card className="bg-gradient-card shadow-medical border-0">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-foreground">
          <Dumbbell className="w-6 h-6 text-medical-blue" />
          Exercise Program
        </CardTitle>
        <CardDescription>
          Safe and effective exercises designed for diabetes management
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {exercises.map((category, index) => {
          const Icon = category.icon;
          return (
            <div key={index} className="space-y-3">
              <div className="flex items-center gap-2">
                <Icon className={`w-5 h-5 ${category.color}`} />
                <h3 className="font-semibold text-foreground">{category.category}</h3>
              </div>
              <div className="grid gap-3">
                {category.exercises.map((exercise, exerciseIndex) => (
                  <div key={exerciseIndex} className="p-3 rounded-lg bg-wellness-light border border-wellness-green/20">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">{exercise.name}</h4>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="bg-medical-blue/10 text-medical-blue border-medical-blue/30">
                          {exercise.totalMinutes} min/week
                        </Badge>
                        <Badge variant="secondary" className={getIntensityColor(exercise.intensity)}>
                          {exercise.intensity}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{exercise.duration}</span>
                      </div>
                      <div>
                        <span className="font-medium">Frequency:</span> {exercise.frequency}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <div className="p-4 rounded-lg bg-medical-light border border-medical-blue/20">
          <h3 className="font-semibold mb-3 text-foreground flex items-center gap-2">
            <Heart className="w-4 h-4 text-medical-blue" />
            Exercise Safety Tips
          </h3>
          <ul className="space-y-2">
            {tips.map((tip, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-medical-blue mt-2 flex-shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-3 rounded-lg bg-orange-50 border border-orange-200">
          <p className="text-sm text-orange-800">
            💡 <strong>Pro tip:</strong> Exercise is most effective when done 1-3 hours after meals 
            to help control post-meal blood sugar spikes.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExerciseRecommendations;