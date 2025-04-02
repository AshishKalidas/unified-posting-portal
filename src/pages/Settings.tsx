import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings as SettingsIcon, Check, BellRing, Bell, BellOff, Globe } from 'lucide-react';
import ConnectedAccounts from '@/components/auth/ConnectedAccounts';
import AuthButtons from '@/components/auth/AuthButtons';
import ModeToggle from '@/components/settings/ModeToggle';
import { useAppMode } from '@/context/AppModeContext';
import { useToast } from '@/components/ui/use-toast';

const Settings = () => {
  const { toast } = useToast();
  const { isDemoMode, setIsDemoMode } = useAppMode();
  
  const [accounts, setAccounts] = useState([
    {
      provider: 'instagram',
      username: 'your_instagram',
      isConnected: true,
      profilePicture: '/placeholder.svg'
    },
    {
      provider: 'facebook',
      username: 'your_facebook',
      isConnected: true,
      profilePicture: '/placeholder.svg'
    },
    {
      provider: 'tiktok',
      username: 'your_tiktok',
      isConnected: true,
      profilePicture: '/placeholder.svg'
    }
  ]);
  
  const [notificationSettings, setNotificationSettings] = useState({
    newComments: true,
    commentReplies: true,
    newLikes: false,
    newFollowers: true,
    mentionsAndTags: true,
    directMessages: true,
    emailNotifications: false
  });
  
  const handleDisconnect = (provider: string) => {
    setAccounts(accounts.map(account => 
      account.provider === provider 
        ? { ...account, isConnected: false } 
        : account
    ));
    
    toast({
      title: "Account disconnected",
      description: `Your ${provider} account has been disconnected.`,
    });
  };
  
  const handleConnect = (provider: string) => {
    // Show authentication UI for reconnection
    toast({
      title: "Reconnecting account",
      description: `Please authenticate with ${provider} to reconnect.`,
    });
  };
  
  const handleAuthSuccess = (provider: string, userData: any) => {
    setAccounts(accounts.map(account => 
      account.provider === provider 
        ? { ...account, isConnected: true, username: userData.username } 
        : account
    ));
    
    toast({
      title: "Account connected",
      description: `Your ${provider} account has been successfully connected.`,
    });
  };
  
  const handleNotificationToggle = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    });
    
    toast({
      title: "Settings updated",
      description: `Notification preference updated.`,
    });
  };
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile saved",
      description: "Your profile changes have been saved successfully.",
    });
  };
  
  const handleModeToggle = (enableDemo: boolean) => {
    setIsDemoMode(enableDemo);
    
    // In a real app, this would switch between APIs
    if (!enableDemo) {
      toast({
        title: "Live Mode Notice",
        description: "In a production application, this would connect to the real social media APIs.",
      });
    }
  };
  
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <SettingsIcon className="mr-2 h-8 w-8" />
          Settings
        </h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>
      
      <Tabs defaultValue="accounts" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="accounts">Connected Accounts</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="app-mode">App Mode</TabsTrigger>
        </TabsList>
        
        <TabsContent value="accounts">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Connected Social Media Accounts</CardTitle>
                <CardDescription>
                  Manage your connected social media accounts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ConnectedAccounts 
                  accounts={accounts}
                  onDisconnect={handleDisconnect}
                  onConnect={handleConnect}
                />
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2">Add a new connection</h3>
                  <AuthButtons onSuccess={handleAuthSuccess} />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>API Access</CardTitle>
                <CardDescription>
                  Manage your API keys and access tokens
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Read Access</h3>
                      <p className="text-sm text-muted-foreground">
                        Allow applications to read data from your accounts
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Write Access</h3>
                      <p className="text-sm text-muted-foreground">
                        Allow applications to post and update your accounts
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Button variant="outline" className="w-full">
                      <Globe className="mr-2 h-4 w-4" />
                      Manage API Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications">
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
                    checked={notificationSettings.newComments}
                    onCheckedChange={() => handleNotificationToggle('newComments')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BellRing className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="commentReplies">Comment replies</Label>
                  </div>
                  <Switch 
                    id="commentReplies" 
                    checked={notificationSettings.commentReplies}
                    onCheckedChange={() => handleNotificationToggle('commentReplies')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BellRing className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="newLikes">New likes</Label>
                  </div>
                  <Switch 
                    id="newLikes" 
                    checked={notificationSettings.newLikes}
                    onCheckedChange={() => handleNotificationToggle('newLikes')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BellRing className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="newFollowers">New followers</Label>
                  </div>
                  <Switch 
                    id="newFollowers" 
                    checked={notificationSettings.newFollowers}
                    onCheckedChange={() => handleNotificationToggle('newFollowers')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BellRing className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="mentionsAndTags">Mentions & tags</Label>
                  </div>
                  <Switch 
                    id="mentionsAndTags" 
                    checked={notificationSettings.mentionsAndTags}
                    onCheckedChange={() => handleNotificationToggle('mentionsAndTags')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BellRing className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="directMessages">Direct messages</Label>
                  </div>
                  <Switch 
                    id="directMessages" 
                    checked={notificationSettings.directMessages}
                    onCheckedChange={() => handleNotificationToggle('directMessages')}
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
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={() => handleNotificationToggle('emailNotifications')}
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
        </TabsContent>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="User Name" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="user@example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Company/Brand</Label>
                  <Input id="company" defaultValue="Your Brand" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <select 
                    id="timezone"
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    defaultValue="UTC"
                  >
                    <option>UTC</option>
                    <option>Eastern Time (ET)</option>
                    <option>Central Time (CT)</option>
                    <option>Mountain Time (MT)</option>
                    <option>Pacific Time (PT)</option>
                  </select>
                </div>
                
                <Button type="submit" className="mt-4">Save Changes</Button>
              </form>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Manage your account security settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full">Change Password</Button>
                <Button variant="outline" className="w-full">Enable Two-Factor Authentication</Button>
                <Button variant="outline" className="w-full">Manage Sessions</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="app-mode">
          <ModeToggle 
            isDemoMode={isDemoMode} 
            onToggle={handleModeToggle} 
          />
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>
                Configure API keys and settings for live mode
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className={isDemoMode ? "opacity-50 pointer-events-none" : ""}>
                <div className="space-y-2">
                  <Label htmlFor="instagram-api">Instagram API Key</Label>
                  <Input id="instagram-api" type="password" placeholder="Enter your Instagram API key" disabled={isDemoMode} />
                </div>
                
                <div className="space-y-2 mt-4">
                  <Label htmlFor="facebook-api">Facebook API Key</Label>
                  <Input id="facebook-api" type="password" placeholder="Enter your Facebook API key" disabled={isDemoMode} />
                </div>
                
                <div className="space-y-2 mt-4">
                  <Label htmlFor="tiktok-api">TikTok API Key</Label>
                  <Input id="tiktok-api" type="password" placeholder="Enter your TikTok API key" disabled={isDemoMode} />
                </div>
                
                <Button className="mt-4" disabled={isDemoMode}>Save API Keys</Button>
              </div>
              
              {isDemoMode && (
                <div className="bg-muted p-4 rounded-md mt-2">
                  <p className="text-sm text-muted-foreground">Switch to Live Mode to configure real API connections</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Settings;
