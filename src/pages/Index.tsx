import SugarLevelTracker from "@/components/SugarLevelTracker";
import DietSuggestions from "@/components/DietSuggestions";
import MedicineRecommendations from "@/components/MedicineRecommendations";
import ExerciseRecommendations from "@/components/ExerciseRecommendations";
import heroImage from "@/assets/hero-medical.jpg";
import { Heart, Activity, Pill, Dumbbell } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-medical opacity-90" />
        <div 
          className="relative min-h-[60vh] bg-cover bg-center bg-no-repeat flex items-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="container mx-auto px-4 text-center text-white relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              Diaoctor
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-md">
              Your AI-powered diabetes wellness coach for better health management
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-2xl mx-auto">
              <div className="text-center">
                <Activity className="w-8 h-8 mx-auto mb-2" />
                <span className="text-sm font-medium">Track Glucose</span>
              </div>
              <div className="text-center">
                <Heart className="w-8 h-8 mx-auto mb-2" />
                <span className="text-sm font-medium">Diet Plans</span>
              </div>
              <div className="text-center">
                <Pill className="w-8 h-8 mx-auto mb-2" />
                <span className="text-sm font-medium">Medicine Info</span>
              </div>
              <div className="text-center">
                <Dumbbell className="w-8 h-8 mx-auto mb-2" />
                <span className="text-sm font-medium">Exercise Guide</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="space-y-8">
              <SugarLevelTracker />
              <MedicineRecommendations />
            </div>
            <div className="space-y-8">
              <DietSuggestions />
              <ExerciseRecommendations />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            This app provides general information only and is not a substitute for professional medical advice.
            Always consult your healthcare provider for medical decisions.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
