import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background">
        {/* Fixed/Sticky Header */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <AppHeader />
        </div>
        
        {/* Main Content Area with proper top padding */}
        <div className="flex w-full pt-16"> {/* pt-16 = header height */}
          <AppSidebar />
          <main className="flex-1 p-6 animate-fade-in">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};