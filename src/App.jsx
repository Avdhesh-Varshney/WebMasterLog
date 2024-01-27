import React, { useState } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import SideBar from './components/Sidebar/SideBar';

// Importing all the pages of the websites 
import Angular from './components/Pages/angular/Angular';
import CSS from './components/Pages/css/CSS';
import Dashboard from './components/Pages/dashboard/Dashboard';
import FrontEnd from './components/Pages/frontend/FrontEnd';
import Next from './components/Pages/next/Next';
import Node from './components/Pages/node/Node';
import ReactJS from './components/Pages/react/ReactJS';
import Vanilla from './components/Pages/vanilla/Vanilla';
import Vue from './components/Pages/vue/Vue';

const categories = ['angular', 'css', '', 'front-end', 'next', 'node', 'react', 'vanilla', 'vue'];

function App() {
  const getComponent = (category) => ({
    'angular': Angular,
    'css': CSS,
    '': Dashboard,
    'front-end': FrontEnd,
    'next': Next,
    'node': Node,
    'react': ReactJS,
    'vanilla': Vanilla,
    'vue': Vue,
  }[category] || (() => <div>Page Not Found</div>));

  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Router>
        <SideBar>
          <LoadingBar height={3} color='#f11946' progress={progress} />

          <Routes>
            {categories.map((category) => {
              const PageComponent = getComponent(category);
              return <Route key={category} exact path={`/${category}`} element={<PageComponent setProgress={setProgress} key={category} category={category} />} />;
            })}
          </Routes>
        </SideBar>

      </Router>
    </div>
  );
}

export default App;
