import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' }
];

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (code: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<string, Record<string, string>> = {
  en: {
    // Exercise translations
    'exercise.cardio': 'Cardio Exercises',
    'exercise.strength': 'Strength Training',
    'exercise.flexibility': 'Flexibility & Balance',
    'exercise.brisk_walking': 'Brisk Walking',
    'exercise.swimming': 'Swimming',
    'exercise.cycling': 'Cycling',
    'exercise.dancing': 'Dancing',
    'exercise.squats': 'Bodyweight Squats',
    'exercise.pushups': 'Wall Push-ups',
    'exercise.resistance': 'Resistance Bands',
    'exercise.dumbbells': 'Light Dumbbells',
    'exercise.yoga': 'Yoga',
    'exercise.tai_chi': 'Tai Chi',
    'exercise.stretching': 'Stretching',
    'exercise.balance': 'Balance exercises',
    // Food translations
    'food.oatmeal': 'Oatmeal with berries',
    'food.yogurt': 'Greek yogurt',
    'food.toast': 'Whole grain toast',
    'food.chicken': 'Grilled chicken breast',
    'food.quinoa': 'Quinoa salad',
    'food.vegetables': 'Mixed vegetables',
    'food.salmon': 'Baked salmon',
    'food.sweet_potato': 'Sweet potato',
    'food.broccoli': 'Steamed broccoli',
    // Voice feedback
    'voice.low_sugar': 'Your blood sugar is low',
    'voice.normal_sugar': 'Your blood sugar is normal',
    'voice.high_sugar': 'Your blood sugar is high',
    'voice.very_high_sugar': 'Your blood sugar is very high'
  },
  ta: {
    // Exercise translations in Tamil
    'exercise.cardio': 'இதய உடற்பயிற்சிகள்',
    'exercise.strength': 'வலிமை பயிற்சி',
    'exercise.flexibility': 'நெகிழ்வுத்தன்மை மற்றும் சமநிலை',
    'exercise.brisk_walking': 'வேகமான நடைபயிற்சி',
    'exercise.swimming': 'நீச்சல்',
    'exercise.cycling': 'சைக்கிள் ஓட்டுதல்',
    'exercise.dancing': 'நடனம்',
    'exercise.squats': 'உடல் எடை ஸ்குவாட்ஸ்',
    'exercise.pushups': 'சுவர் புஷ்-அப்ஸ்',
    'exercise.resistance': 'எதிர்ப்பு பேண்ட்ஸ்',
    'exercise.dumbbells': 'இலகுவான டம்பல்ஸ்',
    'exercise.yoga': 'யோகா',
    'exercise.tai_chi': 'தை சி',
    'exercise.stretching': 'நீட்டுதல்',
    'exercise.balance': 'சமநிலை பயிற்சிகள்',
    // Food translations in Tamil
    'food.oatmeal': 'பெர்ரிகளுடன் ஓட்ஸ்',
    'food.yogurt': 'கிரேக்க தயிர்',
    'food.toast': 'முழு தானிய டோஸ்ட்',
    'food.chicken': 'கிரில் செய்த கோழி மார்பகம்',
    'food.quinoa': 'க்வினோவா சாலட்',
    'food.vegetables': 'கலப்பு காய்கறிகள்',
    'food.salmon': 'சுட்ட சால்மன்',
    'food.sweet_potato': 'இனிப்பு உருளைக்கிழங்கு',
    'food.broccoli': 'வேகவைத்த ப்ராக்கோலி',
    // Voice feedback in Tamil
    'voice.low_sugar': 'உங்கள் இரத்த சர்க்கரை குறைவு',
    'voice.normal_sugar': 'உங்கள் இரத்த சர்க்கரை சாதாரணம்',
    'voice.high_sugar': 'உங்கள் இரத்த சர்க்கரை அதிகம்',
    'voice.very_high_sugar': 'உங்கள் இரத்த சர்க்கரை மிக அதிகம்'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('diaoctor-language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const setLanguage = (code: string) => {
    setCurrentLanguage(code);
    localStorage.setItem('diaoctor-language', code);
  };

  const t = (key: string): string => {
    return translations[currentLanguage]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};