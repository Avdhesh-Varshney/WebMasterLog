import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const CursorComponent = () => {
  useEffect(() => {
    const cursor = document.querySelector('.cursor');
    const moveCursor = (e) => {
      cursor.style.left = e.pageX + 'px';
      cursor.style.top = e.pageY + 'px';
    };

    document.addEventListener('mousemove', moveCursor);
    return () => {
      document.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  const cursorVariants = {
    default: {
      width: 20,
      height: 20,
      backgroundColor: 'deepskyblue',
      borderRadius: '50%',
      mixBlendMode: 'difference',
      position: 'absolute',
      pointerEvents: 'none',
      zIndex: 9999,
      translateX: '-50%',
      translateY: '-50%',
      transition: {
        duration: 0.3,
      },
    },
    glow: {
      boxShadow: ['0 0 10px 5px rgba(0, 191, 255, 0.5)', '0 0 20px 10px rgba(0, 191, 255, 0.9)'],
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
      ></motion.div>
    </div>
  );
};

export default CursorComponent;
