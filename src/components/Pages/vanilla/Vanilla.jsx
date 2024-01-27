import React, { useEffect, useState } from 'react';
import ProjectCards from '../../Cards/ProjectCards';
import './vanilla.css';

const tech = 'Vanilla-JS-Projects';

const Vanilla = (props) => {
  const { category } = props;
  if (category !== 'vanilla') return;

  const [projectsData, setProjectsData] = useState([]);
  const [level, setLevel] = useState('Basic');

  useEffect(() => {
    const fetchData = async () => {
      props.setProgress(10);
      try {
        const response = await fetch(`https://api.github.com/repos/Avdhesh-Varshney/WebMasterLog/contents/${tech}/${level}`);
        props.setProgress(30);
        if (!response.ok) {
          throw new Error('Failed to fetch projects data');
        }
        const data = await response.json();
        props.setProgress(60);
        const projects = data.map((item) => ({
          imageLink: `https://raw.githubusercontent.com/Avdhesh-Varshney/WebMasterLog/main/${tech}/${level}/${item.name}/${item.name}.webp`,
          title: item.name,
          content: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
          sourceLink: item.html_url,
          liveLink: `${item.html_url}/index.html`
        }));
        props.setProgress(80);
        setProjectsData(projects.filter(project => project.title.toLowerCase() !== 'readme.md'));
      } catch (error) {
        console.error('Error fetching projects data:', error);
      }
      props.setProgress(100);
    };
    fetchData();
  }, [level]);

  const handleEasyClick = () => {
    setLevel('Basic');
  };

  const handleMediumClick = () => {
    setLevel('Intermediate');
  };

  const handleHardClick = () => {
    setLevel('Advanced');
  };

  const handleAllClick = () => {
    setLevel('All');
  };

  return (
    <>
      <h1 className='text-end my-2 mx-3'>Vanilla JS Projects</h1>
      <div className="d-flex justify-content-end my-2 mx-3">
        <button type="button" className="btn btn-success mx-1" onClick={handleEasyClick}>Easy</button>
        <button type="button" className="btn btn-warning mx-1" onClick={handleMediumClick}>Medium</button>
        <button type="button" className="btn btn-danger mx-1" onClick={handleHardClick}>Hard</button>
        <button type="button" className="btn btn-info mx-1" onClick={handleAllClick}>All</button>
      </div>

      <ProjectCards projectsData={projectsData} />
    </>
  );
}

export default Vanilla;
