"use client";

import React, { useEffect } from "react";
import { Code, Terminal, Database, Globe } from "lucide-react";

import { LucideIcon } from "lucide-react";

const FloatingIcon = ({ icon: Icon, className }: { icon: LucideIcon; className: string }) => (
  <div className={`absolute ${className}`}>
    <Icon size={50} className="opacity-20 animate-float" />
  </div>
);

const NotFoundPage = () => {
  useEffect(() => {
    const styles = `
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
      }
    
      @keyframes shine {
        from { transform: translateX(-100%); }
        to { transform: translateX(100%); }
      }
    
      .animate-float {
        animation: float 3s ease-in-out infinite;
      }
    
      .animate-shine {
        animation: shine 2s infinite;
      }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet); // Cleanup on unmount
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-transparent text-white">
      {/* Floating Background Icons */}
      <FloatingIcon icon={Code} className="top-5 left-5" />
      <FloatingIcon icon={Terminal} className="top-16 right-10" />
      <FloatingIcon icon={Database} className="bottom-16 left-16" />
      <FloatingIcon icon={Globe} className="bottom-5 right-5" />
      <FloatingIcon icon={Code} className="top-8 left-20" />
      <FloatingIcon icon={Terminal} className="top-24 right-24" />
      <FloatingIcon icon={Database} className="bottom-24 left-24" />
      <FloatingIcon icon={Globe} className="bottom-8 right-20" />
      <FloatingIcon icon={Code} className="top-12 left-32" />
      <FloatingIcon icon={Terminal} className="top-28 right-32" />
      <FloatingIcon icon={Database} className="bottom-28 left-32" />
      <FloatingIcon icon={Globe} className="bottom-12 right-32" />

      {/* Main Content Card */}
      <div className="bg-gray-800 p-10 rounded-lg shadow-lg text-center">
        {/* Animated 404 Text */}
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-gray-400 mb-4">
          Explore, learn, and find your way back to our diverse web development projects.
        </p>
        <p className="text-gray-400 mb-6">
          Continue your development journey with our other resources.
        </p>
        <p className="text-gray-400 mb-6">
          Try searching our projects or checking out our latest tutorials.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => (window.location.href = "/")}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Back to Home
          </button>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
