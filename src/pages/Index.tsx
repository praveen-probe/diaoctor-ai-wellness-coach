import { useState, useEffect } from "react";
import HealthTracker from "@/components/HealthTracker";
import DoctorFinder from "@/components/DoctorFinder";
import AppointmentBooking from "@/components/AppointmentBooking";
import DietSuggestions from "@/components/DietSuggestions";
import MedicineRecommendations from "@/components/MedicineRecommendations";
import ExerciseRecommendations from "@/components/ExerciseRecommendations";
import UserProfile from "@/components/UserProfile";
import HealthKnowledge from "@/components/HealthKnowledge";
import AIChatbot from "@/components/AIChatbot";
import LanguageSelector from "@/components/LanguageSelector";
import heroImage from "@/assets/hero-medical.jpg";
import { Heart, Activity, Pill, Dumbbell, Users, Calendar } from "lucide-react";

const Index = () => {
  const [userName, setUserName] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);

  useEffect(() => {
    const savedName = localStorage.getItem("diaoctor-user-name");
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  const handleNameChange = (name: string) => {
    setUserName(name);
    localStorage.setItem("diaoctor-user-name", name);
  };

  const handleCloseAppointment = () => {
    setSelectedDoctor(null);
  };

  const handleDoctorSelect = (doctor: any) => {
    setSelectedDoctor(doctor);
  };

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
              Dioactor
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-md">
              Your comprehensive health management platform - Connect with doctors, track health, and manage wellness
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-3xl mx-auto">
              <div className="text-center">
                <Activity className="w-8 h-8 mx-auto mb-2" />
                <span className="text-sm font-medium">Health Tracking</span>
              </div>
              <div className="text-center">
                <Heart className="w-8 h-8 mx-auto mb-2" />
                <span className="text-sm font-medium">Find Doctors</span>
              </div>
              <div className="text-center">
                <Pill className="w-8 h-8 mx-auto mb-2" />
                <span className="text-sm font-medium">Book Appointments</span>
              </div>
              <div className="text-center">
                <Dumbbell className="w-8 h-8 mx-auto mb-2" />
                <span className="text-sm font-medium">Wellness Plans</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Language Selector */}
          <div className="flex justify-center mb-8">
            <LanguageSelector />
          </div>
          
          {/* User Profile Section */}
          <div className="max-w-md mx-auto mb-12">
            <UserProfile userName={userName} onNameChange={handleNameChange} />
          </div>
          
          {userName && (
            <>
              {/* Main Health Dashboard */}
              <div className="max-w-6xl mx-auto space-y-8">
                {/* Doctor Finder */}
                <DoctorFinder onDoctorSelect={handleDoctorSelect} />
                
                {/* Appointment Booking - Shows only when doctor is selected */}
                {selectedDoctor && (
                  <AppointmentBooking selectedDoctor={selectedDoctor} onClose={handleCloseAppointment} />
                )}
                
                {/* Health Tracking */}
                <HealthTracker />
                
                {/* Health Tools Row */}
                <div className="grid lg:grid-cols-3 gap-6">
                  <DietSuggestions />
                  <ExerciseRecommendations />
                  <MedicineRecommendations />
                </div>
                
                {/* AI Chat */}
                <div className="max-w-2xl mx-auto">
                  <AIChatbot />
                </div>
              </div>
            </>
          )}
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
