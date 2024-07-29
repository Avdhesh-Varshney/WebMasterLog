// src/App.js
import React from 'react';
import Navbar from './components/Navbar';
import MainSlider from './components/MainSlider';
import MedalBrandsSlider from './components/MedalBrandsSlider';
import GlobalBrandsSlider from './components/GlobalBrandsSlider';
import ShopByCategory from './components/Category';
import Footer from './components/Footer';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <MainSlider />
      <MedalBrandsSlider />
      <GlobalBrandsSlider />
      <ShopByCategory />
      <Footer />
    </div>
  );
};

export default App;
