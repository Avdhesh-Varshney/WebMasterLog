import React, { useEffect, useContext } from 'react';
import { Context } from '../../contexts/Context';
import { AnimatePresence, motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import './sidebar.css';

import { FaBars } from 'react-icons/fa';
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

const inputAnimation = {
  hidden: {
    width: 0,
    padding: 0,
    transition: {
      duration: 0.2,
    },
  },
  show: {
    width: '140px',
    padding: '5px 15px',
    transition: {
      duration: 0.2,
    },
  },
};
const showAnimation = {
  hidden: {
    width: 0,
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
  show: {
    opacity: 1,
    width: 'auto',
    transition: {
      duration: 0.5,
    },
  },
};

const SideBar = ({ children }) => {
  const { isSidebarOpen, setSidebarOpen, data, isDarkMode, setDarkMode } = useContext(Context);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const currentCategory = location.pathname;
    applyScrollbarColor(currentCategory.slice(1));
  }, [location]);

  const applyScrollbarColor = (category) => {
    const color = data.find((item) => item.name === category)?.scrollBarColor || '#cfd3d7';
    const style = document.createElement('style');
    style.textContent = `
      ::-webkit-scrollbar-thumb {
        background: ${color};
        border: 2px solid ${color}; 
        box-shadow: 0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}, 0 0 40px ${color}, 0 0 70px ${color};
        animation: neonGlow 1.5s infinite alternate;
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  };

  const darkModeController = () => {
    setDarkMode(!isDarkMode);
    document.body.classList.toggle('light');
    if (document.body.classList.contains('light')) localStorage.setItem('darkMode', 'false');
    else localStorage.setItem('darkMode', 'true');
  };

  return (
    <>
      <motion.div
        animate={{
          width: isSidebarOpen ? '220px' : '75px',
          position: 'fixed',
          transition: { duration: 0.5, type: 'spring', damping: 10 },
        }}
        className="z-index-100 vh-100 py-4"
        style={{ backgroundColor: isDarkMode ? '#12151e' : '#f5f5f5', overflowY: 'auto', overflowX: 'hidden' }}
      >
        <div className='d-flex align-items-center justify-content-center py-2 gap-2'>
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.h1 variants={showAnimation} initial='hidden' animate='show' exit='hidden' className={`${isDarkMode ? "text-white" : "text-black"} my-1`} style={{fontSize: '18px', lineHeight: '0'}}>
                WebMasterLog
              </motion.h1>
            )}
          </AnimatePresence>

          <div className={`my-1 flex-grow d-flex align-items-stretch align-self-center ${isDarkMode ? "text-white":"text-black"}`} style={{width: '20px'}}>
            <FaBars onClick={toggleSidebar} />
          </div>
        </div>

        <section className='routes'>
          {data.map((obj) => {
            return (
              <NavLink
                key={obj.name}
                to={obj.route}
                className='link'
                title={obj.name}
              >
                <div className='circle'>
                  <div style={{fontSize: '1.2rem', lineHeight: '1.2', color: '#bba8bff5', verticalAlign: 'middle'}}>{obj.icon}</div>
                </div>
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.div variants={showAnimation} initial='hidden' animate='show' exit='hidden' className='my-auto' style={{fontSize: '15px', whiteSpace: 'nowrap' }}>
                      {obj.showName}
                    </motion.div>
                  )}
                </AnimatePresence>
              </NavLink>
            );
          })}
        </section>

        <div className="mt-5 d-flex justify-content-center">
          <div className="d-flex align-items-center" onClick={darkModeController} style={{ cursor: 'pointer' }}>
            {isSidebarOpen ? (
              <p className="mb-0">
                {isDarkMode ? (
                  <>
                    <MdOutlineLightMode style={{ fontSize: '1.5rem' }} /> Light
                  </>
                ) : (
                  <>
                    <MdOutlineDarkMode style={{ fontSize: '1.5rem' }} /> Dark
                  </>
                )}
              </p>
            ) : (
              <p className="mb-0">
                {isDarkMode ? (
                  <MdOutlineLightMode style={{ fontSize: '1.5rem' }} />
                ) : (
                  <MdOutlineDarkMode style={{ fontSize: '1.5rem' }} />
                )}
              </p>
            )}
          </div>
        </div>
      </motion.div>

      <main style={{ marginLeft: isSidebarOpen ? '220px' : '75px', transition: 'margin-left 0.5s' }}>
        {children}
      </main>
    </>
  );
};

export default SideBar;
