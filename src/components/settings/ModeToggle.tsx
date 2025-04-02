
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

interface ModeToggleProps {
  isDemoMode: boolean;
  onToggle: (enableDemo: boolean) => void;
}

const ModeToggle = ({ isDemoMode, onToggle }: ModeToggleProps) => {
  const { toast } = useToast();

  const handleToggle = (checked: boolean) => {
    onToggle(checked);
    toast({
      title: checked ? "Demo Mode Enabled" : "Live Mode Enabled",
      description: checked 
        ? "Using mock data for demonstration purposes." 
        : "Connected to real social media accounts.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Mode</CardTitle>
        <CardDescription>
          Toggle between demo mode with mock data and live mode with real account connections
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="demo-mode" className="text-base font-medium">Demo Mode</Label>
            <p className="text-sm text-muted-foreground">
              {isDemoMode 
                ? "Currently using simulated data for demonstration" 
                : "Currently using live connections to social platforms"}
            </p>
          </div>
          <Switch 
            id="demo-mode" 
            checked={isDemoMode}
            onCheckedChange={handleToggle}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ModeToggle;
