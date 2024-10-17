"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 180) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const smoothScrollToTop = () => {
    const scrollY = window.pageYOffset;
    const scrollStep = Math.max(10, Math.floor(scrollY / 20)); 
    if (scrollY > 0) {
      window.scrollBy(0, -scrollStep);
      requestAnimationFrame(smoothScrollToTop);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div>
      {isVisible && (
        <Button
          onClick={() => requestAnimationFrame(smoothScrollToTop)}
          className="fixed bottom-4 right-4 p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition"
        >
          ↑
        </Button>
      )}
    </div>
  );
};

export default ScrollToTop;
