import React from 'react';
import "./Speciality2.css";

const FeaturedSmall = () => {
  return (
    <div className="featured-small">
      <div>
      <p>As featured in</p>
        <span>
          <img
            id="a56789"
            alt="Sunday Times"
            src="https://cdn.mytutor.co.uk/images/sundaytimes_48.svg"
          />
        </span>
        <span>
          <img
            id="b56789"
            alt="The Guardian"
            src="https://cdn.mytutor.co.uk/images/guardian_48.svg"
          />
        </span>
        <span>
          <img
            alt="BBC"
            src="https://cdn.mytutor.co.uk/images/uploads/bbc_image_resized.gif"
          />
        </span>
        <span>
          <img
            alt="Sky"
            src="https://cdn.mytutor.co.uk/images/sky_48.svg"
          />
        </span>
      </div>
    </div>
  );
};

export default FeaturedSmall;
