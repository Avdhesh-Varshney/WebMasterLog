import { useContext } from 'react';
import { useQuery } from 'react-query';
import { Context } from '../contexts/Context';
import FetchData from '../utils/FetchData';

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

const useRepoData = () => {
  const { setProgress, setData, setRepoData, setContributors, setMilestones, setChartMilestones, setLanguages } = useContext(Context);

  return useQuery('repoData', async () => {
    setProgress(10);
    const data = await FetchData(`${import.meta.env.VITE_GITHUB_REPO_URL}/contents`);
    
    setProgress(20);
    const repoResult = await FetchData(import.meta.env.VITE_GITHUB_REPO_URL);
    setRepoData(repoResult);
    
    setProgress(30);
    const languagesResult = await FetchData(`${import.meta.env.VITE_GITHUB_REPO_URL}/languages`);
    setLanguages(languagesResult);
    
    setProgress(40);
    const milestonesResult = await FetchData(`${import.meta.env.VITE_GITHUB_REPO_URL}/milestones`);
    setMilestones(milestonesResult);

    setProgress(50);
    const contributorsResult = await FetchData(`${import.meta.env.VITE_GITHUB_REPO_URL}/contributors?per_page=500`);
    setContributors(contributorsResult);
    
    setProgress(60);
    const chartMilestonesData = milestonesResult.map((milestone) => ({
      title: milestone.title,
      total_issues: milestone.closed_issues + milestone.open_issues,
    }));
    setChartMilestones(chartMilestonesData);
    
    setProgress(70);
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

    setProgress(80);
    const updatedData = [{ name: 'Dashboard', showName: "Dashboard", url: null, route: '', icon: icons['Dashboard'], scrollBarColor: scrollbars['Dashboard'] }, ...filteredData];
    
    setProgress(90);
    setData(updatedData);

    setProgress(100);
    return updatedData;
  });
};

export default useRepoData;
