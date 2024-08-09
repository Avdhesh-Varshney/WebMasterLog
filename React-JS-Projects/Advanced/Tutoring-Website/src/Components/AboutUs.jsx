import React from "react";
import "./AboutUs.css";
import au from "./au.jpg";

function AboutUs() {
  return (
    <>
      <div id="About" className="wholeau">
        <h1>-ABOUT US-</h1>
        <h3>"Embracing the Power of Unity and Learning: Salahakaar, where every question sparks a brighter tomorrow."</h3>
        <div className="row-aboutus">
          <div className="content-aboutus">
            We are dedicated to bridging generations through the power of knowledge. At
            Salahakaar, we understand the value of wisdom that comes with age,
            and we believe in harnessing it to benefit learners of all ages.
            <br /> <br />
            Our platform connects eager students with seasoned tutors who are
            seniors, bringing a unique blend of expertise, patience, and
            mentorship to every learning experience.
            <br /> <br />
            Whether you're seeking academic support, professional guidance, or simply wish to explore
            new interests, our tutors are here to guide you on your educational journey.
            <br />
            <br />
          </div>
          <div className="image-aboutus">
            <img className="giff" src={au} alt="Rajiv Gandhi Institute of Petroleum Technology Campus" />
          </div>
        </div>
        <div id="no-float"><span><a href="http://localhost:3000/login">Join us</a></span> at Salahakaar and unlock the wealth of knowledge
            that our senior tutors have to offer.</div>
      </div>
    </>
  );
}

export default AboutUs;
