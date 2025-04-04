
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ApiConfigSectionProps {
  isDemoMode: boolean;
}

const ApiConfigSection = ({ isDemoMode }: ApiConfigSectionProps) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>API Configuration</CardTitle>
        <CardDescription>
          Configure API keys and settings for live mode
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={isDemoMode ? "opacity-50 pointer-events-none" : ""}>
          <div className="space-y-2">
            <Label htmlFor="instagram-api">Instagram API Key</Label>
            <Input id="instagram-api" type="password" placeholder="Enter your Instagram API key" disabled={isDemoMode} />
          </div>
          
          <div className="space-y-2 mt-4">
            <Label htmlFor="facebook-api">Facebook API Key</Label>
            <Input id="facebook-api" type="password" placeholder="Enter your Facebook API key" disabled={isDemoMode} />
          </div>
          
          <div className="space-y-2 mt-4">
            <Label htmlFor="tiktok-api">TikTok API Key</Label>
            <Input id="tiktok-api" type="password" placeholder="Enter your TikTok API key" disabled={isDemoMode} />
          </div>
          
          <Button className="mt-4" disabled={isDemoMode}>Save API Keys</Button>
        </div>
        
        {isDemoMode && (
          <div className="bg-muted p-4 rounded-md mt-2">
            <p className="text-sm text-muted-foreground">Switch to Live Mode to configure real API connections</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApiConfigSection;
