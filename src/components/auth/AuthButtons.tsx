import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Instagram, Facebook } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAppMode } from '@/context/AppModeContext';

interface AuthButtonProps {
  onSuccess: (provider: string, userData: any) => void;
}

const AuthButtons = ({ onSuccess }: AuthButtonProps) => {
  const { toast } = useToast();
  const [verifyToken, setVerifyToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({
    instagram: false,
    facebook: false,
    tiktok: false
  });

  useEffect(() => {
    const localToken = crypto.randomUUID();
    setVerifyToken(localToken);
    console.log('Generated local verification token:', localToken);
  }, []);

  const handleAuthClick = (provider: string) => {
    setIsLoading({...isLoading, [provider]: true});
    
    if (provider === 'instagram') {
      const instagramAppId = "1657587694854878"; 
      const redirectUri = encodeURIComponent(window.location.origin + '/auth/instagram/callback');
      const scope = 'user_profile,user_media,instagram_graph_user_profile,instagram_graph_user_media'; 
      
      const state = verifyToken || crypto.randomUUID();
      const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${instagramAppId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&state=${state}`;
      
      console.log("Instagram auth URL:", authUrl);
      window.location.href = authUrl;
    } else if (provider === 'facebook') {
      toast({
        title: "Facebook OAuth",
        description: "Facebook OAuth integration is coming soon.",
      });
      setIsLoading({...isLoading, facebook: false});
    } else if (provider === 'tiktok') {
      const tiktokClientKey = "sbaw2rsueubl3ct46b";
      const redirectUri = encodeURIComponent(window.location.origin + '/auth/tiktok/callback');
      const scope = 'user.info.basic,video.list';
      const state = verifyToken || crypto.randomUUID();
      
      const authUrl = `https://www.tiktok.com/auth/authorize/?client_key=${tiktokClientKey}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&state=${state}`;
      
      console.log("TikTok auth URL:", authUrl);
      
      window.location.href = authUrl;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Button
        className="auth-button-instagram flex items-center justify-center gap-2"
        onClick={() => handleAuthClick('instagram')}
        disabled={isLoading.instagram}
      >
        <Instagram size={20} />
        {isLoading.instagram ? 'Connecting...' : 'Connect Instagram'}
      </Button>

      <Button
        className="auth-button-facebook flex items-center justify-center gap-2"
        onClick={() => handleAuthClick('facebook')}
        disabled={isLoading.facebook}
      >
        <Facebook size={20} />
        {isLoading.facebook ? 'Connecting...' : 'Connect Facebook'}
      </Button>

      <Button
        className="auth-button-tiktok flex items-center justify-center gap-2"
        onClick={() => handleAuthClick('tiktok')}
        disabled={isLoading.tiktok}
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
        {isLoading.tiktok ? 'Connecting...' : 'Connect TikTok'}
      </Button>
    </div>
  );
};

export default AuthButtons;
