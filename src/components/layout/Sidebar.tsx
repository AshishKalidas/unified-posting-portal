
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, BarChart2, MessageSquare, Send, Settings, LogOut, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const NavItem = ({ 
  to, 
  icon: Icon, 
  label, 
  active = false 
}: { 
  to: string; 
  icon: React.ElementType; 
  label: string; 
  active?: boolean;
}) => (
  <Link to={to}>
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start mb-1 font-medium",
        active ? "bg-primary/10 text-primary" : "hover:bg-primary/5"
      )}
    >
      <Icon className="mr-2 h-5 w-5" />
      {label}
    </Button>
  </Link>
);

const Sidebar = () => {
  // Current path detection for active state
  const currentPath = window.location.pathname;
  
  return (
    <div className="w-64 border-r bg-card/50 backdrop-blur-sm p-4 flex flex-col min-h-full">
      <div className="mb-6 py-2">
        <div className="flex justify-center items-center">
          <img 
            src="/lovable-uploads/6f99515b-b927-47bf-b52a-731f42b70146.png" 
            alt="Social Manager Logo" 
            className="h-10"
          />
        </div>
      </div>
      
      <div className="flex-1">
        <nav className="space-y-1">
          <NavItem 
            to="/" 
            icon={Home} 
            label="Dashboard" 
            active={currentPath === '/'} 
          />
          <NavItem 
            to="/analytics" 
            icon={BarChart2} 
            label="Analytics" 
            active={currentPath.startsWith('/analytics')} 
          />
          <NavItem 
            to="/comments" 
            icon={MessageSquare} 
            label="Comments" 
            active={currentPath.startsWith('/comments')} 
          />
          <NavItem 
            to="/publish" 
            icon={Send} 
            label="Publish" 
            active={currentPath.startsWith('/publish')} 
          />
          <NavItem 
            to="/settings" 
            icon={Settings} 
            label="Settings" 
            active={currentPath.startsWith('/settings')} 
          />
        </nav>
      </div>
      
      <div className="pt-4 border-t">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-social-instagram flex items-center justify-center">
            <Instagram size={16} className="text-white" />
          </div>
          <div className="w-8 h-8 rounded-full bg-social-facebook flex items-center justify-center">
            <Facebook size={16} className="text-white" />
          </div>
          <div className="w-8 h-8 rounded-full bg-social-tiktok flex items-center justify-center">
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path d="M19.321 5.562C18.7377 4.872 18.4421 4.012 18.4511 3.141H14.7173V15.276C14.6636 16.318 13.96 17.217 12.9471 17.57C12.7288 17.647 12.5007 17.687 12.2726 17.691C11.834 17.691 11.4092 17.578 11.0394 17.365C10.0688 16.777 9.55635 15.633 9.82892 14.541C10.1015 13.449 11.1356 12.681 12.2726 12.681C12.4549 12.681 12.6373 12.707 12.8152 12.753V9.071C12.5514 9.045 12.2906 9.032 12.0327 9.032C9.1548 9.032 6.83366 11.354 6.83366 14.232C6.83366 17.11 9.1548 19.431 12.0327 19.431C14.9105 19.431 17.2317 17.11 17.2317 14.232V8.701C18.4837 9.619 19.9549 10.118 21.4671 10.115V6.381C20.7116 6.38 20.001 6.068 19.321 5.562Z" fill="currentColor"/>
            </svg>
          </div>
        </div>
        <Button variant="outline" className="w-full flex items-center justify-center">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
