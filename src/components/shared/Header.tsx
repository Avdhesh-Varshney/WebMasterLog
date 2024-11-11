'use client';

import { Input } from "../ui/input";
import { RxHamburgerMenu } from "react-icons/rx";
import { useSidebarContext } from "../../context/SidebarContext";

const Header = () => {
  const context = useSidebarContext();
  if (!context) return null;
  const { toggleSidebar } = context;

  return (
    <div className="fixed z-10 bg-[#191c24] w-full grid grid-cols-2 gap-4 p-4 border-b-2 border-blue-400">
      <div className="flex items-center gap-4">
        <RxHamburgerMenu className="w-5 h-5 cursor-pointer" onClick={toggleSidebar} />
        <Input className="bg-[#191c24] border-[#2c2e33] text-neutral-400" placeholder="Search Projects..." />
      </div>
    </div>
  )
}

export default Header;
