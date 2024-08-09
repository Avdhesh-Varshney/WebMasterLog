import React from "react";
import { Button } from "./Button";
import './Footer.scss';
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">
          Join the Adventure newsletter to receive the best deals on your
          vacation.
        </p>
        <p className="footer-subscription-text">
          You can unsubscribe at any time.
        </p>
        <div className="input-areas">
          <form>
            <input type="email" name="email" placeholder="Your Email" className="footer-input" />
            <Button children="Subscribe" buttonStyle="btn--outline" />
          </form>
        </div>
      </section>
      <section className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>About Us</h2>
            <Link to='/sign-up'>How it works</Link>
            <Link to='/'>Testiminials</Link>
            <Link to='/'>Careers</Link>
            <Link to='/'>Investors</Link>
            <Link to='/'>Terms of Services</Link>
          </div>
          <div className="footer-link-items">
            <h2>Contact Info</h2>
            <Link to='/sign-up'>Get Support</Link>
            <Link to='/'>Contact US</Link>
            <Link to='/'>Careers</Link>
            <Link to='/'>Be a Partner</Link>
            <Link to='/'>Be a member</Link>
          </div>
          <div className="footer-link-items">
            <h2>Our Assets</h2>
            <Link to='/sign-up'>Submit Videos</Link>
            <Link to='/'>Ambassadors</Link>
            <Link to='/'>Agency</Link>
            <Link to='/'>Influencer</Link>
            <Link to='/'>Report an issue</Link>
          </div>
        </div>
      </section>
      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
            <Link className="social-logo">
              TSPOT <i className="fab fa-typo3"></i>
            </Link>
          </div>
          <small className="website-rights">
            TSPOT &copy; 2022
          </small>
          <div className="social-icons">
            <Link className="social-icon-link facebook" to="/" target="_blank" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link className="social-icon-link instagram" to="/" target="_blank" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </Link>
            <Link className="social-icon-link youtube" to="/" target="_blank" aria-label="Youtube">
              <i className="fab fa-youtube"></i>
            </Link>
            <Link className="social-icon-link twitter" to="/" target="_blank" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link className="social-icon-link linkedin" to="/" target="_blank" aria-label="Linkedin">
              <i className="fab fa-linkedin"></i>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
