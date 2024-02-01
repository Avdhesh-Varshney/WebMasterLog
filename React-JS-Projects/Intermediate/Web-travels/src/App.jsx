import React from "react";
import ScrollToTop from "./Components/ScrollToTop";
import NavBar from "./Components/NavBar";
import Service from "./Components/Service";
import Testimonials from "./Components/Testimonials";
import Footer from "./Components/Footer";
import Hero from "./Components/Hero";
import Recommendation from "./Components/Recommendation";
import Classes from "./Styles/Footer.module.css";

function App() {
  return (
    <div className={Classes.app}>
      <ScrollToTop />
      <NavBar />
      <Hero />
      <Service />
      <Recommendation />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;
