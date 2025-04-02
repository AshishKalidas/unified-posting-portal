
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, ThumbsUp, Eye, BarChart2, Users } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import AnalyticsChart from '@/components/dashboard/AnalyticsChart';
import PlatformOverview from '@/components/dashboard/PlatformOverview';
import PostCreator from '@/components/posting/PostCreator';
import CommentList from '@/components/comments/CommentList';
import AuthButtons from '@/components/auth/AuthButtons';
import { useToast } from '@/components/ui/use-toast';

// Mock data for the dashboard
const analyticsData = [
  { name: 'Mon', instagram: 400, facebook: 240, tiktok: 320 },
  { name: 'Tue', instagram: 300, facebook: 139, tiktok: 450 },
  { name: 'Wed', instagram: 550, facebook: 980, tiktok: 410 },
  { name: 'Thu', instagram: 500, facebook: 380, tiktok: 500 },
  { name: 'Fri', instagram: 600, facebook: 430, tiktok: 610 },
  { name: 'Sat', instagram: 750, facebook: 590, tiktok: 820 },
  { name: 'Sun', instagram: 800, facebook: 500, tiktok: 920 }
];

const dataKeys = [
  { key: 'instagram', name: 'Instagram', color: '#C13584' },
  { key: 'facebook', name: 'Facebook', color: '#3b5998' },
  { key: 'tiktok', name: 'TikTok', color: '#000000' }
];

const mockComments = [
  {
    id: '1',
    username: 'user_123',
    content: 'This is a fantastic post! Love the content you\'re sharing.',
    date: new Date(Date.now() - 3600000),
    platform: 'instagram' as const,
    likes: 24,
    replied: false,
    postTitle: 'Summer Collection'
  },
  {
    id: '2',
    username: 'social_fan',
    content: 'When are you releasing more of these? I\'ve been waiting!',
    date: new Date(Date.now() - 86400000),
    platform: 'facebook' as const,
    likes: 12,
    replied: true,
    postTitle: 'New Product Launch'
  },
  {
    id: '3',
    username: 'tiktok_viewer',
    content: 'This video was amazing! Can you do a tutorial on how you made it?',
    date: new Date(Date.now() - 129600000),
    platform: 'tiktok' as const,
    likes: 156,
    replied: false,
    postTitle: 'Behind the Scenes'
  }
];

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [connectedAccounts, setConnectedAccounts] = useState<string[]>([]);
  const [comments, setComments] = useState(mockComments);
  const { toast } = useToast();
  
  const handleAuthSuccess = (provider: string, userData: any) => {
    if (!connectedAccounts.includes(provider)) {
      setConnectedAccounts([...connectedAccounts, provider]);
    }
    
    if (!isAuthenticated) {
      setIsAuthenticated(true);
    }
  };
  
  const handleCommentReply = (commentId: string, reply: string) => {
    setComments(comments.map(comment => 
      comment.id === commentId ? { ...comment, replied: true } : comment
    ));
  };
  
  const handleCommentDelete = (commentId: string) => {
    setComments(comments.filter(comment => comment.id !== commentId));
    toast({
      title: "Comment deleted",
      description: "The comment has been removed from your dashboard",
    });
  };
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-center mb-2">
            <span className="text-primary">Social</span>
            <span className="text-accent">Actuator</span>
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Manage all your social media accounts in one place.
          </p>
          
          <div className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-4">
              <h2 className="text-lg font-medium mb-2">Connect your accounts</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Connect your social media accounts to start managing your presence.
              </p>
              <AuthButtons onSuccess={handleAuthSuccess} />
            </div>
            
            <div className="text-center text-sm text-muted-foreground">
              By connecting your accounts, you agree to our Terms of Service and Privacy Policy.
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your social media command center.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard
          title="Total Followers"
          value="24.5K"
          change={12.5}
          icon={<Users className="h-5 w-5 text-primary" />}
        />
        <StatCard
          title="Total Engagement"
          value="8.2K"
          change={4.2}
          icon={<ThumbsUp className="h-5 w-5 text-primary" />}
        />
        <StatCard
          title="Total Views"
          value="138.7K"
          change={-2.5}
          icon={<Eye className="h-5 w-5 text-primary" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <PlatformOverview
          platform="instagram"
          stats={{
            followers: 10200,
            engagement: 4.7,
            recentLikes: 342,
            recentComments: 67,
            recentViews: 5840
          }}
        />
        <PlatformOverview
          platform="facebook"
          stats={{
            followers: 8500,
            engagement: 3.2,
            recentLikes: 187,
            recentComments: 42,
            recentViews: 3150
          }}
        />
        <PlatformOverview
          platform="tiktok"
          stats={{
            followers: 5800,
            engagement: 6.3,
            recentLikes: 1240,
            recentComments: 98,
            recentViews: 15200
          }}
        />
      </div>
      
      <Tabs defaultValue="overview" className="mb-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="create">Create Post</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <AnalyticsChart
            title="7-Day Performance Across Platforms"
            data={analyticsData}
            dataKeys={dataKeys}
            className="w-full"
          />
        </TabsContent>
        
        <TabsContent value="engagement">
          <div>
            <CommentList 
              comments={comments} 
              onReply={handleCommentReply}
              onDelete={handleCommentDelete}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="create">
          <div className="max-w-xl mx-auto">
            <PostCreator />
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Index;
