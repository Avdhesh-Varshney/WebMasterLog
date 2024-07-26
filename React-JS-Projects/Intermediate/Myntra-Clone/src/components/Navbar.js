import React from 'react';
import { IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './Navbar.css';  // Import the CSS for Navbar
import ProfileIcon from '@mui/icons-material/PersonOutline';
import WishlistIcon from '@mui/icons-material/FavoriteBorder';
import BagIcon from '@mui/icons-material/ShoppingBagOutlined';

const Navbar = () => {
  return (
    <div className="navbar">
      <img src="/assets/myntralogo.png" alt="Myntra Logo" className="logo" />
      <div className="nav-items">
        <a href="#men">Men</a>
        <a href="#women">Women</a>
        <a href="#kids">Kids</a>
        <a href="#home-living">Home & Living</a>
        <a href="#beauty">Beauty</a>
        <a href="#studio">Studio</a>
      </div>
      <div className="search-bar">
        <InputBase
          placeholder="         Search for products, brands and more"
          className="search-input"
        />
        <IconButton className="search-icon">
          <SearchIcon />
        </IconButton>
      </div>
      <div className="icons">
        <div className="icon-item">
          <ProfileIcon />
          <span>Profile</span>
        </div>
        <div className="icon-item">
          <WishlistIcon />
          <span>Wishlist</span>
        </div>
        <div className="icon-item">
          <BagIcon />
          <span>Bag</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
