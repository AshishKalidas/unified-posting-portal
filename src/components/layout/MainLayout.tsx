
import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen gradient-bg flex">
      {!isMobile && <Sidebar />}
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
