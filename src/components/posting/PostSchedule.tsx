
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Instagram, Facebook } from 'lucide-react';

interface ScheduledPost {
  id: string;
  content: string;
  date: Date;
  platforms: ('instagram' | 'facebook' | 'tiktok')[];
  image?: string;
}

interface PostScheduleProps {
  scheduledPosts: ScheduledPost[];
}

const PostSchedule = ({ scheduledPosts }: PostScheduleProps) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  // Filter posts for the selected date
  const postsForSelectedDate = scheduledPosts.filter(
    (post) => date && post.date.toDateString() === date.toDateString()
  );
  
  // Get all dates with posts for highlighting
  const datesWithPosts = scheduledPosts.map((post) => post.date);
  
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
        <CardTitle>Scheduled Posts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="pb-4 md:w-1/2">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="border rounded-md p-3"
              modifiers={{
                booked: datesWithPosts,
              }}
              modifiersStyles={{
                booked: {
                  fontWeight: 'bold',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                },
              }}
            />
          </div>
          
          <div className="md:w-1/2">
            <h3 className="text-sm font-medium mb-2">
              {date 
                ? `Posts for ${date.toLocaleDateString()}` 
                : 'Select a date to see scheduled posts'}
            </h3>
            
            {postsForSelectedDate.length === 0 ? (
              <p className="text-sm text-muted-foreground">No posts scheduled for this date</p>
            ) : (
              <div className="space-y-3">
                {postsForSelectedDate.map((post) => (
                  <div key={post.id} className="border p-3 rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex space-x-1">
                        {post.platforms.map((platform) => (
                          <span key={platform} className="mr-1">
                            {getPlatformIcon(platform)}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {post.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    
                    <p className="text-sm line-clamp-2">{post.content}</p>
                    
                    {post.image && (
                      <div className="mt-2">
                        <img 
                          src={post.image} 
                          alt="Post visual" 
                          className="w-full h-20 object-cover rounded-md" 
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostSchedule;
