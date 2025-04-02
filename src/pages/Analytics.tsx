
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnalyticsChart from '@/components/dashboard/AnalyticsChart';
import StatCard from '@/components/dashboard/StatCard';
import { BarChart2, TrendingUp, ArrowUpRight, Users, ThumbsUp, Eye } from 'lucide-react';

// Mock data for analytics
const engagementData = [
  { name: 'Jan', instagram: 400, facebook: 240, tiktok: 320 },
  { name: 'Feb', instagram: 300, facebook: 139, tiktok: 450 },
  { name: 'Mar', instagram: 550, facebook: 980, tiktok: 410 },
  { name: 'Apr', instagram: 500, facebook: 380, tiktok: 500 },
  { name: 'May', instagram: 600, facebook: 430, tiktok: 610 },
  { name: 'Jun', instagram: 750, facebook: 590, tiktok: 820 },
  { name: 'Jul', instagram: 800, facebook: 500, tiktok: 920 },
  { name: 'Aug', instagram: 840, facebook: 520, tiktok: 970 },
  { name: 'Sep', instagram: 900, facebook: 550, tiktok: 1100 },
  { name: 'Oct', instagram: 1000, facebook: 590, tiktok: 1250 },
  { name: 'Nov', instagram: 950, facebook: 620, tiktok: 1180 },
  { name: 'Dec', instagram: 870, facebook: 670, tiktok: 1300 }
];

const followersData = [
  { name: 'Jan', instagram: 8000, facebook: 6240, tiktok: 3200 },
  { name: 'Feb', instagram: 8300, facebook: 6539, tiktok: 3450 },
  { name: 'Mar', instagram: 8550, facebook: 6980, tiktok: 3600 },
  { name: 'Apr', instagram: 8800, facebook: 7380, tiktok: 3900 },
  { name: 'May', instagram: 9000, facebook: 7430, tiktok: 4100 },
  { name: 'Jun', instagram: 9350, facebook: 7590, tiktok: 4400 },
  { name: 'Jul', instagram: 9800, facebook: 7800, tiktok: 4800 },
  { name: 'Aug', instagram: 10240, facebook: 8100, tiktok: 5100 },
  { name: 'Sep', instagram: 10500, facebook: 8350, tiktok: 5400 },
  { name: 'Oct', instagram: 10800, facebook: 8590, tiktok: 5800 },
  { name: 'Nov', instagram: 11200, facebook: 8920, tiktok: 6200 },
  { name: 'Dec', instagram: 12000, facebook: 9100, tiktok: 6500 }
];

const dataKeys = [
  { key: 'instagram', name: 'Instagram', color: '#C13584' },
  { key: 'facebook', name: 'Facebook', color: '#3b5998' },
  { key: 'tiktok', name: 'TikTok', color: '#000000' }
];

const Analytics = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <BarChart2 className="mr-2 h-8 w-8" />
          Analytics
        </h1>
        <p className="text-muted-foreground">Track your social media performance across platforms.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard
          title="Total Growth"
          value="18.5%"
          change={5.2}
          icon={<TrendingUp className="h-5 w-5 text-primary" />}
        />
        <StatCard
          title="Top Platform"
          value="Instagram"
          icon={<ArrowUpRight className="h-5 w-5 text-primary" />}
        />
        <StatCard
          title="Best Performing Post"
          value="Behind The Scenes"
          icon={<ThumbsUp className="h-5 w-5 text-primary" />}
        />
      </div>
      
      <Tabs defaultValue="overview" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="followers">Followers</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnalyticsChart
              title="Followers Growth (12 months)"
              data={followersData}
              dataKeys={dataKeys}
            />
            <AnalyticsChart
              title="Engagement (12 months)"
              data={engagementData}
              dataKeys={dataKeys}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Instagram Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-muted p-3 rounded-md text-center">
                    <Users className="mx-auto h-5 w-5 mb-1" />
                    <p className="text-sm text-muted-foreground">Followers</p>
                    <p className="font-bold">12K</p>
                  </div>
                  <div className="bg-muted p-3 rounded-md text-center">
                    <ThumbsUp className="mx-auto h-5 w-5 mb-1" />
                    <p className="text-sm text-muted-foreground">Engagement</p>
                    <p className="font-bold">4.7%</p>
                  </div>
                </div>
                <div className="bg-muted p-3 rounded-md text-center">
                  <Eye className="mx-auto h-5 w-5 mb-1" />
                  <p className="text-sm text-muted-foreground">Impressions</p>
                  <p className="font-bold">87.5K</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Facebook Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-muted p-3 rounded-md text-center">
                    <Users className="mx-auto h-5 w-5 mb-1" />
                    <p className="text-sm text-muted-foreground">Followers</p>
                    <p className="font-bold">9.1K</p>
                  </div>
                  <div className="bg-muted p-3 rounded-md text-center">
                    <ThumbsUp className="mx-auto h-5 w-5 mb-1" />
                    <p className="text-sm text-muted-foreground">Engagement</p>
                    <p className="font-bold">3.2%</p>
                  </div>
                </div>
                <div className="bg-muted p-3 rounded-md text-center">
                  <Eye className="mx-auto h-5 w-5 mb-1" />
                  <p className="text-sm text-muted-foreground">Impressions</p>
                  <p className="font-bold">45.2K</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">TikTok Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-muted p-3 rounded-md text-center">
                    <Users className="mx-auto h-5 w-5 mb-1" />
                    <p className="text-sm text-muted-foreground">Followers</p>
                    <p className="font-bold">6.5K</p>
                  </div>
                  <div className="bg-muted p-3 rounded-md text-center">
                    <ThumbsUp className="mx-auto h-5 w-5 mb-1" />
                    <p className="text-sm text-muted-foreground">Engagement</p>
                    <p className="font-bold">6.3%</p>
                  </div>
                </div>
                <div className="bg-muted p-3 rounded-md text-center">
                  <Eye className="mx-auto h-5 w-5 mb-1" />
                  <p className="text-sm text-muted-foreground">Impressions</p>
                  <p className="font-bold">120.3K</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="followers">
          <AnalyticsChart
            title="Followers Growth (12 months)"
            data={followersData}
            dataKeys={dataKeys}
            className="w-full mb-6"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Instagram Growth"
              value="+4K"
              change={15.2}
              className="bg-gradient-to-br from-purple-50 to-pink-50"
            />
            <StatCard
              title="Facebook Growth"
              value="+2.86K"
              change={10.8}
              className="bg-gradient-to-br from-blue-50 to-indigo-50"
            />
            <StatCard
              title="TikTok Growth"
              value="+3.3K"
              change={28.4}
              className="bg-gradient-to-br from-gray-50 to-slate-100"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="engagement">
          <AnalyticsChart
            title="Engagement Trends (12 months)"
            data={engagementData}
            dataKeys={dataKeys}
            className="w-full mb-6"
          />
          
          <Card>
            <CardHeader>
              <CardTitle>Engagement Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-4">
                  <h3 className="text-center font-medium flex items-center justify-center">
                    <span className="w-3 h-3 rounded-full bg-social-instagram mr-2"></span>
                    Instagram
                  </h3>
                  <div className="bg-muted/50 p-4 rounded-md">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Likes</span>
                      <span className="font-medium">65%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-social-instagram h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-md">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Comments</span>
                      <span className="font-medium">25%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-social-instagram h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-md">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Shares</span>
                      <span className="font-medium">10%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-social-instagram h-2 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-center font-medium flex items-center justify-center">
                    <span className="w-3 h-3 rounded-full bg-social-facebook mr-2"></span>
                    Facebook
                  </h3>
                  <div className="bg-muted/50 p-4 rounded-md">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Likes</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-social-facebook h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-md">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Comments</span>
                      <span className="font-medium">30%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-social-facebook h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-md">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Shares</span>
                      <span className="font-medium">25%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-social-facebook h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-center font-medium flex items-center justify-center">
                    <span className="w-3 h-3 rounded-full bg-social-tiktok mr-2"></span>
                    TikTok
                  </h3>
                  <div className="bg-muted/50 p-4 rounded-md">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Likes</span>
                      <span className="font-medium">80%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-social-tiktok h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-md">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Comments</span>
                      <span className="font-medium">15%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-social-tiktok h-2 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-md">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Shares</span>
                      <span className="font-medium">5%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-social-tiktok h-2 rounded-full" style={{ width: '5%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Analytics;
