import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import SideBarMenu from './SideBarMenu';
import './sidebar.css';

import { FaBars } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';
import { FiSun, FiMoon } from 'react-icons/fi';



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

const SideBar = ({ routes, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const [theme, setTheme] = useState('light'); //Add state to manage the current theme

const ThemeToggleIcon = ({ theme }) => {
  return theme === 'light' ? <FiMoon /> : <FiSun />;
};
const toggleTheme = () => {
  // Create a function to toggle the theme
  setTheme(theme === 'light' ? 'dark' : 'light');
};

  useEffect(() => {
    const currentCategory = getCurrentCategory();
    const scrollbarColor = getScrollbarColor(currentCategory);
    applyScrollbarColor(scrollbarColor);
  }, [location]); // Watch for changes in location state

  const getCurrentCategory = () => {
    const currentPath = location.pathname;
    const category = routes.find((route) => currentPath.startsWith(route.path));
    return currentPath; // Return the category name
  };

  const getScrollbarColor = (currentPath) => {
    switch (currentPath) {
      case '/angular':
        return '#eb0d0d';
      case '/frontend':
        return '#6cd380';
      case '/next':
        return '#68bf6f';
      case '/node':
        return 'green';
      case '/react':
        return 'blue';
      case '/vanilla':
        return '#ffd700';
      case '/vue':
        return 'green';
      default:
        return 'blue';
    }
  };

  const applyScrollbarColor = (color) => {
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

  const toggle = () => setIsOpen(!isOpen);
  


  return (
    <><body className='bg'>
      <div className={`main-container ${theme}`}>
        <motion.div
          animate={{
            width: isOpen ? '200px' : '75px',
            position: 'fixed',
            transition: { duration: 0.5, type: 'spring', damping: 10 },
          }}
          className={`sidebar ${theme}`} //  Apply theme class to sidebar
        >
          <div className='top_section d-lg-flex align-items-center justify-content-center'>
            <AnimatePresence>
              {isOpen && (
                <motion.h1 variants={showAnimation} initial='hidden' animate='show' exit='hidden' className='logo'>
                  WebMasterLog
                </motion.h1>
              )}
            </AnimatePresence>

            <div className='bars flex-grow d-flex align-items-stretch align-self-center'>
              <FaBars onClick={toggle} />
            </div>
          </div>

          <div className='search'>
            <div className={`search-icon circle ${theme}`}>
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && <motion.input initial='hidden' animate='show' exit='hidden' variants={inputAnimation} type='text' placeholder='Search' />}
            </AnimatePresence>
          </div>
          
          <section className='routes'>
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SideBarMenu
                    key={index}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    routes={routes} // Pass the routes prop here
                  />
                  
                );
              }
              

              return (
                
                <NavLink to={route.path} key={index} className='link' activeClassName='active'>
                  <div className={`circle ${theme}`}>
                    <div className='icon'>{route.icon}</div>
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div variants={showAnimation} initial='hidden' animate='show' exit='hidden' className='link_text'>
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
          <div className='theme' onClick={toggleTheme}> {/*  Handle theme toggle action */}
            <div className='bars flex-grow d-flex align-items-stretch align-self-center'>
              {theme === 'light' ? <FiMoon  style={{ color: 'darkblue', fontSize: '36px'}} /> : <FiSun style={{color:'yellow', fontSize: '36px'}}/>} {/* Conditional rendering based on theme */}
            </div>
          </div>
        </motion.div>

        <main style={{ marginLeft: 'auto', transition: 'all 0.3s' }}>{children}</main>
      </div>
      </body>
    </>
  );
};

export default SideBar;
