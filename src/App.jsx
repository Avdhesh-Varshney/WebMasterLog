import React, { useState } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import SideBar from './components/Sidebar/SideBar';
import Links from './components/Links';
import MainPage from './components/Pages/MainPage';

const categories = ['angular', '', 'frontend', 'next', 'node', 'react', 'vanilla', 'vue'];
const routes = Links();

function App() {
  const [progress, setProgress] = useState(0);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState('')


  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };


  return (
    <div className='app-container'>
      <Router>
        <SideBar routes={routes} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} setQuery={setQuery} query={query}>

          <LoadingBar height={3} color='#f11946' progress={progress} />
          <div className={`main-container ${isSidebarOpen ? 'shifted' : ''}`}>

            <Routes>
              {categories.map((category) => {
                return <Route key={category} exact path={`/${category}`} element={<MainPage className='main-page' setProgress={setProgress} key={category} category={category} routes={routes} query={query}/>} />;
              })}
            </Routes>
          </div>
        </SideBar>

      </Router>
    </div>
  );
}

export default App;
