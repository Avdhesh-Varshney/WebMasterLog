'use client';

import { useEffect } from 'react';
import { motion, Variants } from 'framer-motion';

const Cursor: React.FC = () => {
  useEffect(() => {
    const cursor = document.querySelector('.cursor') as HTMLElement;
    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.pageX}px`;
      cursor.style.top = `${e.pageY}px`;
    };

    document.addEventListener('mousemove', moveCursor);
    return () => {
      document.removeEventListener('mousemove', moveCursor);
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
      zIndex: 9999,
      translateX: '-50%',
      translateY: '-50%',
      transition: {
        duration: 0.3,
      },
    },
    glow: {
      boxShadow: [
        '0 0 10px 5px rgba(0, 191, 255, 0.5)',
        '0 0 20px 10px rgba(0, 191, 255, 0.9)'
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
      />
    </div>
  );
};

export default Cursor;
