'use client';

import { useSidebarContext } from "../context/SidebarContext";
import ScrollToTop from "./shared/ScrollToTop";
import Sidebar from "./shared/Sidebar";
import Header from "./shared/Header";
import Footer from "./shared/Footer";
import Cursor from "./shared/Cursor";
import ProgressBar from "./shared/ProgressBar";

const MainContent = ({ children }: { children: React.ReactNode }) => {
  const context = useSidebarContext();
  if (!context) return null;
  const { isSidebarOpen } = context;

  return (
    <>
      <ProgressBar/>
      <Sidebar />
      <main className={`grid w-full h-full transition-all duration-300 ${isSidebarOpen ? 'pl-[245px]' : 'pl-[75px]'}`}>
        <Header />
        <div className="grow p-8 pt-24">
          <Cursor />
          {children}
          <ScrollToTop />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default MainContent;
