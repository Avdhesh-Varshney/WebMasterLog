// src/components/MedalBrandsSlider.js
import React from 'react';
import Slider from 'react-slick';
import './MedalBrandsSlider.css';

const MedalBrandsSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // 3 seconds
    arrows: false, // Remove previous/next arrows
    variableWidth: false, // Ensure slides take the full width
  };

  return (
    <div className="medal-brands-slider">
      <h1>MEDAL WORTHY BRANDS TO BAG</h1>
      <Slider {...settings}>
        <div className="brand-slide">
          <div className="brand-images">
            <img src="/assets/brand1.png" alt="Brand 1" />
            <img src="/assets/brand2.png" alt="Brand 2" />
            <img src="/assets/brand3.png" alt="Brand 3" />
            <img src="/assets/brand4.png" alt="Brand 4" />
            <img src="/assets/brand5.png" alt="Brand 5" />
            <img src="/assets/brand6.png" alt="Brand 6" />
          </div>
        </div>
        <div className="brand-slide">
          <div className="brand-images">
            <img src="/assets/brand7.png" alt="Brand 7" />
            <img src="/assets/brand8.png" alt="Brand 8" />
            <img src="/assets/brand9.png" alt="Brand 9" />
            <img src="/assets/brand10.png" alt="Brand 10" />
            <img src="/assets/brand11.png" alt="Brand 11" />
            <img src="/assets/brand12.png" alt="Brand 12" />
          </div>
        </div>
        <div className="brand-slide">
          <div className="brand-images">
            <img src="/assets/brand13.png" alt="Brand 13" />
            <img src="/assets/brand14.png" alt="Brand 14" />
            <img src="/assets/brand15.png" alt="Brand 15" />
            <img src="/assets/brand16.png" alt="Brand 16" />
            <img src="/assets/brand17.png" alt="Brand 17" />
            <img src="/assets/brand18.png" alt="Brand 18" />
          </div>
        </div>
        <div className="brand-slide">
          <div className="brand-images">
            <img src="/assets/brand19.png" alt="Brand 19" />
            <img src="/assets/brand20.png" alt="Brand 20" />
            <img src="/assets/brand21.png" alt="Brand 21" />
            <img src="/assets/brand22.png" alt="Brand 22" />
            <img src="/assets/brand23.png" alt="Brand 23" />
            <img src="/assets/brand24.png" alt="Brand 24" />
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default MedalBrandsSlider;
