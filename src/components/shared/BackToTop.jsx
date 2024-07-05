import React from 'react';
import ScrollToTop from 'react-scroll-to-top';

const BackToTop = () => {
  return (
    <ScrollToTop smooth style={{ zIndex: 1000, position: 'fixed', bottom: '20px', right: '20px' }} />
  );
};

export default BackToTop;
