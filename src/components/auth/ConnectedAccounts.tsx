
import React from 'react';
import { Instagram, Facebook, User, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ConnectedAccount {
  provider: string;
  username: string;
  isConnected: boolean;
  profilePicture?: string;
}

interface ConnectedAccountsProps {
  accounts: ConnectedAccount[];
  onDisconnect: (provider: string) => void;
  onConnect: (provider: string) => void;
}

const ConnectedAccounts = ({ accounts, onDisconnect, onConnect }: ConnectedAccountsProps) => {
  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'instagram':
        return <Instagram className="h-5 w-5 text-social-instagram" />;
      case 'facebook':
        return <Facebook className="h-5 w-5 text-social-facebook" />;
      case 'tiktok':
        return (
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-social-tiktok"
          >
            <path d="M19.321 5.562C18.7377 4.872 18.4421 4.012 18.4511 3.141H14.7173V15.276C14.6636 16.318 13.96 17.217 12.9471 17.57C12.7288 17.647 12.5007 17.687 12.2726 17.691C11.834 17.691 11.4092 17.578 11.0394 17.365C10.0688 16.777 9.55635 15.633 9.82892 14.541C10.1015 13.449 11.1356 12.681 12.2726 12.681C12.4549 12.681 12.6373 12.707 12.8152 12.753V9.071C12.5514 9.045 12.2906 9.032 12.0327 9.032C9.1548 9.032 6.83366 11.354 6.83366 14.232C6.83366 17.11 9.1548 19.431 12.0327 19.431C14.9105 19.431 17.2317 17.11 17.2317 14.232V8.701C18.4837 9.619 19.9549 10.118 21.4671 10.115V6.381C20.7116 6.38 20.001 6.068 19.321 5.562Z" fill="currentColor"/>
          </svg>
        );
      default:
        return <User className="h-5 w-5" />;
    }
  };
  
  return (
    <div className="space-y-4">
      {accounts.map((account) => (
        <Card key={account.provider} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                  {getProviderIcon(account.provider)}
                </div>
                <div>
                  <h3 className="font-medium capitalize">{account.provider}</h3>
                  <div className="text-sm text-muted-foreground">
                    {account.isConnected ? (
                      <span className="flex items-center">
                        <CheckCircle className="h-3 w-3 text-secondary mr-1" />
                        {account.username}
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <AlertCircle className="h-3 w-3 text-destructive mr-1" />
                        Not connected
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {account.isConnected ? (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onDisconnect(account.provider)}
                >
                  Disconnect
                </Button>
              ) : (
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => onConnect(account.provider)}
                >
                  Connect
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ConnectedAccounts;
