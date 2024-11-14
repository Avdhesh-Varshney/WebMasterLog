import React from "react";
import { useNavigate } from "react-router-dom";
import "./Performance1.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';


function Performance1() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/tutor");
  };
  return (
    <>
      <div className="banner123">
        <h2>
          Book a free meet with a tutor and see how beautiful and smooth your
          academic transformation can be!
        </h2>
        <div className="ertyui">
        <button onClick={handleClick}><FontAwesomeIcon icon={faPaperPlane} id="arrow" /></button>
        </div>
      </div>
    </>
  );
}

export default Performance1;
