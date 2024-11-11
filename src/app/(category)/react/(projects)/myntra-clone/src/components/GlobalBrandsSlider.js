// src/components/GlobalBrandsSlider.js
import React from 'react';
import Slider from 'react-slick';
import './GlobalBrandsSlider.css';

const GlobalBrandsSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="global-brands-slider">
      <h1>GLOBAL GRAND BRANDS</h1>
      <Slider {...settings}>
        <div className="global-slide">
          <div className="brand-images">
            <img src="/assets/global1.png" alt="Global Brand 1" />
            <img src="/assets/global2.png" alt="Global Brand 2" />
            <img src="/assets/global3.png" alt="Global Brand 3" />
            <img src="/assets/global4.png" alt="Global Brand 4" />
            <img src="/assets/global5.png" alt="Global Brand 5" />
            <img src="/assets/global6.png" alt="Global Brand 6" />
          </div>
        </div>
        <div className="global-slide">
          <div className="brand-images">
            <img src="/assets/global7.png" alt="Global Brand 7" />
            <img src="/assets/global8.png" alt="Global Brand 8" />
            <img src="/assets/global9.png" alt="Global Brand 9" />
            <img src="/assets/global10.png" alt="Global Brand 10" />
            <img src="/assets/global11.png" alt="Global Brand 11" />
            <img src="/assets/global12.png" alt="Global Brand 12" />
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default GlobalBrandsSlider;
