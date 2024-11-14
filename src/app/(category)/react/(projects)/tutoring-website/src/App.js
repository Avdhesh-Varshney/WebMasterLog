import "./App.css";
import Home from "./Components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import GetTutor from "./Components/GetTutor";
import TutorDetails from "./Components/TutorDetails.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tutor" element={<GetTutor />} />
        <Route path="/tutor-details/:tutorId" element={<TutorDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
