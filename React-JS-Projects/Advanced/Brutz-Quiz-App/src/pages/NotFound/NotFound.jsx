import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen w-full flex flex-col md:flex-row items-center justify-center">
      <h1 className="text-[8rem] font-bold text-primary animate-bounce text-orange-500">404</h1>
      <div className="w-24 h-1 md:w-1 md:h-24 bg-primary my-6 md:my-0 md:mx-8"></div>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl text-center mb-4">
          Sorry, This page isn't available
        </h2>
        <Link to="/">
          <button className="bg-orange-500 rounded-full p-2 hover:bg-neutral-50 hover:text-orange-500">
            <span className="text-xl"> Go To Home Page</span>

          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
