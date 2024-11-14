import CalendarComponent from "@/Components/Calendar/Calendar";
import React from "react";
import Footer from "@//Components/Footer";
import Navbar from "@/Components/Navbar";

const page = () => {
  return (
    <main className="flex flex-col justify-between w-full bg-zinc-900 text-zinc-300 relative">
      <Navbar />
      <CalendarComponent />
      <Footer />
    </main>
  );
};

export default page;
