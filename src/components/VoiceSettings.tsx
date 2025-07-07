import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Volume2, VolumeX, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const voices = [
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah (Female)' },
  { id: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Liam (Male)' },
  { id: 'XB0fDUnXU5powFXDhCwa', name: 'Charlotte (Female)' },
  { id: 'onwK4e9ZLuTAKqWW03F9', name: 'Daniel (Male)' },
  { id: 'pFZP5JQG7iQjIQuC4Bku', name: 'Lily (Female)' },
  { id: 'nPczCjzI2devNBz1zQrb', name: 'Brian (Male)' }
];

interface VoiceSettingsProps {
  onSettingsChange: (settings: VoiceSettings) => void;
}

export interface VoiceSettings {
  apiKey: string;
  voiceId: string;
  enabled: boolean;
  volume: number;
}

const VoiceSettings: React.FC<VoiceSettingsProps> = ({ onSettingsChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<VoiceSettings>({
    apiKey: '',
    voiceId: 'EXAVITQu4vr4xnSDxMaL',
    enabled: false,
    volume: 0.7
  });
  const { toast } = useToast();

  useEffect(() => {
    const savedSettings = localStorage.getItem('diaoctor-voice-settings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings(parsed);
      onSettingsChange(parsed);
    }
  }, [onSettingsChange]);

  const handleSettingsUpdate = (newSettings: Partial<VoiceSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('diaoctor-voice-settings', JSON.stringify(updated));
    onSettingsChange(updated);
  };

  const testVoice = async () => {
    if (!settings.apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your ElevenLabs API key first.",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/' + settings.voiceId, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': settings.apiKey
        },
        body: JSON.stringify({
          text: "Hello! This is a test of your voice settings for Diaoctor.",
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
        audio.volume = settings.volume;
        audio.play();
        
        toast({
          title: "Voice Test Successful",
          description: "Your voice settings are working correctly!"
        });
      } else {
        throw new Error('Failed to generate speech');
      }
    } catch (error) {
      toast({
        title: "Voice Test Failed",
        description: "Please check your API key and try again.",
        variant: "destructive"
      });
    }
  };

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2"
      >
        {settings.enabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        Voice Settings
      </Button>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            <CardTitle>Voice Settings</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
            ×
          </Button>
        </div>
        <CardDescription>
          Configure voice feedback for blood sugar announcements
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="voice-enabled">Enable Voice Feedback</Label>
          <Switch
            id="voice-enabled"
            checked={settings.enabled}
            onCheckedChange={(enabled) => handleSettingsUpdate({ enabled })}
          />
        </div>

        {settings.enabled && (
          <>
            <div className="space-y-2">
              <Label htmlFor="api-key">ElevenLabs API Key</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="Enter your ElevenLabs API key"
                value={settings.apiKey}
                onChange={(e) => handleSettingsUpdate({ apiKey: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Get your API key from{' '}
                <a 
                  href="https://elevenlabs.io" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  elevenlabs.io
                </a>
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="voice-select">Voice</Label>
              <Select
                value={settings.voiceId}
                onValueChange={(voiceId) => handleSettingsUpdate({ voiceId })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a voice" />
                </SelectTrigger>
                <SelectContent>
                  {voices.map((voice) => (
                    <SelectItem key={voice.id} value={voice.id}>
                      {voice.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="volume">Volume: {Math.round(settings.volume * 100)}%</Label>
              <input
                id="volume"
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={settings.volume}
                onChange={(e) => handleSettingsUpdate({ volume: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>

            <Button onClick={testVoice} className="w-full" disabled={!settings.apiKey}>
              Test Voice
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default VoiceSettings;