"use client";
import React from "react";
import { useState } from "react";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <nav className="flex items-center h-[60px] justify-between p-4 bg-zinc-800 relative">
      <div className="flex items-center gap-2">
        <img src="/assets/images/logo.png" alt="logo" className="w-12 mr-2" />
        <span className="text-2xl font-semibold">Attendance Tracker</span>
      </div>
      <button className="text-zinc-300" onClick={() => setToggle(!toggle)}>
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 16.5c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0-6c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0-6c.828 0 1.5-.672 1.5-1.5S12.828 1.5 12 1.5 10.5 2.172 10.5 3s.672 1.5 1.5 1.5z" />
        </svg>
      </button>
      <div
        className={`${
          !toggle ? "hidden" : "flex"
        } p-6 bg-black-gradient absolute top-16 right-0 mx-4 my-2 min-w-[140px] rounded-xl animated-slide-top`}
      >
        <ul className="list-none flex justify-end items-start flex-1 flex-col">
          <li
            className={`font-poppins font-regular cursor-pointer text-[16px] mb-4 text-white text-dimWhite py-1 px-2`}
          >
            <a href="/">Set Target</a>
          </li>
          <li
            className={`font-poppins font-regular cursor-pointer text-[16px] mb-4 text-white text-dimWhite py-1 px-2`}
          >
            <a href="/">Add Subject</a>
          </li>

          <li className="text-white bg-red-800 py-1 px-2 rounded-[25px] font-poppins font-medium cursor-pointer text-[16px]">
            <a href="/" className="p-2">
              Log Out?
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
