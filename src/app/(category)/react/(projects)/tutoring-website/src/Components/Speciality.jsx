import React from "react";
import "./Speciality.css";
import { useEffect } from "react";

function Speciality() {
  const Speciality = () => {
    useEffect(() => {
      console.log("Component mounted");
    }, []);
  };
  return (
    <>
      <div className="third_row">
        <div className="main_container">
          <h1 className="pagemaintitle align_center ">
            A Personalized Solution For All Your Needs
            <br /><br />
          </h1>
          <ul className="hiw">
            <li className="wow bounceIn">
              <div className="iconholder">
                <img
                  src="https://www.myprivatetutor.com/public/frontend/images/icon/post_learning.png?v=1690219714"
                  alt=""
                />
              </div>
              <h2>Post your learning needs</h2>
              <p>
                Post your tutor requirements. Our experts will analyze it and
                make it live on our job board.
              </p>
            </li>
            <li className="wow bounceIn">
              <div className="iconholder">
                <img
                  src="https://www.myprivatetutor.com/public/frontend/images/icon/tutor_application.png?v=1690219714"
                  alt=""
                />
              </div>
              <h2>Get up to 10 tutor applications</h2>
              <p>
                You'll receive the ten best tutors applications in your account
                within 48 hours closely matching to your requirements.
              </p>
            </li>
            <li className="wow bounceIn">
              <div className="iconholder">
                <img
                  src="https://www.myprivatetutor.com/public/frontend/images/icon/select_tutor.png?v=1690219714"
                  alt=""
                />
              </div>
              <h2>Select the best tutor &amp; start learning</h2>
              <p>
                Choose the best tutor applications. Request the selected Tutors
                for trial sessions before hiring for regular classes. Give us
                your feedback.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
export default Speciality;
