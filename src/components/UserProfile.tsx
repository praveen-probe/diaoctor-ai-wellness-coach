import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Edit } from "lucide-react";

interface UserProfileProps {
  userName: string;
  onNameChange: (name: string) => void;
}

const UserProfile = ({ userName, onNameChange }: UserProfileProps) => {
  const [isEditing, setIsEditing] = useState(!userName);
  const [tempName, setTempName] = useState(userName);

  const handleSave = () => {
    if (tempName.trim()) {
      onNameChange(tempName.trim());
      setIsEditing(false);
    }
  };

  const handleEdit = () => {
    setTempName(userName);
    setIsEditing(true);
  };

  return (
    <Card className="shadow-medical">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center space-x-2">
          <Avatar className="h-16 w-16">
            <AvatarImage src="" />
            <AvatarFallback className="bg-medical-light text-medical-blue text-lg">
              {userName ? userName.slice(0, 2).toUpperCase() : <User className="h-8 w-8" />}
            </AvatarFallback>
          </Avatar>
          {userName && !isEditing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              className="text-muted-foreground hover:text-foreground"
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
        </div>
        <CardTitle className="text-medical-blue">
          {isEditing ? "Welcome to Diaoctor" : `Hello, ${userName}!`}
        </CardTitle>
        <CardDescription>
          {isEditing ? "Please enter your name to get started" : "Your diabetes wellness companion"}
        </CardDescription>
      </CardHeader>
      
      {isEditing && (
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSave()}
            />
          </div>
          <Button onClick={handleSave} className="w-full" disabled={!tempName.trim()}>
            Get Started
          </Button>
        </CardContent>
      )}
    </Card>
  );
};

export default UserProfile;