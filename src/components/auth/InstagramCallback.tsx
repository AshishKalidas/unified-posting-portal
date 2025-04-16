import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { useAppMode } from '@/context/AppModeContext';

type InstagramUserData = {
  id: string;
  username: string;
  profilePicture?: string;
};

const InstagramCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isDemoMode, setIsDemoMode } = useAppMode();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const errorParam = searchParams.get('error');
    const errorReason = searchParams.get('error_reason');
    const errorDescription = searchParams.get('error_description');

    if (errorParam) {
      console.error('Instagram OAuth Error:', { errorParam, errorReason, errorDescription });
      setError(`Authentication failed: ${errorDescription || errorReason || errorParam}`);
      setStatus('error');
      toast({
        title: "Instagram Connection Failed",
        description: `Error: ${errorDescription || errorReason || errorParam}`,
        variant: "destructive",
      });
      // Redirect back to settings after showing error
      setTimeout(() => navigate('/settings'), 5000);
      return;
    }

    if (!code) {
      console.error('Instagram OAuth Error: No code received.');
      setError('Authentication failed: Authorization code not found.');
      setStatus('error');
      toast({
        title: "Instagram Connection Failed",
        description: "Authorization code was missing in the callback.",
        variant: "destructive",
      });
      // Redirect back to settings
      setTimeout(() => navigate('/settings'), 5000);
      return;
    }

    const exchangeTokenWithBackend = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/instagram/exchange-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code,
            redirect_uri: window.location.origin + '/auth/instagram/callback',
            client_id: "1657587694854878",
            client_secret: "your_client_secret_here"
          }),
        });

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error_message || 'Failed to exchange token');
        }

        setStatus('success');
        toast({
          title: "Instagram Connected",
          description: "Successfully connected your Instagram account.",
        });

        localStorage.setItem('instagram_auth', JSON.stringify({
          connected: true,
          username: data.username,
          userId: data.userId,
          timestamp: new Date().toISOString()
        }));

        setTimeout(() => navigate('/settings'), 2000);
      } catch (error) {
        console.error('Token exchange error:', error);
        setError('Failed to exchange authorization code for access token.');
        setStatus('error');
        toast({
          title: "Instagram Connection Failed",
          description: error.message || "Error during token exchange with backend.",
          variant: "destructive",
        });
        setTimeout(() => navigate('/settings'), 5000);
      }
    };
    
    exchangeTokenWithBackend();
  }, [location, navigate, toast]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      {status === 'loading' && (
        <>
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-lg text-muted-foreground">Connecting to Instagram...</p>
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
          <p className="text-muted-foreground">Your Instagram account has been connected.</p>
          <p className="text-muted-foreground">Redirecting back to settings...</p>
        </div>
      )}
    </div>
  );
};

export default InstagramCallback;
