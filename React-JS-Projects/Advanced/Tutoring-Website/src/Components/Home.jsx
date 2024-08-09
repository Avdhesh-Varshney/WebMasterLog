import React from "react";
import Performance from "./Performance";
import Performance1 from "./Performance1";
import HomeHead from "./HomeHead";
import AboutUs from "./AboutUs";
import Speciality2 from "./Speciality2.jsx";
import How from "./how.jsx";
import Benefits from "./Benefits.jsx";
import Line from "./Line.jsx";
import Sponsors from "./Sponsors.jsx";
import TutorTutor from "./TutorTutor.jsx";

function Home() {
  return (
    <>
      <HomeHead />
      <Speciality2 />
      <AboutUs />
      <How />
      <Sponsors />
      <Benefits />
      <Line />
      <Performance1 />
      <TutorTutor />
      <Performance />
    </>
  );
}

export default Home;
