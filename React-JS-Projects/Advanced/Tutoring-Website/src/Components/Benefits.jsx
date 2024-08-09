import React from "react";
import './Benefits.css';

// Import your SVG files
import teachersSvg from "./teachers.svg";
import timingSvg from "./flexibletiming.svg";
import attentionSvg from "./attention.svg";
import studySvg from "./self-study.svg";

const SalahakaarBenefits = () => {
  return (
    <section id="AssessMe" className="benefits">
      <div className="container-benefits">
            <div className="row-benefits">
                  <h3 className="text-white-boy">Our bright ideas<br />show students <br />a brighter future!</h3>
            </div>
            <div className="row-benefits">
                  <div className="info">
                    <div className="address">
                      <img src={teachersSvg} alt="Exceptional Teachers" />
                      <h4>EXCEPTIONAL <br />TEACHERS</h4>
                    </div>
                    <div className="email">
                      <img src={timingSvg} alt="Flexible Timing" />
                      <h4>FLEXIBLE <br />TIMING</h4>
                    </div>
                  </div>
                  <div className="info">
                    <div className="phone">
                      <img src={attentionSvg} alt="Individual Attention" />
                      <h4>INDIVIDUAL <br />ATTENTION</h4>
                    </div>
                    <div className="phone3">
                      <img src={studySvg} alt="Self Study & Assessment Modules" />
                      <h4>SELF STUDY &amp; <br />ASSESSMENT MODULES</h4>
                    </div>
                  </div>
            </div>
      </div>
    </section>
  );
};

export default SalahakaarBenefits;
