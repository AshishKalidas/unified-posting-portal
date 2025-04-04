
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Check, BellRing, Bell, BellOff } from 'lucide-react';

interface NotificationSetting {
  newComments: boolean;
  commentReplies: boolean;
  newLikes: boolean;
  newFollowers: boolean;
  mentionsAndTags: boolean;
  directMessages: boolean;
  emailNotifications: boolean;
}

interface NotificationsSectionProps {
  settings: NotificationSetting;
  onToggle: (setting: keyof NotificationSetting) => void;
}

const NotificationsSection = ({ settings, onToggle }: NotificationsSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>
          Choose what you want to be notified about
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BellRing className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="newComments">New comments</Label>
            </div>
            <Switch 
              id="newComments" 
              checked={settings.newComments}
              onCheckedChange={() => onToggle('newComments')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BellRing className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="commentReplies">Comment replies</Label>
            </div>
            <Switch 
              id="commentReplies" 
              checked={settings.commentReplies}
              onCheckedChange={() => onToggle('commentReplies')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BellRing className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="newLikes">New likes</Label>
            </div>
            <Switch 
              id="newLikes" 
              checked={settings.newLikes}
              onCheckedChange={() => onToggle('newLikes')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BellRing className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="newFollowers">New followers</Label>
            </div>
            <Switch 
              id="newFollowers" 
              checked={settings.newFollowers}
              onCheckedChange={() => onToggle('newFollowers')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BellRing className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="mentionsAndTags">Mentions & tags</Label>
            </div>
            <Switch 
              id="mentionsAndTags" 
              checked={settings.mentionsAndTags}
              onCheckedChange={() => onToggle('mentionsAndTags')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BellRing className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="directMessages">Direct messages</Label>
            </div>
            <Switch 
              id="directMessages" 
              checked={settings.directMessages}
              onCheckedChange={() => onToggle('directMessages')}
            />
          </div>
          
          <div className="pt-4 border-t mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="emailNotifications">Email notifications</Label>
              </div>
              <Switch 
                id="emailNotifications" 
                checked={settings.emailNotifications}
                onCheckedChange={() => onToggle('emailNotifications')}
              />
            </div>
          </div>
          
          <div className="flex space-x-2 pt-4">
            <Button variant="default" className="flex items-center">
              <Check className="mr-2 h-4 w-4" />
              Save preferences
            </Button>
            <Button variant="outline" className="flex items-center">
              <BellOff className="mr-2 h-4 w-4" />
              Mute all
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsSection;
