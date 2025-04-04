
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Globe } from 'lucide-react';
import ConnectedAccounts from '@/components/auth/ConnectedAccounts';
import AuthButtons from '@/components/auth/AuthButtons';

interface ConnectedAccountsSectionProps {
  accounts: {
    provider: string;
    username: string;
    isConnected: boolean;
    profilePicture: string;
  }[];
  onDisconnect: (provider: string) => void;
  onConnect: (provider: string) => void;
  onAuthSuccess: (provider: string, userData: any) => void;
}

const ConnectedAccountsSection = ({
  accounts,
  onDisconnect,
  onConnect,
  onAuthSuccess
}: ConnectedAccountsSectionProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Connected Social Media Accounts</CardTitle>
          <CardDescription>
            Manage your connected social media accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ConnectedAccounts 
            accounts={accounts}
            onDisconnect={onDisconnect}
            onConnect={onConnect}
          />
          
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">Add a new connection</h3>
            <AuthButtons onSuccess={onAuthSuccess} />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>API Access</CardTitle>
          <CardDescription>
            Manage your API keys and access tokens
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Read Access</h3>
                <p className="text-sm text-muted-foreground">
                  Allow applications to read data from your accounts
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Write Access</h3>
                <p className="text-sm text-muted-foreground">
                  Allow applications to post and update your accounts
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="pt-4 border-t">
              <Button variant="outline" className="w-full">
                <Globe className="mr-2 h-4 w-4" />
                Manage API Settings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConnectedAccountsSection;
