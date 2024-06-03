import React, { useState } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import SideBar from './components/Sidebar/SideBar';
import Links from './components/Links';
import MainPage from './components/Pages/MainPage';
import Footer from './components/Footer/Footer';

const categories = ['angular', '', 'frontend', 'next', 'node', 'react', 'vanilla', 'vue'];
const routes = Links();

function App() {
  const [progress, setProgress] = useState(0);

  return (
    <div className='app-container'>
      <Router>
        <SideBar routes={routes}>
          <LoadingBar height={3} color='#f11946' progress={progress} />
          <div className="main-container">

            <Routes>
              {categories.map((category) => {
                return <Route key={category} exact path={`/${category}`} element={<MainPage className='main-page' setProgress={setProgress} key={category} category={category} routes={routes} />} />;
              })}
            </Routes>
          </div>
        </SideBar>

      </Router>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
