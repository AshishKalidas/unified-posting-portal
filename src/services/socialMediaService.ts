
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
const realAuth = async (provider: string, apiKey: string) => {
  // This would be replaced with actual OAuth or API authentication
  console.log(`Authenticating with ${provider} using API key: ${apiKey}`);
  
  // In a real implementation, this would use the platform-specific APIs
  // e.g., Facebook Graph API, Instagram Basic Display API, TikTok API
  throw new Error("Real API authentication not implemented");
};

const realGetAnalytics = async (platform: string, timeRange: string, apiKey: string) => {
  // This would use the real API to get analytics data
  console.log(`Getting ${platform} analytics for ${timeRange} using API key: ${apiKey}`);
  
  // In a real implementation, this would use the platform-specific APIs
  throw new Error("Real API analytics not implemented");
};

const realPostContent = async (content: string, platforms: string[], apiKeys: Record<string, string>, image?: File) => {
  // This would post to the real APIs
  console.log(`Posting content to ${platforms.join(', ')}`, content, image);
  
  // In a real implementation, this would use the platform-specific APIs
  throw new Error("Real API posting not implemented");
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
