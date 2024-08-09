import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./how.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import abc3 from "./abc3.jpg";
import abc2 from "./2.png";
import abc1 from "./abc1.png";

function How() {
  return (
    <>
      <div className="whole-how">
        <h1 id="abc" className="abc-how">
          HOW SALAHAKAAR WORKS?
        </h1>
      </div>
      <div class="container-how">
        <div className="user-how">
          <div className="avatar-how">
            <div>1</div>
          </div>
          <div className="text-how">FIND YOUR TUTOR.</div>
          <div className="name-how1">
            <img src={abc1} />
          </div>
        </div>
        <div className="user-how">
          <div className="avatar-how">
            <div>2</div>
          </div>
          <div className="text-how">START LEARNING.</div>
          <div className="name-how2">
            <img src={abc2} />
          </div>
        </div>
        <div className="user-how">
          <div className="avatar-how">
            <div>3</div>
          </div>
          <div className="text-how">SPEAK. READ. REPEAT.</div>
          <div className="name-how3">
            <img src={abc3} />
          </div>
        </div>
      </div>
    </>
  );
}

export default How;
