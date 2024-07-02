import React from 'react';

const Header = ({ searchTerm, setSearchTerm, searchImages }) => {
  return (
    <header>
      <div className="container">
        <h1>IMAGE GALLERY USING REACT</h1>
        <div className="search">
          <input
            type="text"
            placeholder="Search Images"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-btn" onClick={searchImages}>
            <i className="uil uil-search"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
