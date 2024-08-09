import React from "react";
import "./Navbar.css";
import logo from "./logo.png";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  return (
    <div
      className={`navbar ${location.pathname === "/" ? "hero" : "rectangle"}`}
    >
      <div className="left">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>
      <div className="right">
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/tutor">Find Tutors</Link>
          </li>     
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
