'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

const SidebarContext = createContext<{
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
} | null>(null);

export const useSidebarContext = () => useContext(SidebarContext);

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setIsSidebarOpen(!isMobile);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
