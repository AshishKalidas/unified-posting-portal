
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

type TiktokUserData = {
  id: string;
  username: string;
  profilePicture?: string;
};

const TiktokCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    const errorParam = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    if (errorParam) {
      console.error('TikTok OAuth Error:', { errorParam, errorDescription });
      setError(`Authentication failed: ${errorDescription || errorParam}`);
      setStatus('error');
      toast({
        title: "TikTok Connection Failed",
        description: `Error: ${errorDescription || errorParam}`,
        variant: "destructive",
      });
      // Redirect back to settings after showing error
      setTimeout(() => navigate('/settings'), 5000);
      return;
    }

    if (!code) {
      console.error('TikTok OAuth Error: No code received.');
      setError('Authentication failed: Authorization code not found.');
      setStatus('error');
      toast({
        title: "TikTok Connection Failed",
        description: "Authorization code was missing in the callback.",
        variant: "destructive",
      });
      // Redirect back to settings
      setTimeout(() => navigate('/settings'), 5000);
      return;
    }

    // Exchange code for access token
    const exchangeCodeForToken = async (authCode: string) => {
      const clientKey = "sbaw2rsueubl3ct46b";
      const clientSecret = "DDIAzCBRBO7gFe8ZCPDeN43Tbms1ik2p";
      const redirectUri = window.location.origin + '/auth/tiktok/callback';

      try {
        // In a production app, this call would be made server-side to protect the client secret
        // For demo purposes, we'll simulate a server-side exchange
        
        // Send to our backend server to handle token exchange
        const response = await fetch('http://localhost:3000/auth/tiktok/exchange-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code: authCode,
            redirect_uri: redirectUri,
            client_key: clientKey,
            client_secret: clientSecret
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error_message || 'Failed to exchange code for token');
        }

        setStatus('success');
        toast({
          title: "TikTok Connected",
          description: `Successfully connected your TikTok account.`,
        });

        // Redirect back to settings page after success
        setTimeout(() => navigate('/settings'), 2000);

      } catch (err: any) {
        console.error('Error exchanging code or fetching profile:', err);
        setError(`Authentication failed: ${err.message || 'An unknown error occurred.'}`);
        setStatus('error');
        toast({
          title: "TikTok Connection Failed",
          description: err.message || "Could not complete authentication.",
          variant: "destructive",
        });
        // Redirect back to settings after error
        setTimeout(() => navigate('/settings'), 5000);
      }
    };

    exchangeCodeForToken(code);
  }, [location, navigate, toast]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      {status === 'loading' && (
        <>
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-lg text-muted-foreground">Connecting to TikTok...</p>
          <p className="text-sm text-muted-foreground">Please wait while we complete the authentication.</p>
        </>
      )}
      {status === 'error' && (
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-destructive mb-2">Connection Failed</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <p className="text-muted-foreground">Redirecting back to settings...</p>
        </div>
      )}
      {status === 'success' && (
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-green-600 mb-2">Connection Successful</h2>
          <p className="text-muted-foreground">Your TikTok account has been connected.</p>
          <p className="text-muted-foreground">Redirecting back to settings...</p>
        </div>
      )}
    </div>
  );
};

export default TiktokCallback;
