import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./HomeHead.css";
import main from "./main.gif";

function HomeHead() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <div id="Home" className="head">
        <div className="container">
          <h1 className="main-head">
            Find the Perfect <span className="text-highlight">TUTORS</span>
            <br /> in your <br />
            <span className="text-highlight">SENIORS</span>
          </h1>
          <div className="bttnsearch">
            <select value={selectedOption} onChange={handleOptionChange}>
              <option value="" disabled>
                Select an option
              </option>
              <option value="Web Technology">Web Technology</option>
              <option value="Stats">Stats</option>
              <option value="DBMS">DBMS</option>
              <option value="COA">COA</option>
            </select>
            <Link to={`/tutor`}>
              <button>Get Started</button>
            </Link>
          </div>
        </div>

        <div className="image">
          <img src={main} alt="tutor" />
        </div>
      </div>
    </>
  );
}

export default HomeHead;
