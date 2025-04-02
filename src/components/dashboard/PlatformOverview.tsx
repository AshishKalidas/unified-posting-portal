
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Instagram, Facebook, ThumbsUp, MessageCircle, Eye } from 'lucide-react';

interface PlatformOverviewProps {
  platform: 'instagram' | 'facebook' | 'tiktok';
  stats: {
    followers: number;
    engagement: number;
    recentLikes: number;
    recentComments: number;
    recentViews: number;
  };
}

const PlatformOverview = ({ platform, stats }: PlatformOverviewProps) => {
  const getPlatformIcon = () => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="h-5 w-5 text-social-instagram" />;
      case 'facebook':
        return <Facebook className="h-5 w-5 text-social-facebook" />;
      case 'tiktok':
        return (
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-social-tiktok"
          >
            <path d="M19.321 5.562C18.7377 4.872 18.4421 4.012 18.4511 3.141H14.7173V15.276C14.6636 16.318 13.96 17.217 12.9471 17.57C12.7288 17.647 12.5007 17.687 12.2726 17.691C11.834 17.691 11.4092 17.578 11.0394 17.365C10.0688 16.777 9.55635 15.633 9.82892 14.541C10.1015 13.449 11.1356 12.681 12.2726 12.681C12.4549 12.681 12.6373 12.707 12.8152 12.753V9.071C12.5514 9.045 12.2906 9.032 12.0327 9.032C9.1548 9.032 6.83366 11.354 6.83366 14.232C6.83366 17.11 9.1548 19.431 12.0327 19.431C14.9105 19.431 17.2317 17.11 17.2317 14.232V8.701C18.4837 9.619 19.9549 10.118 21.4671 10.115V6.381C20.7116 6.38 20.001 6.068 19.321 5.562Z" fill="currentColor"/>
          </svg>
        );
      default:
        return null;
    }
  };
  
  const getPlatformClass = () => {
    switch (platform) {
      case 'instagram':
        return 'platform-instagram';
      case 'facebook':
        return 'platform-facebook';
      case 'tiktok':
        return 'platform-tiktok';
      default:
        return '';
    }
  };
  
  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-lg">
            <span className={`mr-2 ${getPlatformClass()}`}>{getPlatformIcon()}</span>
            <span className="capitalize">{platform}</span>
          </CardTitle>
          <Badge variant="outline" className="capitalize text-xs">
            {platform}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <p className="text-muted-foreground">Followers</p>
            <p className="font-medium">{stats.followers.toLocaleString()}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Engagement Rate</p>
            <p className="font-medium">{stats.engagement}%</p>
          </div>
        </div>
        
        <div className="mt-6 space-y-2">
          <h4 className="text-xs uppercase text-muted-foreground tracking-wider font-semibold">Recent Activity</h4>
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center p-2 bg-muted rounded-md">
              <ThumbsUp className="h-4 w-4 mb-1" />
              <span className="text-xs text-muted-foreground">Likes</span>
              <span className="font-medium">{stats.recentLikes}</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-muted rounded-md">
              <MessageCircle className="h-4 w-4 mb-1" />
              <span className="text-xs text-muted-foreground">Comments</span>
              <span className="font-medium">{stats.recentComments}</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-muted rounded-md">
              <Eye className="h-4 w-4 mb-1" />
              <span className="text-xs text-muted-foreground">Views</span>
              <span className="font-medium">{stats.recentViews}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlatformOverview;
