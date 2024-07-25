import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Context } from './contexts/Context';
import LoadingBar from 'react-top-loading-bar';
import preloadergif from './assets/preloader.gif';
import './App.css';

// Importing Components
import MainPage from './pages/MainPage';
import ProjectPage from './pages/ProjectPage';
import SideBar from './components/Sidebar/SideBar';
import Footer from './components/shared/Footer';
import CursorComponent from './components/shared/Cursor';
import BackToTop from './components/shared/BackToTop';
import Chatbot from './components/chat/Chatbot';

// Custom Hook
import useRepoData from './hooks/UseRepoData';

// Importing Icons
import { TbMessageChatbot } from "react-icons/tb";

function App() {
  const { progress, showChatbot, setShowChatbot } = useContext(Context);
  const { data, isLoading, error } = useRepoData();

  if (isLoading)
    return ( <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <img src={preloadergif} alt="Loading..." />
    </div>
    );

  if (error)
    return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <h1>Error: {error.message}</h1>
    </div>;

  return (
    <div className='d-flex flex-column'>
      <Router>
        <SideBar>

          <LoadingBar height={3} color='#f11946' progress={progress} />
          <CursorComponent />

          <div className='flex-grow-1'>
            <Routes>
              {data.map((obj) => (
                <React.Fragment key={obj.name}>
                  <Route exact path={obj.route} element={<MainPage page={obj.showName} />} />
                  <Route exact path={`${obj.route}/:projectTag`} element={<ProjectPage page={obj.showName} />} />
                </React.Fragment>
              ))}
            </Routes>
          </div>

          <Footer />
          <BackToTop />

          <button className="btn border-0" onClick={() => setShowChatbot(!showChatbot)} style={{ zIndex: 1001, position: 'fixed', bottom: '10px', right: '3px' }} >
            <TbMessageChatbot className='text-light' style={{ fontSize: '3rem' }} />
          </button>
          {showChatbot && <Chatbot />}

        </SideBar>
      </Router>
    </div>
  );
}

export default App;
