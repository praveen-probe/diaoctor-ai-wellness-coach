import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Video, User, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface AppointmentBookingProps {
  selectedDoctor?: any;
  onClose?: () => void;
}

const AppointmentBooking = ({ selectedDoctor, onClose }: AppointmentBookingProps) => {
  const { currentLanguage } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [consultationType, setConsultationType] = useState<"in-person" | "video">("video");

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
  ];

  const translations = {
    en: {
      title: "Book Appointment",
      description: "Schedule your consultation with healthcare professionals",
      selectDate: "Select Date",
      selectTime: "Select Time Slot",
      consultationType: "Consultation Type",
      inPerson: "In-Person",
      videoCall: "Video Call",
      confirmBooking: "Confirm Booking",
      available: "Available",
      selectedDate: "Selected Date",
      selectedTime: "Selected Time",
      appointmentSummary: "Appointment Summary"
    },
    ta: {
      title: "சந்திப்பு முன்பதிவு",
      description: "சுகாதார நிபுணர்களுடன் உங்கள் ஆலோசனையை திட்டமிடுங்கள்",
      selectDate: "தேதியைத் தேர்ந்தெடுக்கவும்",
      selectTime: "நேர இடைவெளியைத் தேர்ந்தெடுக்கவும்",
      consultationType: "ஆலோசனை வகை",
      inPerson: "நேரடி சந்திப்பு",
      videoCall: "வீடியோ அழைப்பு",
      confirmBooking: "முன்பதிவை உறுதிப்படுத்துங்கள்",
      available: "கிடைக்கும்",
      selectedDate: "தேர்ந்தெடுக்கப்பட்ட தேதி",
      selectedTime: "தேர்ந்தெடுக்கப்பட்ட நேரம்",
      appointmentSummary: "சந்திப்பு சுருக்கம்"
    }
  };

  const getText = (key: string) => {
    return translations[currentLanguage as keyof typeof translations]?.[key as keyof typeof translations.en] || 
           translations.en[key as keyof typeof translations.en];
  };

  // Generate next 7 days
  const getNext7Days = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push({
        date: date.toISOString().split('T')[0],
        day: date.toLocaleDateString('en', { weekday: 'short' }),
        dayNumber: date.getDate()
      });
    }
    return days;
  };

  const days = getNext7Days();

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary" />
            {getText('title')}
          </CardTitle>
          {onClose && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <CardDescription>
          {selectedDoctor ? `Book appointment with ${selectedDoctor.name}` : getText('description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Selected Doctor Info */}
        {selectedDoctor && (
          <div className="border rounded-lg p-4 bg-primary/5 select-none">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">
                  {selectedDoctor.name.split(' ').map((n: string) => n[0]).join('')}
                </span>
              </div>
              <div>
                <h4 className="font-semibold">{selectedDoctor.name}</h4>
                <p className="text-sm text-muted-foreground">{selectedDoctor.specialty}</p>
                <p className="text-sm font-medium text-primary">${selectedDoctor.consultationFee}</p>
              </div>
            </div>
          </div>
        )}

        {/* Date Selection */}
        <div>
          <h3 className="text-lg font-semibold mb-3">{getText('selectDate')}</h3>
          <div className="grid grid-cols-7 gap-2">
            {days.map((day) => (
              <Button
                key={day.date}
                variant={selectedDate === day.date ? "default" : "outline"}
                className="flex flex-col p-3 h-auto select-none touch-manipulation"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedDate(day.date);
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <span className="text-xs">{day.day}</span>
                <span className="text-lg font-bold">{day.dayNumber}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Consultation Type */}
        <div>
          <h3 className="text-lg font-semibold mb-3">{getText('consultationType')}</h3>
          <div className="flex gap-3">
            <Button
              variant={consultationType === "video" ? "default" : "outline"}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setConsultationType("video");
              }}
              className="flex items-center gap-2 select-none touch-manipulation"
            >
              <Video className="w-4 h-4" />
              {getText('videoCall')}
            </Button>
            <Button
              variant={consultationType === "in-person" ? "default" : "outline"}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setConsultationType("in-person");
              }}
              className="flex items-center gap-2 select-none touch-manipulation"
            >
              <User className="w-4 h-4" />
              {getText('inPerson')}
            </Button>
          </div>
        </div>

        {/* Time Selection */}
        {selectedDate && (
          <div>
            <h3 className="text-lg font-semibold mb-3">{getText('selectTime')}</h3>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedTime(time);
                  }}
                  className="flex items-center gap-1 select-none touch-manipulation"
                >
                  <Clock className="w-3 h-3" />
                  {time}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Appointment Summary */}
        {selectedDate && selectedTime && (
          <div className="border rounded-lg p-4 bg-muted/50">
            <h3 className="text-lg font-semibold mb-3">{getText('appointmentSummary')}</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{getText('selectedDate')}:</span>
                <span className="font-medium">{new Date(selectedDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{getText('selectedTime')}:</span>
                <span className="font-medium">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{getText('consultationType')}:</span>
                <Badge variant="secondary" className="flex items-center gap-1">
                  {consultationType === "video" ? (
                    <>
                      <Video className="w-3 h-3" />
                      {getText('videoCall')}
                    </>
                  ) : (
                    <>
                      <User className="w-3 h-3" />
                      {getText('inPerson')}
                    </>
                  )}
                </Badge>
              </div>
            </div>
            <Button 
              className="w-full mt-4 select-none touch-manipulation" 
              size="lg"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Handle booking confirmation here
              }}
            >
              {getText('confirmBooking')}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentBooking;