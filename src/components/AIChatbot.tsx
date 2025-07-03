import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, Send, User } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const AIChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI diabetes assistant. I can help answer questions about diabetes management, diet, exercise, and medications. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Predefined responses for common diabetes questions
  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('blood sugar') || message.includes('glucose')) {
      return "Normal blood sugar levels are 70-100 mg/dL when fasting and less than 140 mg/dL two hours after eating. Regular monitoring is key for good diabetes management. Would you like specific tips for maintaining stable levels?";
    }
    
    if (message.includes('diet') || message.includes('food') || message.includes('eat')) {
      return "A diabetes-friendly diet should focus on whole grains, lean proteins, healthy fats, and plenty of vegetables. Limit refined sugars and processed foods. Consider the plate method: 1/2 plate vegetables, 1/4 lean protein, 1/4 whole grains.";
    }
    
    if (message.includes('exercise') || message.includes('workout')) {
      return "Regular exercise helps control blood sugar levels. Aim for 150 minutes of moderate exercise per week. Good options include walking, swimming, cycling, and strength training. Always check your blood sugar before and after exercise.";
    }
    
    if (message.includes('medication') || message.includes('medicine')) {
      return "Diabetes medications should always be taken as prescribed by your healthcare provider. Common types include metformin, insulin, and SGLT2 inhibitors. Never skip doses and discuss any side effects with your doctor.";
    }
    
    if (message.includes('emergency') || message.includes('high') || message.includes('low')) {
      return "For low blood sugar (hypoglycemia): consume 15g fast-acting carbs like glucose tablets. For high blood sugar: stay hydrated, monitor ketones, and contact your healthcare provider if levels remain high. Always seek immediate medical help for severe symptoms.";
    }
    
    if (message.includes('hello') || message.includes('hi')) {
      return "Hello! I'm here to help with your diabetes management questions. You can ask me about blood sugar levels, diet, exercise, medications, or any other diabetes-related topics.";
    }
    
    return "That's a great question! While I can provide general diabetes information, I recommend discussing specific medical concerns with your healthcare provider. Is there a particular aspect of diabetes management you'd like to know more about?";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    
    // Simulate AI response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="shadow-medical h-[500px] flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5 text-medical-blue" />
          <CardTitle className="text-medical-blue">AI Diabetes Assistant</CardTitle>
        </div>
        <CardDescription>
          Ask me anything about diabetes management, diet, exercise, or medications
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col space-y-4">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex space-x-3 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'bot' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-medical-light text-medical-blue">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.sender === 'user'
                      ? 'bg-medical-blue text-white'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {message.content}
                </div>
                
                {message.sender === 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-wellness-light text-wellness-green">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex space-x-3 justify-start">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-medical-light text-medical-blue">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted p-3 rounded-lg text-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-medical-blue rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-medical-blue rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-medical-blue rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="flex space-x-2">
          <Input
            placeholder="Ask about diabetes management..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChatbot;