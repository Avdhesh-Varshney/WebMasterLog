import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <main className="bg-neutral-50 font-Inter">
      <Navbar />
      <div className="p-5 md:py-10 md:px-10 overflow-hidden">
        <Outlet />
      </div>
    </main>
  );
}

export default RootLayout;
