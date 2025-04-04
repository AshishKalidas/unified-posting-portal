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

    // --- Exchange code for access token ---
    const exchangeCodeForToken = async (authCode: string) => {
      const clientId = import.meta.env.VITE_INSTAGRAM_APP_ID;
      const clientSecret = import.meta.env.VITE_INSTAGRAM_APP_SECRET;
      // Must match the redirect_uri used in the initial auth request
      const redirectUri = 'http://localhost:5173/auth/instagram/callback'; 

      if (!clientId || !clientSecret) {
        console.error("Instagram App ID or Secret is not configured in .env");
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

      const tokenUrl = 'https://api.instagram.com/oauth/access_token';
      const body = new FormData();
      body.append('client_id', clientId);
      body.append('client_secret', clientSecret);
      body.append('grant_type', 'authorization_code');
      body.append('redirect_uri', redirectUri);
      body.append('code', authCode);

      try {
        const response = await fetch(tokenUrl, {
          method: 'POST',
          body: body,
        });

        const data = await response.json();

        if (!response.ok || data.error_message) {
          throw new Error(data.error_message || `HTTP error! status: ${response.status}`);
        }

        const accessToken = data.access_token;
        const userId = data.user_id; // Instagram Basic Display returns user_id

        if (!accessToken || !userId) {
            throw new Error('Access token or User ID not received from Instagram.');
        }

        // --- Fetch user profile ---
        // Note: Basic Display API requires a different endpoint and fields
        const profileUrl = `https://graph.instagram.com/${userId}?fields=id,username&access_token=${accessToken}`;
        const profileResponse = await fetch(profileUrl);
        const profileData = await profileResponse.json();

        // Validate we got the expected response format
        if (!profileData.id || !profileData.username) {
          throw new Error('Invalid profile data received from Instagram');
        }

        if (!profileResponse.ok || profileData.error) {
            throw new Error(profileData.error?.message || `Failed to fetch user profile. Status: ${profileResponse.status}`);
        }

        // --- Success ---
        setStatus('success');
        toast({
          title: "Instagram Connected",
          description: `Successfully connected as ${profileData.username}.`,
        });

        // Send the access token and user ID to the server for secure storage
        fetch('http://localhost:3000/auth/instagram/store-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            accessToken: accessToken,
            userId: userId,
            username: profileData.username,
          }),
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to store token: ${response.status}`);
          }
          console.log("Instagram Access Token sent to server.");
        })
        .catch(error => {
          console.error('Error storing access token:', error);
          setError(`Failed to store access token: ${error.message || 'An unknown error occurred.'}`);
          setStatus('error');
          toast({
            title: "Instagram Connection Failed",
            description: error.message || "Could not store access token.",
            variant: "destructive",
          });
          setTimeout(() => navigate('/settings'), 5000);
          return;
        });

        // Redirect back to settings page after success
        navigate('/settings');

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

    exchangeCodeForToken(code);

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
       {/* Success state is handled by redirecting immediately */}
    </div>
  );
};

export default InstagramCallback;