import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseNavbar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className='relative bg-[#f7fdfd] z-50'>
        <nav className='container mx-auto flex items-center justify-between p-5'>
          <div>
            <Link to='/' className='text-blue-600 font-bold text-xl'>
              Job<span className='text-[#1677cccb]'>Portal</span>
            </Link>
          </div>

          <ul className='hidden lg:flex gap-10 text-base'>
            <li>
              <Link to='/'>Find Job</Link>
            </li>
            <li>
              <Link to='/companies'>Companies</Link>
            </li>
          </ul>

          <div className='hidden lg:flex items-center gap-4'>
              <div className='flex items-center gap-2'>
                <div className='leading-[80px] flex flex-col items-start'>
                  <p className='text-sm font-semibold'>
                    {user?.firstName ?? user?.name}
                  </p>
                  <span className='text-sm text-blue-600'>
                    {user?.jobTitle ?? user?.email}
                  </span>
                </div>
                <img
                  src='https://randomuser.me/api/portraits/men/32.jpg'
                  alt='user profile'
                  className='w-10 h-10 rounded-full object-cover'
                />
              </div>
          </div>

          <button
            className='block lg:hidden text-slate-900'
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <AiOutlineClose size={26} /> : <HiMenuAlt3 size={26} />}
          </button>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
