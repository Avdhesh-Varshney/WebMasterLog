"use client";
import React, { useState, useEffect } from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import Spline from "@splinetool/react-spline";

function AboutMe() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setProgress((prev) => (prev < 99 ? prev + 1 : prev));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleLoad = () => {
    setIsLoading(false);
    setProgress(100);
  };

  return (
    <>
      <div className="relative h-screen overflow-y-hidden">
        {/* Message and Name */}
        <div className="absolute top-4 right-4 z-10 text-xl font-serif text-right sm:text-xl md:text-center lg:text-left">
          <p className="sm:text-base sm:mt-1 md:text-lg">
           "All I can say is, best of luck with your placements, and have an amazing day ahead!
          </p>
          <a
            href="mailto:yeddulamadhu6@gmail.com"
            aria-label="Send an email to Y.Madhu"
            className="mt-1 ml-72 text-center sm:text-left font-serif hover:cursor-pointer hover:text-blue-200"
          >
            ~Y.M.M.R~
          </a>

          {/* Icons just below the name */}
          <div className="mt-3 ml-3 flex justify-center space-x-6">
            <a
              href="https://www.linkedin.com/in/madhu-yeddula/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Madhu's LinkedIn profile"
            >
              <FaLinkedin className="text-2xl text-black dark:text-white sm:text-xl hover:text-blue-700 transition" />
            </a>
            <a
              href="https://github.com/ymadhumohanreddy"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Madhu's GitHub profile"
            >
              <FaGithub className="text-2xl text-black dark:text-white sm:text-xl hover:text-gray-600 transition" />
            </a>
            <a
              href="https://www.instagram.com/madhu_mohanreddy/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Madhu's Instagram profile"
            >
              <FaInstagram className="text-2xl text-black dark:text-white sm:text-xl hover:text-pink-500 transition" />
            </a>
          </div>
        </div>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute z-10 flex flex-col items-center justify-center w-full h-full bg-white">
            <div className="loader border-4 border-blue-400 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
            <p className="mt-4 text-lg font-medium text-blue-500">
              Loading {progress}%
            </p>
          </div>
        )}

        {/* Spline Component */}
        <Spline  scene="https://prod.spline.design/sTUJrn9hWcezm1uG/scene.splinecode" onLoad={handleLoad} />
      </div>
    </>
  );
}

export default AboutMe;

