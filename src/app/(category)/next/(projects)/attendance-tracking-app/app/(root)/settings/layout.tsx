import React from "react";

import Footer from "@//Components/Footer";
import Navbar from "@/Components/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col justify-between w-full bg-zinc-900 text-zinc-300 relative">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
