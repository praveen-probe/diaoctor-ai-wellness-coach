import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book } from "lucide-react";

const DietSuggestions = () => {
  const mealPlans = [
    {
      meal: "Breakfast",
      foods: [
        { name: "Oatmeal with berries", carbs: "30g", protein: "6g" },
        { name: "Greek yogurt", carbs: "12g", protein: "15g" },
        { name: "Whole grain toast", carbs: "15g", protein: "3g" }
      ],
      totalCarbs: "57g"
    },
    {
      meal: "Lunch", 
      foods: [
        { name: "Grilled chicken breast", carbs: "0g", protein: "26g" },
        { name: "Quinoa salad", carbs: "22g", protein: "4g" },
        { name: "Mixed vegetables", carbs: "10g", protein: "2g" }
      ],
      totalCarbs: "32g"
    },
    {
      meal: "Dinner",
      foods: [
        { name: "Baked salmon", carbs: "0g", protein: "25g" },
        { name: "Sweet potato", carbs: "26g", protein: "2g" },
        { name: "Steamed broccoli", carbs: "6g", protein: "3g" }
      ],
      totalCarbs: "32g"
    }
  ];

  const tips = [
    "Eat at consistent times to maintain stable blood sugar",
    "Include protein with every meal to slow glucose absorption",
    "Choose whole grains over refined carbohydrates",
    "Stay hydrated with water throughout the day",
    "Limit processed foods and added sugars"
  ];

  return (
    <Card className="bg-gradient-card shadow-medical border-0">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-foreground">
          <Book className="w-6 h-6 text-wellness-green" />
          Diabetic Diet Plan
        </CardTitle>
        <CardDescription>
          Personalized meal suggestions to help manage your glucose levels
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          {mealPlans.map((plan) => (
            <div key={plan.meal} className="p-4 rounded-lg bg-wellness-light border border-wellness-green/20">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">{plan.meal}</h3>
                <Badge variant="secondary" className="bg-wellness-green/20 text-wellness-green border-wellness-green/30">
                  {plan.totalCarbs} carbs
                </Badge>
              </div>
              <div className="space-y-2">
                {plan.foods.map((food, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-foreground">{food.name}</span>
                    <div className="flex gap-2 text-muted-foreground">
                      <span>{food.carbs}</span>
                      <span>•</span>
                      <span>{food.protein}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-lg bg-medical-light border border-medical-blue/20">
          <h3 className="font-semibold mb-3 text-foreground">Diet Tips</h3>
          <ul className="space-y-2">
            {tips.map((tip, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-medical-blue mt-2 flex-shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default DietSuggestions;