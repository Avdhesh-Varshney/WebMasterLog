import React, { useState, useEffect } from "react";
import "./Footer.css"; // Import CSS for styling

function Footer() {
  const [language, setLanguage] = useState("English");

  useEffect(() => {
    // Any side effects if needed, like fetching additional footer data.
  }, []);

  return (
    <footer className="footer">
      <div className="footer-top">
        <h3>
          Questions? Call <a href="tel:000-800-919-1694">000-800-919-1694</a>
        </h3>
      </div>
      <div className="footer-links">
        <div className="link-group">
          <a href="#">FAQ</a>
          <a href="#">Investor Relations</a>
          <a href="#">Privacy</a>
          <a href="#">Speed Test</a>
        </div>
        <div className="link-group">
          <a href="#">Help Centre</a>
          <a href="#">Jobs</a>
          <a href="#">Cookie Preferences</a>
          <a href="#">Legal Notices</a>
        </div>
        <div className="link-group">
          <a href="#">Account</a>
          <a href="#">Ways to Watch</a>
          <a href="#">Corporate Information</a>
          <a href="#">Only on Netflix</a>
        </div>
        <div className="link-group">
          <a href="#">Media Centre</a>
          <a href="#">Terms of Use</a>
          <a href="#">Contact Us</a>
        </div>
      </div>
      <div className="footer-bottom">
        <button
          className="language-button"
          onClick={() =>
            setLanguage(language === "English" ? "Hindi" : "English")
          }
        >
          🌐 {language}
        </button>
        <p>Netflix India</p>
      </div>
    </footer>
  );
}

export default Footer;
