
import React from 'react';
import { Button } from '@/components/ui/button';
import { Instagram, Facebook } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface AuthButtonProps {
  onSuccess: (provider: string, userData: any) => void;
}

const AuthButtons = ({ onSuccess }: AuthButtonProps) => {
  const { toast } = useToast();

  const handleAuthClick = (provider: string) => {
    // This would be replaced with actual OAuth implementation
    toast({
      title: "Authentication in demo mode",
      description: `In a real app, this would open ${provider} OAuth flow`,
    });
    
    // Mock successful authentication with demo data
    setTimeout(() => {
      const mockUserData = {
        id: `${provider}_12345`,
        username: `${provider}_user`,
        profilePicture: '/placeholder.svg',
        accessToken: `mock_token_${Math.random().toString(36).substr(2, 9)}`,
      };
      
      onSuccess(provider, mockUserData);
      
      toast({
        title: "Successfully connected",
        description: `Your ${provider} account has been connected successfully.`,
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-4">
      <Button 
        className="auth-button-instagram flex items-center justify-center gap-2" 
        onClick={() => handleAuthClick('instagram')}
      >
        <Instagram size={20} />
        Connect Instagram
      </Button>
      
      <Button 
        className="auth-button-facebook flex items-center justify-center gap-2"
        onClick={() => handleAuthClick('facebook')}
      >
        <Facebook size={20} />
        Connect Facebook
      </Button>
      
      <Button 
        className="auth-button-tiktok flex items-center justify-center gap-2"
        onClick={() => handleAuthClick('tiktok')}
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ color: "white" }}
        >
          <path d="M19.321 5.562C18.7377 4.872 18.4421 4.012 18.4511 3.141H14.7173V15.276C14.6636 16.318 13.96 17.217 12.9471 17.57C12.7288 17.647 12.5007 17.687 12.2726 17.691C11.834 17.691 11.4092 17.578 11.0394 17.365C10.0688 16.777 9.55635 15.633 9.82892 14.541C10.1015 13.449 11.1356 12.681 12.2726 12.681C12.4549 12.681 12.6373 12.707 12.8152 12.753V9.071C12.5514 9.045 12.2906 9.032 12.0327 9.032C9.1548 9.032 6.83366 11.354 6.83366 14.232C6.83366 17.11 9.1548 19.431 12.0327 19.431C14.9105 19.431 17.2317 17.11 17.2317 14.232V8.701C18.4837 9.619 19.9549 10.118 21.4671 10.115V6.381C20.7116 6.38 20.001 6.068 19.321 5.562Z" fill="currentColor"/>
        </svg>
        Connect TikTok
      </Button>
    </div>
  );
};

export default AuthButtons;
