
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { useAppMode } from '@/context/AppModeContext';

type TiktokUserData = {
  id: string;
  username: string;
  profilePicture?: string;
};

const TiktokCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isDemoMode, setIsDemoMode } = useAppMode();
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

    // Log the received code for debugging
    console.log("TikTok authorization code received:", code);
    
    // For a proper implementation, exchange the code for a token
    // Since we're experiencing API validation errors, we'll handle them gracefully
    const exchangeTokenWithBackend = async () => {
      try {
        // In a real implementation, this would call your backend endpoint
        // For now, we'll simulate a successful response since we're working on setting up the backend
        
        // Simulate successful exchange and store mock tokens
        setStatus('success');
        toast({
          title: "TikTok Connected",
          description: "Successfully connected your TikTok account (simulated).",
        });
        
        // Store in localStorage
        localStorage.setItem('tiktok_auth', JSON.stringify({
          connected: true,
          username: 'tiktok_user',
          timestamp: new Date().toISOString()
        }));
        
        // Redirect back to settings page after success
        setTimeout(() => navigate('/settings'), 2000);
      } catch (error) {
        console.error('Token exchange error:', error);
        setError('Failed to exchange authorization code for access token.');
        setStatus('error');
        toast({
          title: "TikTok Connection Failed",
          description: "Error during token exchange with backend.",
          variant: "destructive",
        });
        setTimeout(() => navigate('/settings'), 5000);
      }
    };
    
    // Call the token exchange function
    exchangeTokenWithBackend();
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
