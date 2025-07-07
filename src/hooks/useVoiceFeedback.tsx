import { useCallback } from 'react';
import { useLanguage } from './useLanguage';
import { VoiceSettings } from '@/components/VoiceSettings';

export const useVoiceFeedback = (voiceSettings: VoiceSettings) => {
  const { currentLanguage, t } = useLanguage();

  const getBloodSugarFeedback = useCallback((level: number): { category: string; message: string; recommendations: string[] } => {
    if (level < 70) {
      return {
        category: "Low",
        message: getLocalizedMessage('low', level),
        recommendations: getLocalizedRecommendations('low')
      };
    } else if (level <= 140) {
      return {
        category: "Normal",
        message: getLocalizedMessage('normal', level),
        recommendations: getLocalizedRecommendations('normal')
      };
    } else if (level <= 200) {
      return {
        category: "High",
        message: getLocalizedMessage('high', level),
        recommendations: getLocalizedRecommendations('high')
      };
    } else {
      return {
        category: "Very High",
        message: getLocalizedMessage('very_high', level),
        recommendations: getLocalizedRecommendations('very_high')
      };
    }
  }, [currentLanguage]);

  const getLocalizedMessage = (category: string, level: number): string => {
    const messages: Record<string, Record<string, string>> = {
      en: {
        low: `Your blood sugar level is ${level} mg/dL, which is low. Please take immediate action.`,
        normal: `Your blood sugar level is ${level} mg/dL, which is normal. Keep up the good work!`,
        high: `Your blood sugar level is ${level} mg/dL, which is high. Please follow the recommendations.`,
        very_high: `Your blood sugar level is ${level} mg/dL, which is very high. Please consult your doctor immediately.`
      },
      ta: {
        low: `உங்கள் இரத்த சர்க்கரை அளவு ${level} mg/dL, இது குறைவு. உடனடியாக நடவடிக்கை எடுக்கவும்.`,
        normal: `உங்கள் இரத்த சர்க்கரை அளவு ${level} mg/dL, இது சாதாரணம். இதே போல் தொடர்ந்து செய்யுங்கள்!`,
        high: `உங்கள் இரத்த சர்க்கரை அளவு ${level} mg/dL, இது அதிகம். பரிந்துரைகளை பின்பற்றவும்.`,
        very_high: `உங்கள் இரத்த சர்க்கரை அளவு ${level} mg/dL, இது மிக அதிகம். உடனடியாக மருத்துவரை அணுகவும்.`
      },
      hi: {
        low: `आपका ब्लड शुगर लेवल ${level} mg/dL है, जो कम है। कृपया तुरंत कार्रवाई करें।`,
        normal: `आपका ब्लड शुगर लेवल ${level} mg/dL है, जो सामान्य है। अच्छा काम जारी रखें!`,
        high: `आपका ब्लड शुगर लेवल ${level} mg/dL है, जो अधिक है। कृपया सुझावों का पालन करें।`,
        very_high: `आपका ब्लड शुगर लेवल ${level} mg/dL है, जो बहुत अधिक है। तुरंत डॉक्टर से सलाह लें।`
      },
      es: {
        low: `Su nivel de azúcar en sangre es ${level} mg/dL, que está bajo. Por favor tome acción inmediata.`,
        normal: `Su nivel de azúcar en sangre es ${level} mg/dL, que está normal. ¡Siga así!`,
        high: `Su nivel de azúcar en sangre es ${level} mg/dL, que está alto. Por favor siga las recomendaciones.`,
        very_high: `Su nivel de azúcar en sangre es ${level} mg/dL, que está muy alto. Consulte a su médico inmediatamente.`
      }
    };

    return messages[currentLanguage]?.[category] || messages.en[category];
  };

  const getLocalizedRecommendations = (category: string): string[] => {
    const recommendations: Record<string, Record<string, string[]>> = {
      en: {
        low: [
          "Consume 15-20 grams of fast-acting carbohydrates immediately",
          "Drink fruit juice or eat glucose tablets",
          "Wait 15 minutes and recheck your blood sugar",
          "If still low, repeat the treatment",
          "Contact your healthcare provider if levels don't improve"
        ],
        normal: [
          "Continue your current diet and exercise routine",
          "Monitor your blood sugar regularly",
          "Stay hydrated and maintain a balanced diet",
          "Keep up with your medication schedule",
          "Maintain regular physical activity"
        ],
        high: [
          "Check your blood sugar again in 2-3 hours",
          "Drink plenty of water to stay hydrated",
          "Avoid foods high in sugar and carbohydrates",
          "Take a gentle walk if you feel well enough",
          "Contact your doctor if levels remain high",
          "Review your medication timing and dosage"
        ],
        very_high: [
          "Contact your healthcare provider immediately",
          "Drink water to prevent dehydration",
          "Do not exercise until levels normalize",
          "Check for ketones if you have Type 1 diabetes",
          "Consider emergency medical attention if you feel unwell"
        ]
      },
      ta: {
        low: [
          "உடனடியாக 15-20 கிராம் வேகமாக செயல்படும் கார்போஹைட்ரேட்டுகளை எடுத்துக் கொள்ளுங்கள்",
          "பழச்சாறு அல்லது குளுக்கோஸ் மாத்திரைகளை எடுத்துக் கொள்ளுங்கள்",
          "15 நிமிடங்கள் காத்திருந்து மீண்டும் சர்க்கரை அளவை சரிபார்க்கவும்",
          "இன்னும் குறைவாக இருந்தால், சிகிச்சையை மீண்டும் செய்யுங்கள்",
          "அளவுகள் மேம்படவில்லை என்றால் உங்கள் மருத்துவரை தொடர்பு கொள்ளுங்கள்"
        ],
        normal: [
          "உங்கள் தற்போதைய உணவு மற்றும் உடற்பயிற்சி வழக்கத்தை தொடருங்கள்",
          "உங்கள் இரத்த சர்க்கரையை தவறாமல் கண்காணிக்கவும்",
          "நீர்ச்சத்துடன் இருங்கள் மற்றும் சமச்சீர் உணவை பராமரிக்கவும்",
          "உங்கள் மருந்து அட்டவணையை கடைபிடிக்கவும்",
          "வழக்கமான உடல் செயல்பாடுகளை பராமரிக்கவும்"
        ],
        high: [
          "2-3 மணி நேரத்தில் உங்கள் இரத்த சர்க்கரையை மீண்டும் சரிபார்க்கவும்",
          "நீர்ச்சத்துடன் இருக்க நிறைய தண்ணீர் குடிக்கவும்",
          "சர்க்கரை மற்றும் கார்போஹைட்ரேட் அதிகம் உள்ள உணவுகளை தவிர்க்கவும்",
          "நீங்கள் நன்றாக உணர்ந்தால் மெதுவாக நடக்கவும்",
          "அளவுகள் அதிகமாக இருந்தால் உங்கள் மருத்துவரை தொடர்பு கொள்ளுங்கள்",
          "உங்கள் மருந்தின் நேரம் மற்றும் அளவை மறுபரிசீலனை செய்யுங்கள்"
        ],
        very_high: [
          "உடனடியாக உங்கள் மருத்துவ வழங்குநரை தொடர்பு கொள்ளுங்கள்",
          "நீரிழப்பு தடுக்க தண்ணீர் குடிக்கவும்",
          "அளவுகள் சாதாரணமாகும் வரை உடற்பயிற்சி செய்யாதீர்கள்",
          "நீங்கள் வகை 1 நீரிழிவு நோயாளி என்றால் கீட்டோன்களை சரிபார்க்கவும்",
          "நீங்கள் உடல்நிலை சரியில்லை என உணர்ந்தால் அவசர மருத்துவ உதவியை பெறுங்கள்"
        ]
      },
      hi: {
        low: [
          "तुरंत 15-20 ग्राम तेज़ी से काम करने वाले कार्बोहाइड्रेट लें",
          "फलों का रस पिएं या ग्लूकोज टैबलेट लें",
          "15 मिनट प्रतीक्षा करें और फिर से ब्लड शुगर चेक करें",
          "यदि अभी भी कम है, तो उपचार दोहराएं",
          "यदि स्तर में सुधार नहीं होता तो अपने डॉक्टर से संपर्क करें"
        ],
        normal: [
          "अपनी वर्तमान आहार और व्यायाम दिनचर्या जारी रखें",
          "नियमित रूप से अपने ब्लड शुगर की जांच करें",
          "हाइड्रेटेड रहें और संतुलित आहार लें",
          "अपनी दवा का शेड्यूल बनाए रखें",
          "नियमित शारीरिक गतिविधि बनाए रखें"
        ],
        high: [
          "2-3 घंटे में फिर से अपने ब्लड शुगर की जांच करें",
          "हाइड्रेटेड रहने के लिए खूब पानी पिएं",
          "चीनी और कार्बोहाइड्रेट युक्त भोजन से बचें",
          "यदि आप ठीक महसूस करते हैं तो हल्की सी सैर करें",
          "यदि स्तर ऊंचा रहता है तो अपने डॉक्टर से संपर्क करें",
          "अपनी दवा के समय और खुराक की समीक्षा करें"
        ],
        very_high: [
          "तुरंत अपने स्वास्थ्य सेवा प्रदाता से संपर्क करें",
          "निर्जलीकरण को रोकने के लिए पानी पिएं",
          "स्तर सामान्य होने तक व्यायाम न करें",
          "यदि आपको टाइप 1 डायबिटीज है तो कीटोन्स की जांच करें",
          "यदि आप अस्वस्थ महसूस करते हैं तो आपातकालीन चिकित्सा सहायता लें"
        ]
      },
      es: {
        low: [
          "Consuma inmediatamente 15-20 gramos de carbohidratos de acción rápida",
          "Beba jugo de frutas o tome tabletas de glucosa",
          "Espere 15 minutos y vuelva a revisar su azúcar en sangre",
          "Si sigue bajo, repita el tratamiento",
          "Contacte a su proveedor de salud si los niveles no mejoran"
        ],
        normal: [
          "Continue con su rutina actual de dieta y ejercicio",
          "Monitoree su azúcar en sangre regularmente",
          "Manténgase hidratado y mantenga una dieta equilibrada",
          "Mantenga su horario de medicamentos",
          "Mantenga actividad física regular"
        ],
        high: [
          "Revise su azúcar en sangre nuevamente en 2-3 horas",
          "Beba mucha agua para mantenerse hidratado",
          "Evite alimentos altos en azúcar y carbohidratos",
          "Tome una caminata suave si se siente lo suficientemente bien",
          "Contacte a su médico si los niveles permanecen altos",
          "Revise el horario y la dosis de su medicamento"
        ],
        very_high: [
          "Contacte a su proveedor de atención médica inmediatamente",
          "Beba agua para prevenir la deshidratación",
          "No haga ejercicio hasta que los niveles se normalicen",
          "Revise las cetonas si tiene diabetes tipo 1",
          "Considere atención médica de emergencia si se siente mal"
        ]
      }
    };

    return recommendations[currentLanguage]?.[category] || recommendations.en[category];
  };

  const speak = useCallback(async (text: string) => {
    if (!voiceSettings.enabled || !voiceSettings.apiKey) {
      return;
    }

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceSettings.voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': voiceSettings.apiKey
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        })
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.volume = voiceSettings.volume;
        audio.play();
      }
    } catch (error) {
      console.error('Voice synthesis error:', error);
    }
  }, [voiceSettings]);

  const announceBloodSugar = useCallback(async (level: number) => {
    const feedback = getBloodSugarFeedback(level);
    
    // Announce the level and category
    await speak(feedback.message);
    
    // Wait a moment, then announce recommendations
    setTimeout(async () => {
      const recommendationsText = feedback.recommendations.join('. ');
      await speak(`Here are some recommendations: ${recommendationsText}`);
    }, 3000);
    
    return feedback;
  }, [speak, getBloodSugarFeedback]);

  return {
    announceBloodSugar,
    speak,
    getBloodSugarFeedback
  };
};