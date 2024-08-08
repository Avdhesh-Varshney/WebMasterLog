import React from "react";
import "./TutorBenefits.css";

const TutorBenefits = () => {
  return (
    <div className="benefits-cards w-dyn-list">
          <div className="benefits-card">
            <div id="image"><img
              loading="lazy"
              src="https://assets-global.website-files.com/5fe34b67daacc77c9b3ed902/6005ab4527d8d92f6639f5e8_flexible-icon.svg"
              alt=""
              className="image-4"
            /></div>
              <h3 className="card-heading">Remote</h3>
        </div>
          <div className="benefits-card">
            <div id="image"><img
              loading="lazy"
              src="https://assets-global.website-files.com/5fe34b67daacc77c9b3ed902/6005ab0a8451baaf1b4aefe6_Rewarding-icon.svg"
              alt=""
              className="image-4"
            /></div>
            <h3 className="card-heading">Rewarding</h3>
            </div>
          <div className="benefits-card">
            <div id="image"><img
              loading="lazy"
              src="https://assets-global.website-files.com/5fe34b67daacc77c9b3ed902/6005ab709dec26273a4d36ee_well-paid-icon.svg"
              alt=""
              className="image-4"
            /></div>
              <h3 className="card-heading">Well paid</h3>
            </div>
      </div>
  );
};

export default TutorBenefits;
