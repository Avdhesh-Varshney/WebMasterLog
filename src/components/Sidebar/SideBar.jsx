import { NavLink } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import SideBarMenu from "./SideBarMenu";
import './sidebar.css';

// Importing Icons 
import { FaBars } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";

const inputAnimation = {
  hidden: {
    width: 0,
    padding: 0,
    transition: {
      duration: 0.2,
    },
  },
  show: {
    width: "140px",
    padding: "5px 15px",
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
    width: "auto",
    transition: {
      duration: 0.5,
    },
  },
};

const SideBar = ({ routes, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="main-container">
        <motion.div animate={{ width: isOpen ? "200px" : "75px", position: 'fixed', transition: { duration: 0.5, type: "spring", damping: 10 } }} className={`sidebar`}>
          <div className="top_section d-lg-flex align-items-center justify-content-center">
            <AnimatePresence>
              {isOpen && (
                <motion.h1 variants={showAnimation} initial="hidden" animate="show" exit="hidden" className="logo">
                  WebMasterLog
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars flex-grow d-flex align-items-stretch align-self-center">
              <FaBars onClick={toggle} />
            </div>
          </div>

          <div className="search">
            <div className="search_icon circle">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input initial="hidden" animate="show" exit="hidden" variants={inputAnimation} type="text" placeholder="Search" />
              )}
            </AnimatePresence>
          </div>

          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SideBarMenu setIsOpen={setIsOpen} route={route} showAnimation={showAnimation} isOpen={isOpen} />
                );
              }

              return (
                <NavLink to={route.path} key={index} className="link" activeclassname="active">
                  <div className="circle">
                    <div className="icon">{route.icon}</div>
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div variants={showAnimation} initial="hidden" animate="show" exit="hidden" className="link_text">
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main style={{ marginLeft: 'auto', transition: 'all 0.3s' }}>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
