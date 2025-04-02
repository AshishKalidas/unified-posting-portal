
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  MessageCircle, 
  Heart, 
  Send, 
  Trash2, 
  Instagram, 
  Facebook
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Comment {
  id: string;
  username: string;
  content: string;
  date: Date;
  platform: 'instagram' | 'facebook' | 'tiktok';
  likes: number;
  replied: boolean;
  avatar?: string;
  postTitle?: string;
}

interface CommentListProps {
  comments: Comment[];
  onReply: (commentId: string, reply: string) => void;
  onDelete: (commentId: string) => void;
}

const CommentList = ({ comments, onReply, onDelete }: CommentListProps) => {
  const [replies, setReplies] = useState<Record<string, string>>({});
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleReplyChange = (commentId: string, value: string) => {
    setReplies({ ...replies, [commentId]: value });
  };
  
  const handleSubmitReply = (commentId: string) => {
    const reply = replies[commentId];
    if (!reply || !reply.trim()) {
      toast({
        title: "Error",
        description: "Please enter a reply",
        variant: "destructive",
      });
      return;
    }
    
    onReply(commentId, reply);
    setReplies({ ...replies, [commentId]: '' });
    setReplyingTo(null);
    
    toast({
      title: "Reply sent",
      description: "Your reply has been published",
    });
  };
  
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="h-4 w-4 text-social-instagram" />;
      case 'facebook':
        return <Facebook className="h-4 w-4 text-social-facebook" />;
      case 'tiktok':
        return (
          <svg 
            width="16" 
            height="16" 
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
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageCircle className="h-5 w-5 mr-2" />
          Recent Comments
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No comments yet</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="border rounded-md p-4 animate-fade-in">
                <div className="flex justify-between items-start">
                  <div className="flex space-x-3">
                    <Avatar>
                      <AvatarImage src={comment.avatar || '/placeholder.svg'} />
                      <AvatarFallback>{comment.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{comment.username}</p>
                        <span className="text-muted-foreground">
                          {getPlatformIcon(comment.platform)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {comment.postTitle && (
                          <span className="mr-2">on {comment.postTitle}</span>
                        )}
                        {comment.date.toLocaleDateString()}
                      </p>
                      <p className="mt-1">{comment.content}</p>
                      
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center text-sm">
                          <Heart className="h-3.5 w-3.5 mr-1 text-destructive" />
                          <span>{comment.likes}</span>
                        </div>
                        {comment.replied ? (
                          <Badge variant="outline" className="text-xs">Replied</Badge>
                        ) : (
                          <Button 
                            variant="ghost"
                            size="sm"
                            className="h-7 p-0 text-sm"
                            onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                          >
                            Reply
                          </Button>
                        )}
                      </div>
                      
                      {replyingTo === comment.id && (
                        <div className="mt-3 flex space-x-2">
                          <Input
                            placeholder="Write a reply..."
                            value={replies[comment.id] || ''}
                            onChange={(e) => handleReplyChange(comment.id, e.target.value)}
                            className="flex-1"
                          />
                          <Button 
                            size="sm" 
                            onClick={() => handleSubmitReply(comment.id)}
                            className="px-3"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-destructive h-8 w-8 p-0"
                    onClick={() => onDelete(comment.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommentList;
