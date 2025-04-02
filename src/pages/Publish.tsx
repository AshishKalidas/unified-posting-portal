
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Send, Calendar } from 'lucide-react';
import PostCreator from '@/components/posting/PostCreator';
import PostSchedule from '@/components/posting/PostSchedule';

// Mock data for scheduled posts with properly typed platforms
const mockScheduledPosts = [
  {
    id: '1',
    content: 'Check out our new summer collection! Perfect for those hot days ahead. #SummerFashion #NewArrivals',
    date: new Date(Date.now() + 86400000), // Tomorrow
    platforms: ['instagram', 'facebook', 'tiktok'] as ('instagram' | 'facebook' | 'tiktok')[],
    image: '/placeholder.svg'
  },
  {
    id: '2',
    content: 'Behind the scenes of our latest photoshoot. Can you guess the theme? 👀 #BTS #ComingSoon',
    date: new Date(Date.now() + 172800000), // Day after tomorrow
    platforms: ['instagram', 'tiktok'] as ('instagram' | 'facebook' | 'tiktok')[],
    image: '/placeholder.svg'
  },
  {
    id: '3',
    content: 'We\'re hosting a special giveaway this weekend! Stay tuned for more details on how to enter. #Giveaway #FreeStuff',
    date: new Date(Date.now() + 259200000), // 3 days from now
    platforms: ['facebook', 'instagram'] as ('instagram' | 'facebook' | 'tiktok')[]
  },
  {
    id: '4',
    content: 'Customer spotlight! See how @user123 styled our products. Want to be featured? Tag us in your posts! #CustomerSpotlight',
    date: new Date(Date.now() + 345600000), // 4 days from now
    platforms: ['instagram', 'facebook', 'tiktok'] as ('instagram' | 'facebook' | 'tiktok')[],
    image: '/placeholder.svg'
  }
];

const Publish = () => {
  const [scheduledPosts] = useState(mockScheduledPosts);
  
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <Send className="mr-2 h-8 w-8" />
          Publish
        </h1>
        <p className="text-muted-foreground">Create and schedule posts for all your social media platforms.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <PostCreator />
        </div>
        
        <div>
          <PostSchedule scheduledPosts={scheduledPosts} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Publish;
