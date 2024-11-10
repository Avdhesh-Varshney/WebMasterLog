'use client';

import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';

const Cursor: React.FC = () => {
  const [cursorVisible, setCursorVisible] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorPosition({ x: e.pageX, y: e.pageY });
      setCursorVisible(true); 
    };

    const hideCursor = () => {
      setCursorVisible(false);
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', hideCursor);
    document.addEventListener('focus', () => setCursorVisible(true));  
    window.addEventListener('blur', () => setCursorVisible(false)); 

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', hideCursor);
      document.removeEventListener('focus', () => setCursorVisible(true));
      document.removeEventListener('blur', () => setCursorVisible(false));
    };
  }, []);

  const cursorVariants: Variants = {
    default: {
      width: 20,
      height: 20,
      backgroundColor: 'deepskyblue',
      borderRadius: '50%',
      mixBlendMode: 'difference',
      position: 'absolute',
      pointerEvents: 'none',
      zIndex: 99999,  
      translateX: '-50%',
      translateY: '-50%',
      transition: {
        duration: 0.3,
      },
    },
    glow: {
      boxShadow: [
        '0 0 10px 5px rgba(0, 191, 255, 0.5)',
        '0 0 20px 10px rgba(0, 191, 255, 0.9)',
      ],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: 'reverse',
      },
    },
  };

  return (
    <div className="cursor-container">
      <motion.div
        className="cursor"
        variants={cursorVariants}
        initial="default"
        animate="glow"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          visibility: cursorVisible ? 'visible' : 'hidden', 
        }}
      />
    </div>
  );
};

export default Cursor;
