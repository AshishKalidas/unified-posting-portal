
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { MessageSquare, Filter } from 'lucide-react';
import CommentList from '@/components/comments/CommentList';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

// Mock comments data
const mockCommentsByPlatform = {
  all: [
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
    },
    {
      id: '4',
      username: 'curious_fan',
      content: 'What camera do you use for these shots? They look so professional!',
      date: new Date(Date.now() - 172800000),
      platform: 'instagram' as const,
      likes: 42,
      replied: false,
      postTitle: 'Product Photography'
    },
    {
      id: '5',
      username: 'design_lover',
      content: 'I absolutely love the aesthetic of your brand. So cohesive!',
      date: new Date(Date.now() - 259200000),
      platform: 'facebook' as const,
      likes: 38,
      replied: false,
      postTitle: 'Brand Update'
    }
  ],
  instagram: [
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
      id: '4',
      username: 'curious_fan',
      content: 'What camera do you use for these shots? They look so professional!',
      date: new Date(Date.now() - 172800000),
      platform: 'instagram' as const,
      likes: 42,
      replied: false,
      postTitle: 'Product Photography'
    }
  ],
  facebook: [
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
      id: '5',
      username: 'design_lover',
      content: 'I absolutely love the aesthetic of your brand. So cohesive!',
      date: new Date(Date.now() - 259200000),
      platform: 'facebook' as const,
      likes: 38,
      replied: false,
      postTitle: 'Brand Update'
    }
  ],
  tiktok: [
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
  ]
};

const Comments = () => {
  const [platform, setPlatform] = useState('all');
  const [filter, setFilter] = useState('all');
  const [comments, setComments] = useState(mockCommentsByPlatform.all);
  const { toast } = useToast();
  
  const handleCommentReply = (commentId: string, reply: string) => {
    const updatedComments = comments.map(comment => 
      comment.id === commentId ? { ...comment, replied: true } : comment
    );
    setComments(updatedComments);
    
    // Update the platform-specific comments as well
    for (const key in mockCommentsByPlatform) {
      if (key !== 'all') {
        // @ts-ignore
        mockCommentsByPlatform[key] = mockCommentsByPlatform[key].map(comment =>
          comment.id === commentId ? { ...comment, replied: true } : comment
        );
      }
    }
    mockCommentsByPlatform.all = mockCommentsByPlatform.all.map(comment =>
      comment.id === commentId ? { ...comment, replied: true } : comment
    );
  };
  
  const handleCommentDelete = (commentId: string) => {
    // Remove from current view
    const updatedComments = comments.filter(comment => comment.id !== commentId);
    setComments(updatedComments);
    
    // Update the platform-specific comments as well
    for (const key in mockCommentsByPlatform) {
      // @ts-ignore
      mockCommentsByPlatform[key] = mockCommentsByPlatform[key].filter(comment => comment.id !== commentId);
    }
    
    toast({
      title: "Comment deleted",
      description: "The comment has been removed from your dashboard",
    });
  };
  
  const handlePlatformChange = (value: string) => {
    setPlatform(value);
    // @ts-ignore
    const platformComments = mockCommentsByPlatform[value] || [];
    
    if (filter === 'replied') {
      setComments(platformComments.filter(comment => comment.replied));
    } else if (filter === 'unreplied') {
      setComments(platformComments.filter(comment => !comment.replied));
    } else {
      setComments(platformComments);
    }
  };
  
  const handleFilterChange = (value: string) => {
    setFilter(value);
    // @ts-ignore
    const platformComments = mockCommentsByPlatform[platform] || [];
    
    if (value === 'replied') {
      setComments(platformComments.filter(comment => comment.replied));
    } else if (value === 'unreplied') {
      setComments(platformComments.filter(comment => !comment.replied));
    } else {
      setComments(platformComments);
    }
  };
  
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <MessageSquare className="mr-2 h-8 w-8" />
          Comments
        </h1>
        <p className="text-muted-foreground">Manage and respond to comments from all your platforms.</p>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <div className="flex w-full sm:w-auto space-x-2">
          <Select defaultValue="all" onValueChange={handlePlatformChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="tiktok">TikTok</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all" onValueChange={handleFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Comments</SelectItem>
              <SelectItem value="replied">Replied</SelectItem>
              <SelectItem value="unreplied">Unreplied</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button variant="outline" className="w-full sm:w-auto flex items-center">
          <Filter className="mr-2 h-4 w-4" />
          Advanced Filters
        </Button>
      </div>
      
      <CommentList 
        comments={comments} 
        onReply={handleCommentReply}
        onDelete={handleCommentDelete}
      />
    </MainLayout>
  );
};

export default Comments;
