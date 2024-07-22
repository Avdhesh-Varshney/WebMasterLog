import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div className="footer-section">
          <h4>Online Shopping</h4>
          <ul>
            <li><a href="#men">Men</a></li>
            <li><a href="#women">Women</a></li>
            <li><a href="#kids">Kids</a></li>
            <li><a href="#home-living">Home & Living</a></li>
            <li><a href="#beauty">Beauty</a></li>
            <li><a href="#gift-cards">Gift Cards</a></li>
            <li><a href="#myntra-insider">Myntra Insider</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Customer Policies</h4>
          <ul>
            <li><a href="#contact-us">Contact Us</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#terms-conditions">T&C</a></li>
            <li><a href="#terms-of-use">Terms Of Use</a></li>
            <li><a href="#track-orders">Track Orders</a></li>
            <li><a href="#shipping">Shipping</a></li>
            <li><a href="#cancellation">Cancellation</a></li>
            <li><a href="#returns">Returns</a></li>
            <li><a href="#privacy-policy">Privacy Policy</a></li>
            <li><a href="#grievance-officer">Grievance Officer</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Experience Myntra App on Mobile</h4>
          <div className="app-links">
            <a href="https://play.google.com/store"><img src="/assets/google-play.png" alt="Google Play" /></a>
            <a href="https://www.apple.com/app-store/"><img src="/assets/app-store.png" alt="App Store" /></a>
          </div>
          <div className="social-links">
            <h4>Keep in Touch</h4>
            <a href="#facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#twitter"><i className="fab fa-twitter"></i></a>
            <a href="#youtube"><i className="fab fa-youtube"></i></a>
            <a href="#instagram"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
        <div className="footer-section">
          <div className="guarantee">
            <h4>100% ORIGINAL</h4>
            <p>guarantee for all products at myntra.com</p>
          </div>
          <div className="return-policy">
            <h4>Return within 14 days</h4>
            <p>of receiving your order</p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="popular-searches">
          <h4>Popular Searches</h4>
          <p>
            Makeup | Dresses For Girls | T-Shirts | Sandals | Headphones | Babydolls | Blazers For Men | Handbags | Ladies Watches | Bags | Sport Shoes | Reebok Shoes | Puma Shoes | Boxers | Wallets | Tops | Earrings | Fastrack Watches | Kurtis | Nike | Smart Watches | Titan Watches | Designer Blouse | Gowns | Rings | Cricket Shoes | Forever 21 | Eye Makeup | Photo Frames | Punjabi Suits | Bikini | Myntra Fashion Show | Lipstick | Saree | Watches | Dresses | Lehenga | Nike Shoes | Goggles | Bras | Suit | Chinos | Shoes
          </p>
        </div>
        <div className="contact-info">
          <p>In case of any concern, <a href="#contact-us">Contact Us</a></p>
          <p>&copy; 2024 www.myntra.com. All rights reserved. A Flipkart company</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
