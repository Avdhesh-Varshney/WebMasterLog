import React, { useContext, useEffect } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Context } from './contexts/Context';
import FetchData from './utils/fetchData';
import './App.css';

// Importing Components
import MainPage from './pages/MainPage';
import ProjectPage from './pages/ProjectPage';
import SideBar from './components/Sidebar/SideBar';
import Footer from './components/shared/Footer';
import CursorComponent from './components/shared/Cursor';
import BackToTop from './components/shared/BackToTop';

// Importing Icons 
import { FaHome, FaAngular, FaReact, FaVuejs } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { FaNode } from "react-icons/fa6";
import { IoLogoJavascript } from "react-icons/io5";
import { MdLaptopWindows } from "react-icons/md";
import { SiTypescript } from "react-icons/si";

const icons = {
  'Dashboard': <FaHome className="dashboard" />,
  'Angular-JS-Projects': <FaAngular className="angular" />,
  'Front-end-Projects': <MdLaptopWindows className="frontend" />,
  'Next-JS-Projects': <TbBrandNextjs className="next" />,
  'Node-JS-Projects': <FaNode className="node" />,
  'React-JS-Projects': <FaReact className="react" />,
  'Typescript-Projects': <SiTypescript className='typescript' />,
  'Vanilla-JS-Projects': <IoLogoJavascript className="vanilla" />,
  'Vue-JS-Projects': <FaVuejs className="vue" />,
};

const scrollbars = {
  'Dashboard': '#cfd3d7',
  'Angular-JS-Projects': "#eb0d0d",
  'Front-end-Projects': "#6cd380",
  'Next-JS-Projects': "#68bf6f",
  'Node-JS-Projects': "green",
  'React-JS-Projects': "blue",
  'Typescript-Projects': "#3178c6",
  'Vanilla-JS-Projects': "#ffd700",
  'Vue-JS-Projects': "green",
};

const formatProjectName = (name) => {
  return name.replace('-Projects', '').replace(/-/g, ' ');
};

function App() {
  const { progress, setProgress, data, setData } = useContext(Context);

  useEffect(() => {
    setProgress(10);
    const getData = async () => {
      setProgress(20);
      const data = await FetchData("https://api.github.com/repos/Avdhesh-Varshney/WebMasterLog/contents");
      setProgress(40);
      const filteredData = data
        .filter((obj) => /-Projects$/.test(obj.name))
        .map((obj) => ({
          name: obj.name,
          showName: formatProjectName(obj.name),
          url: obj.url,
          route: `/${obj.name}`,
          icon: icons[obj.name],
          scrollBarColor: scrollbars[obj.name]
        }));
      setProgress(60);

      const updatedData = [{ name: 'Dashboard', showName: "Dashboard", url: null, route: '', icon: icons['Dashboard'], scrollBarColor: scrollbars['Dashboard'] }, ...filteredData];

      setProgress(80);
      setData(updatedData);
    };
    getData();
  }, []);
  setProgress(100);

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

        </SideBar>
      </Router>
    </div>
  );
}

export default App;
