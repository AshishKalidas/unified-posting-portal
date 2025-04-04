
import { useAppMode } from "@/context/AppModeContext";

// Types
interface SocialMediaUserData {
  id: string;
  username: string;
  profilePicture?: string;
  accessToken?: string;
}

// Demo mode implementations
const demoAuth = (provider: string) => {
  return new Promise<SocialMediaUserData>((resolve) => {
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
const realAuth = async (provider: string) => {
  console.log(`Initiating authentication with ${provider}`);

  if (provider === 'instagram') {
    // Instagram OAuth is handled by redirect, so we don't need to do anything here
    // The redirect happens in the AuthButtons component
    // This function won't actually return, as the page navigates away
    return new Promise<SocialMediaUserData>(() => {});
  } else {
    throw new Error(`Authentication for ${provider} not yet implemented`);
  }
};

const realGetAnalytics = async (platform: string, timeRange: string, userId: string) => {
  // Make a request to our backend, which will handle the API call with the stored token
  try {
    const response = await fetch(`http://localhost:3000/api/social/${platform}/analytics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId,
        data: { timeRange }
      })
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    throw error;
  }
};

const realPostContent = async (content: string, platforms: string[], userId: string, image?: File) => {
  // For each platform, make a request to our backend
  try {
    const results = await Promise.all(platforms.map(async (platform) => {
      const formData = new FormData();
      formData.append('content', content);
      if (image) {
        formData.append('image', image);
      }
      
      const response = await fetch(`http://localhost:3000/api/social/${platform}/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          data: { content, hasImage: !!image }
        })
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      return response.json();
    }));
    
    return results.every(res => res.success);
  } catch (error) {
    console.error('Failed to post content:', error);
    throw error;
  }
};

// Check connection status with the backend
const checkConnection = async (provider: string, userId: string) => {
  try {
    const response = await fetch(`http://localhost:3000/auth/check-connection/${provider}/${userId}`);
    if (!response.ok) {
      throw new Error(`Failed to check connection status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Connection check failed:', error);
    return { isConnected: false };
  }
};

// Service wrapper that chooses between demo and real implementations
export const useSocialMediaService = () => {
  const { isDemoMode } = useAppMode();
  
  const authenticate = async (provider: string) => {
    if (isDemoMode) {
      return demoAuth(provider);
    } else {
      return realAuth(provider);
    }
  };
  
  const getAnalytics = async (platform: string, timeRange: string = '7d', userId?: string) => {
    if (isDemoMode) {
      return demoGetAnalytics(platform, timeRange);
    } else {
      if (!userId) throw new Error(`User ID required for real mode analytics`);
      return realGetAnalytics(platform, timeRange, userId);
    }
  };
  
  const postContent = async (content: string, platforms: string[], userId?: string, image?: File) => {
    if (isDemoMode) {
      return demoPostContent(content, platforms, image);
    } else {
      if (!userId) throw new Error("User ID required for posting in real mode");
      return realPostContent(content, platforms, userId, image);
    }
  };
  
  const isConnected = async (provider: string, userId?: string) => {
    if (isDemoMode) {
      // In demo mode, always return true
      return Promise.resolve({ isConnected: true, username: `${provider}_user` });
    } else {
      if (!userId) return { isConnected: false };
      return checkConnection(provider, userId);
    }
  };
  
  return {
    authenticate,
    getAnalytics,
    postContent,
    isConnected
  };
};
