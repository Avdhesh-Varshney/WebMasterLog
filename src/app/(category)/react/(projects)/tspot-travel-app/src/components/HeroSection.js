import React from "react";
import { Button } from "./Button";
import './HeroSection.scss';

import Video2 from '../videos/video-2.mp4';

function HeroSection() {
  return (
    <div className="hero-container">
      <video src={Video2} autoPlay loop muted />
      <div className="video-overlay">
        <h1>ADVENTURE AWAITS</h1>
        <p>What are you waiting for?</p>
        <div className="hero-btns">
          <Button
            className="btns"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
          >GET STARTED</Button>
          <Button
            className="btns"
            buttonStyle="btn--primary"
            buttonSize="btn--large"
          >WATCH TRAILER <i className="far fa-play-circle"/></Button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
