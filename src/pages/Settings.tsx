
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings as SettingsIcon } from 'lucide-react';
import { useAppMode } from '@/context/AppModeContext';
import { useToast } from '@/components/ui/use-toast';

// Import our new component sections
import ConnectedAccountsSection from '@/components/settings/ConnectedAccountsSection';
import NotificationsSection from '@/components/settings/NotificationsSection';
import ProfileSection from '@/components/settings/ProfileSection';
import ModeToggle from '@/components/settings/ModeToggle';
import ApiConfigSection from '@/components/settings/ApiConfigSection';

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
          <ConnectedAccountsSection 
            accounts={accounts}
            onDisconnect={handleDisconnect}
            onConnect={handleConnect}
            onAuthSuccess={handleAuthSuccess}
          />
        </TabsContent>
        
        <TabsContent value="notifications">
          <NotificationsSection 
            settings={notificationSettings}
            onToggle={handleNotificationToggle}
          />
        </TabsContent>
        
        <TabsContent value="profile">
          <ProfileSection onSave={handleSaveProfile} />
        </TabsContent>
        
        <TabsContent value="app-mode">
          <ModeToggle 
            isDemoMode={isDemoMode} 
            onToggle={handleModeToggle} 
          />
          
          <ApiConfigSection isDemoMode={isDemoMode} />
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Settings;
