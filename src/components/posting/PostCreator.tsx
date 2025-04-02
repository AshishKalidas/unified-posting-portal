
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Instagram, Facebook, Image, Calendar, Plus, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const PostCreator = () => {
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [platforms, setPlatforms] = useState({
    instagram: true,
    facebook: true,
    tiktok: true,
  });
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  const { toast } = useToast();

  const handleAddImage = () => {
    // In a real app, this would open a file picker
    // For demo purposes, we'll add a placeholder image
    const newImageUrl = '/placeholder.svg';
    setImages([...images, newImageUrl]);
    
    toast({
      title: "Image added",
      description: "In a real app, this would open a file picker",
    });
  };
  
  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };
  
  const handlePlatformToggle = (platform: keyof typeof platforms) => {
    setPlatforms({
      ...platforms,
      [platform]: !platforms[platform],
    });
  };
  
  const handlePost = () => {
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please add content to your post",
        variant: "destructive",
      });
      return;
    }
    
    const selectedPlatforms = Object.entries(platforms)
      .filter(([_, isSelected]) => isSelected)
      .map(([platform]) => platform);
    
    if (selectedPlatforms.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one platform",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would create/schedule the post
    toast({
      title: isScheduled ? "Post scheduled" : "Post published",
      description: `Your post has been ${isScheduled ? 'scheduled' : 'published'} to ${selectedPlatforms.join(', ')}`,
    });
    
    // Reset form
    setContent('');
    setImages([]);
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Create Post</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="What's on your mind?"
          className="min-h-[120px]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        
        {images.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img 
                  src={image} 
                  alt={`Image ${index + 1}`} 
                  className="w-24 h-24 object-cover rounded-md"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1"
                >
                  <X className="h-3 w-3 text-white" />
                </button>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex flex-wrap gap-2">
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={handleAddImage}
          >
            <Image className="h-4 w-4 mr-2" />
            Add Image
          </Button>
        </div>
        
        <div className="border rounded-md p-3 space-y-3">
          <h3 className="text-sm font-medium">Post to</h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Instagram className="h-4 w-4 text-social-instagram mr-2" />
                <Label htmlFor="instagram">Instagram</Label>
              </div>
              <Switch
                id="instagram"
                checked={platforms.instagram}
                onCheckedChange={() => handlePlatformToggle('instagram')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Facebook className="h-4 w-4 text-social-facebook mr-2" />
                <Label htmlFor="facebook">Facebook</Label>
              </div>
              <Switch
                id="facebook"
                checked={platforms.facebook}
                onCheckedChange={() => handlePlatformToggle('facebook')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-social-tiktok mr-2"
                >
                  <path d="M19.321 5.562C18.7377 4.872 18.4421 4.012 18.4511 3.141H14.7173V15.276C14.6636 16.318 13.96 17.217 12.9471 17.57C12.7288 17.647 12.5007 17.687 12.2726 17.691C11.834 17.691 11.4092 17.578 11.0394 17.365C10.0688 16.777 9.55635 15.633 9.82892 14.541C10.1015 13.449 11.1356 12.681 12.2726 12.681C12.4549 12.681 12.6373 12.707 12.8152 12.753V9.071C12.5514 9.045 12.2906 9.032 12.0327 9.032C9.1548 9.032 6.83366 11.354 6.83366 14.232C6.83366 17.11 9.1548 19.431 12.0327 19.431C14.9105 19.431 17.2317 17.11 17.2317 14.232V8.701C18.4837 9.619 19.9549 10.118 21.4671 10.115V6.381C20.7116 6.38 20.001 6.068 19.321 5.562Z" fill="currentColor"/>
                </svg>
                <Label htmlFor="tiktok">TikTok</Label>
              </div>
              <Switch
                id="tiktok"
                checked={platforms.tiktok}
                onCheckedChange={() => handlePlatformToggle('tiktok')}
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="schedule"
            checked={isScheduled}
            onCheckedChange={setIsScheduled}
          />
          <Label htmlFor="schedule">Schedule for later</Label>
        </div>
        
        {isScheduled && (
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <input
              type="datetime-local"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
            />
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handlePost}
          disabled={!content.trim()}
        >
          {isScheduled ? 'Schedule Post' : 'Post Now'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCreator;
