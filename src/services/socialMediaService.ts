
import { useAppMode } from "@/context/AppModeContext";

// Demo mode implementations
const demoAuth = (provider: string) => {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve({
        id: `${provider}_12345`,
        username: `${provider}_user`,
        profilePicture: '/placeholder.svg',
        accessToken: `mock_token_${Math.random().toString(36).substr(2, 9)}`,
      });
    }, 1500);
  });
};

const demoGetAnalytics = (platform: string, timeRange: string) => {
  const mockData = [
    { name: 'Mon', [platform]: 400 },
    { name: 'Tue', [platform]: 300 },
    { name: 'Wed', [platform]: 550 },
    { name: 'Thu', [platform]: 500 },
    { name: 'Fri', [platform]: 600 },
    { name: 'Sat', [platform]: 750 },
    { name: 'Sun', [platform]: 800 }
  ];
  
  return Promise.resolve(mockData);
};

const demoPostContent = (content: string, platforms: string[], image?: File) => {
  return new Promise<boolean>((resolve) => {
    setTimeout(() => resolve(true), 2000);
  });
};

// Real API implementations
const realAuth = async (provider: string, apiKey?: string) => { // apiKey might not be needed for OAuth initiation
  console.log(`Initiating authentication with ${provider}`);

  if (provider === 'instagram') {
    const clientId = import.meta.env.VITE_INSTAGRAM_APP_ID;
    const redirectUri = 'http://localhost:5173/auth/instagram/callback'; // Must match callback and FB App config
    const scope = 'user_profile,user_media'; // Basic Display API scopes

    if (!clientId) {
      console.error("Instagram App ID is not configured in .env");
      throw new Error("Configuration Error: Instagram integration is not configured correctly.");
    }

    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&response_type=code`;

    // Redirect the user's browser to Instagram's authorization page
    window.location.href = authUrl;
    
    // Return a promise that never resolves, as the page navigates away
    return new Promise(() => { });

  } else if (provider === 'facebook') {
    const clientId = import.meta.env.VITE_FACEBOOK_APP_ID;
    const redirectUri = 'http://localhost:5173/auth/facebook/callback';
    const scope = 'pages_manage_posts,pages_read_engagement';

    if (!clientId) {
      console.error("Facebook App ID is not configured in .env");
      throw new Error("Configuration Error: Facebook integration is not configured correctly.");
    }

    const authUrl = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;
    window.location.href = authUrl;
    return new Promise(() => { });

  } else if (provider === 'tiktok') {
    const clientKey = import.meta.env.VITE_TIKTOK_CLIENT_KEY;
    const redirectUri = 'http://localhost:5173/auth/tiktok/callback';
    const scope = 'user.info.basic,video.list';

    if (!clientKey) {
      console.error("TikTok Client Key is not configured in .env");
      throw new Error("Configuration Error: TikTok integration is not configured correctly.");
    }

    const authUrl = `https://www.tiktok.com/v2/auth/authorize?client_key=${clientKey}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&response_type=code`;
    window.location.href = authUrl;
    return new Promise(() => { });
  } else {
    throw new Error(`Unsupported provider: ${provider}`);
  }
};

const realGetAnalytics = async (platform: string, timeRange: string, apiKey: string) => {
  // This would use the real API to get analytics data
  console.log(`Getting ${platform} analytics for ${timeRange} using API key: ${apiKey}`);
  
  // In a real implementation, this would use the platform-specific APIs
  try {
    switch(platform) {
      case 'facebook':
        const fbResponse = await fetch(`https://graph.facebook.com/v12.0/me/insights?metric=post_impressions,post_engagement&period=${timeRange}`, {
          headers: { 'Authorization': `Bearer ${apiKey}` }
        });
        return fbResponse.json();
        
      case 'instagram':
        const igResponse = await fetch(`https://graph.facebook.com/v12.0/me/insights?metric=impressions,reach,engagement&period=${timeRange}`, {
          headers: { 'Authorization': `Bearer ${apiKey}` }
        });
        return igResponse.json();
        
      case 'tiktok':
        const ttResponse = await fetch(`https://open.tiktokapis.com/v2/statistics/video/query/`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            filters: {
              time_range: {
                start: getStartDate(timeRange),
                end: new Date().toISOString()
              }
            }
          })
        });
        return ttResponse.json();
        
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  } catch (error) {
    console.error('Analytics fetch failed:', error);
    throw error;
  }
  
  function getStartDate(range: string) {
    const now = new Date();
    switch(range) {
      case '24h': return new Date(now.setDate(now.getDate() - 1)).toISOString();
      case '7d': return new Date(now.setDate(now.getDate() - 7)).toISOString();
      case '30d': return new Date(now.setDate(now.getDate() - 30)).toISOString();
      default: return new Date(now.setDate(now.getDate() - 7)).toISOString();
    }
  }
};

const realPostContent = async (content: string, platforms: string[], apiKeys: Record<string, string>, image?: File) => {
  // This would post to the real APIs
  console.log(`Posting content to ${platforms.join(', ')}`, content, image);
  
  // In a real implementation, this would use the platform-specific APIs
  // Implement actual API calls for each platform
  const results = await Promise.all(platforms.map(async (platform) => {
    const apiKey = apiKeys[platform];
    if (!apiKey) throw new Error(`Missing API key for ${platform}`);
    
    switch(platform) {
      case 'facebook':
        // Facebook Page Post API
        const fbResponse = await fetch(`https://graph.facebook.com/v12.0/me/feed`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: content,
            published: true
          })
        });
        return fbResponse.json();
        
      case 'instagram':
        // Instagram Graph API
        const igResponse = await fetch(`https://graph.facebook.com/v12.0/me/media`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            caption: content,
            image_url: image ? URL.createObjectURL(image) : undefined
          })
        });
        return igResponse.json();
        
      case 'tiktok':
        // TikTok Video Upload API
        const formData = new FormData();
        formData.append('description', content);
        if (image) formData.append('video', image);
        
        const ttResponse = await fetch(`https://open.tiktokapis.com/v2/post/publish/inbox/video/upload/`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`
          },
          body: formData
        });
        return ttResponse.json();
        
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }));

  return results.every(res => res.success);
};

// Service wrapper that chooses between demo and real implementations
export const useSocialMediaService = () => {
  const { isDemoMode } = useAppMode();
  
  const authenticate = async (provider: string, apiKey?: string) => {
    if (isDemoMode) {
      return demoAuth(provider);
    } else {
      if (!apiKey) throw new Error(`API key required for ${provider}`);
      return realAuth(provider, apiKey);
    }
  };
  
  const getAnalytics = async (platform: string, timeRange: string = '7d', apiKey?: string) => {
    if (isDemoMode) {
      return demoGetAnalytics(platform, timeRange);
    } else {
      if (!apiKey) throw new Error(`API key required for ${platform}`);
      return realGetAnalytics(platform, timeRange, apiKey);
    }
  };
  
  const postContent = async (content: string, platforms: string[], apiKeys?: Record<string, string>, image?: File) => {
    if (isDemoMode) {
      return demoPostContent(content, platforms, image);
    } else {
      if (!apiKeys) throw new Error("API keys required for posting");
      return realPostContent(content, platforms, apiKeys, image);
    }
  };
  
  return {
    authenticate,
    getAnalytics,
    postContent
  };
};
