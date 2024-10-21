import React, { useState, useEffect } from 'react';
import './NavBar.css';

function NavBar() {
  const [navbarOpacity, setNavbarOpacity] = useState(0);

  // Event listener to calculate scroll position and set opacity
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = 400; // Adjust this value to control when it should be fully black
      const opacity = Math.min(scrollTop / maxScroll, 1); // Cap opacity at 1 (fully black)
      setNavbarOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll); // Cleanup event listener on component unmount
    };
  }, []);

  return (
    <div className="navbar" style={{ backgroundColor: `rgba(17, 17, 17, ${navbarOpacity})` }}>
      <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" alt="Netflix Logo" />
      <img className='avatar' src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png" alt="Avatar" />
    </div>
  );
}

export default NavBar;
