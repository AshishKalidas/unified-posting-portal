
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppModeProvider } from "./context/AppModeContext";
import Index from "./pages/Index";
import Analytics from "./pages/Analytics";
import Comments from "./pages/Comments";
import Publish from "./pages/Publish";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import InstagramCallback from "./components/auth/InstagramCallback";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppModeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/comments" element={<Comments />} />
            <Route path="/publish" element={<Publish />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/auth/instagram/callback" element={<InstagramCallback />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppModeProvider>
  </QueryClientProvider>
);

export default App;
