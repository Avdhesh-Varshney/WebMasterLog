import React, { useContext, useEffect } from 'react'
import { Context } from '../contexts/Context';
import { useParams } from 'react-router-dom';
import FetchData from "../utils/FetchData";

// Importing Icons & Images
import { FaCode, FaGithub } from 'react-icons/fa';
import { BiSolidZap } from 'react-icons/bi';

function formatString(str) {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

const Projects = ({ page }) => {
  const { projectTag } = useParams();
  const { data, tagData, setProgress, projectsData, setProjectsData } = useContext(Context);
  const tagValue = tagData.find((item) => item.name === projectTag);
  const pageColor = data.find((item) => item.showName === page).scrollBarColor;
  console.log(tagValue)

  useEffect(() => {
    setProgress(10);
    const getData = async () => {
      setProgress(20);
      const result = await FetchData(tagValue.url);
      setProgress(40);
      const projects = result
        .filter((obj) => obj.type === "dir")
        .map((obj) => ({ projectName: obj.name, name: formatString(obj.name), path: obj.path, url: obj.url, targetURL: obj.html_url }));
      setProgress(60);
      setProjectsData(projects);
      setProgress(100);
    };
    getData();
  }, []);

  return (
    <div className='container d-flex flex-column align-items-center justify-content-center my-2 gap-3'>
      <h1 className="border-bottom border-2 border-info" style={{ color: pageColor }}>{page} Projects</h1>

      <h4 className="border-bottom border-2 border-white" style={{ color: (tagValue.name === 'Basic') ? 'green' : (tagValue.name === 'Intermediate') ? 'yellow' : 'red' }}>{tagValue.name} Level Projects</h4>

      <div className="container mb-5">
        <div className="row g-3 justify-content-evenly">
          {projectsData.map((project, index) => (

            <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center" key={index}>
              <div className="card text-white" style={{ width: '22rem', backgroundColor: `#12151e` }}>
                <img
                  onError={(e) => { e.target.onerror = null; e.target.src = '/photo-not-available.webp'; }}
                  src={`${import.meta.env.VITE_MAIN_BRANCH_URL}/${project.path}/screenshot.webp`}
                  className="card-img-top"
                  alt={project.name}
                  style={{ objectFit: 'cover', height: '200px' }}
                />

                <div className="card-body" style={{ color: (tagValue.name === 'Basic') ? 'green' : (tagValue.name === 'Intermediate') ? 'yellow' : 'red' }}>
                  <h5 className="card-title">{project.name}</h5>

                  <a href={project.targetURL} className="btn btn-dark m-1" style={{ fontSize: '1.3rem' }} title="Project GitHub Link">
                    <FaGithub id='svg' />
                  </a>

                  <a href='#' className="btn btn-dark m-1" style={{ fontSize: '1.2rem', color: 'white' }} title="Deployed Project">
                    <BiSolidZap id='svg' />
                  </a>

                  <a href={`/${tagValue.path}/${project.projectName}`} className="btn btn-dark m-1" style={{ fontSize: '1.2rem', color: 'white' }} title="View Code">
                    <FaCode id='svg' />
                  </a>
                </div>
              </div>
            </div>

          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects;
