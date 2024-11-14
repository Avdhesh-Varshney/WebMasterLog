import React from "react";
import "./TutorTutor.css";
import TutorBenefits from "./TutorBenefits.jsx";

const TutorTutor = () => {
  return (
    <>
      <div className="tutor-tutor">
        <div className="tutor-h">
          <h1>-BECOME AN ONLINE TUTOR-</h1>
          <p>Earn money sharing your expert knowledge with students. <span><a href="http://localhost:3000/tutors">Sign up</a></span> to start tutoring online with SALAHAKAAR.</p>
        </div>
      </div>
      <TutorBenefits />
      <div className="why-tutors">
        <div className="trfvbhyy"><p>Online tutoring jobs needn’t be stressful - we find the pupils so you don't have to, give you loads of helpful training and lesson resources, and we're always on-hand to answer your questions (or just give you a well-deserved pat on the back)!</p>
        </div>
      </div>
    </>
  );
};

export default TutorTutor;

