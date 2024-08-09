import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./Performance.css";

const Performance = () => {
  return (
    <div className="trustpilot-container">
      <section className="trustpilot-section">
        <div className="trustpilot-box">
            <p>
              <span className="stars-reviews">426,535+&nbsp; &nbsp;5<span id="star"><FontAwesomeIcon icon={faStar}  style={{ color:"#ffd700" }}/></span> Reviews</span>
            </p>
        </div>
        <div className="trustpilot-box">
          <p>1300+ Schools Trust Us</p>
        </div>
        <div className="trustpilot-box">
          <p>30+ Subjects Available</p>
        </div>
        <div className="trustpilot-box">
          <p>255,203+ Students</p>
        </div>
      </section>
    </div>
  );
};

export default Performance;
