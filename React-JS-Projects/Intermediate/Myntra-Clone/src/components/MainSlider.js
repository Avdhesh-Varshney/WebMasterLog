// src/components/MainSlider.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import './MainSlider.css';

const MainSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // 3 seconds
    arrows: false, // Add this line to disable navigation arrows
  };

  return (
    <div className="main-slider">
      <Slider {...settings}>
        <div><img src="/assets/slide1.png" alt="Slide 1" /></div>
        <div><img src="/assets/slide2.png" alt="Slide 2" /></div>
        <div><img src="/assets/slide3.png" alt="Slide 3" /></div>
        <div><img src="/assets/slide4.png" alt="Slide 4" /></div>
        <div><img src="/assets/slide5.png" alt="Slide 5" /></div>
      </Slider>
    </div>
  );
};

export default MainSlider;
