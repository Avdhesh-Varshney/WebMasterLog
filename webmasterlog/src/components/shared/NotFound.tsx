import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
const NotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b bg-black flex items-center justify-center px-4">
    <div className="max-w-4xl w-full flex flex-col md:flex-row items-center text-center md:text-left">
      {/* Left side image */}
      <div className="md:w-1/2 mb-8 md:mb-0 md:mr-8 opacity-100 transform translate-x-0">
        <Image
          src='/logo.webp'
          alt="Not Found Illustration"
          width={400}
          height={400}
          className="rounded-lg"
        />
      </div>
  
      {/* Right side content */}
      <div className="md:w-1/2">
        <h1 className="text-6xl font-bold text-white mb-4 opacity-100 transform translate-y-0">
          Oops!
        </h1>
        
        <h2 className="text-2xl font-semibold text-gray-100 mb-4 opacity-100 transform translate-y-0">
          The page you're looking for doesn't exist.
        </h2>
        
        <p className="text-lg text-gray-200 mb-6 opacity-100">
          Looks like you've wandered into unknown territory. Let's get you back to safety!
        </p>
        
        <div className="opacity-100 transform translate-y-0">
          <Link href="/">
          <button className="bg-transparent outline hover:bg-[#10B981] text-[#10B981] hover:text-white hover:outline-[#10B981] px-4 py-2 rounded-lg border-2 border-transparent transition-colors duration-300">
    Go back to homepage
  </button>
  
          </Link>
        </div>
      </div>
    </div>
  </div>
  
      );
    }

export default NotFound