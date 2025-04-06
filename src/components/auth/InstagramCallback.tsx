
// src/components/auth/InstagramCallback.tsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

// TODO: Define a more specific type for user data later
type InstagramUserData = {
  id: string;
  username: string;
  // Add other fields as needed, e.g., profilePicture
};

const InstagramCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    const state = searchParams.get('state'); // Instagram returns our verification token in the state parameter
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

    // Validate state parameter (verification token)
    fetch('http://localhost:3000/auth/instagram/verification-token')
      .then(response => response.json())
      .then(data => {
        if (state !== data.token) {
          throw new Error('Invalid state parameter. This could be a CSRF attack.');
        }
        return exchangeCodeForToken(code);
      })
      .catch(err => {
        console.error('Verification error:', err);
        setError(`Authentication failed: ${err.message || 'Invalid verification token'}`);
        setStatus('error');
        toast({
          title: "Instagram Connection Failed",
          description: err.message || "Verification failed",
          variant: "destructive",
        });
        setTimeout(() => navigate('/settings'), 5000);
      });

    // --- Exchange code for access token ---
    const exchangeCodeForToken = async (authCode: string) => {
      const clientId = "1657587694854878"; // Using the provided app ID
      const clientSecret = "9db54e265a4a7a3ef1a9f3ff3f4dd529"; // Using the provided app secret
      // Must match the redirect_uri used in the initial auth request
      const redirectUri = window.location.origin + '/auth/instagram/callback'; 

      if (!clientId || !clientSecret) {
        console.error("Instagram App ID or Secret is not configured correctly");
        setError("Configuration Error: Instagram integration is not configured correctly.");
        setStatus('error');
        toast({
          title: "Configuration Error",
          description: "Instagram App ID or Secret missing.",
          variant: "destructive",
        });
        setTimeout(() => navigate('/settings'), 5000);
        return;
      }

      try {
        // For security, we should make this request server-side
        // For demo purposes, we'll simulate a server call
        const response = await fetch('http://localhost:3000/auth/instagram/exchange-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code: authCode, 
            redirect_uri: redirectUri,
            client_id: clientId,
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
          title: "Instagram Connected",
          description: `Successfully connected as ${data.username || 'your account'}.`,
        });

        // Redirect back to settings page after success
        setTimeout(() => navigate('/settings'), 2000);

      } catch (err: any) {
        console.error('Error exchanging code or fetching profile:', err);
        setError(`Authentication failed: ${err.message || 'An unknown error occurred.'}`);
        setStatus('error');
        toast({
          title: "Instagram Connection Failed",
          description: err.message || "Could not complete authentication.",
          variant: "destructive",
        });
        // Redirect back to settings after error
        setTimeout(() => navigate('/settings'), 5000);
      }
    };

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
