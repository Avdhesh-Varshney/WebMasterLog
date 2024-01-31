import React from "react";

import Classes from "../Styles/Testimonials.module.css";

import avatar from "../assets/avatar.jpg";
import avatar2 from "../assets/avatar2.jpg";
import avatar3 from "../assets/avatar3.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

function Testimonials() {
  return (
    <section id="testimonials" className={Classes.testimonials}>
      <h1>Happy Customers</h1>

      <div className={Classes.boxContainer}>
        <div className={Classes.testimonialBox}>
          <FontAwesomeIcon icon={faQuoteLeft} className={Classes.Icon} />
          <p>
            Web travel has such a user-friendly website. Easy to navigate,
            search and fiddle with dates instead of having to call up. Once
            decided, the booking process was swift and easy, thank you.
          </p>

          <div className={Classes.info}>
            <img src={avatar} alt="image" />
            <div>
              <h3>Rahi Ahmed</h3>
              <span>CEO • webtechbyrahi channel</span>
            </div>
          </div>
        </div>

        <div className={Classes.testimonialBox}>
          <FontAwesomeIcon icon={faQuoteLeft} className={Classes.Icon} />

          <p>
            Great communication. This was a rushed booking and she was very
            helpful/prompt with calls/replies to ensure we could have preferred
            dates.
          </p>

          <div className={Classes.info}>
            <img src={avatar2} alt="image" />
            <div>
              <h3>Anthony Tony</h3>
              <span>Researcher • wikipedia.com</span>
            </div>
          </div>
        </div>

        <div className={Classes.testimonialBox}>
          <FontAwesomeIcon icon={faQuoteLeft} className={Classes.Icon} />
          <p>
            I must say the service we received from this company was amazing and
            would recommend them to anyone to trust and use them the rewards you
            get with your holidays are just fantastic.
          </p>

          <div className={Classes.info}>
            <img src={avatar3} alt="image" />
            <div>
              <h3>John Lee</h3>
              <span>CEO • Grand Thornton</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
