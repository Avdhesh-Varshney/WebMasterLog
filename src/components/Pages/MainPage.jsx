import React, { useEffect, useState } from "react";
import ProjectCards from "../Cards/ProjectCards";
import "./mainpage.css";
import Dashboard from "./Dashboard";

const MainPage = (props) => {
  const { category, routes, setProgress } = props;
  if (category === "") return <Dashboard />;

  const [projectsData, setProjectsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [tag, setTag] = useState("All");

  const getName = (category) => {
    let filtered = routes.filter((obj) => obj.path === `/${category}`);
    return filtered[0].name;
  };

  const getTech = (category) => {
    let filtered = routes.filter((obj) => obj.path === `/${category}`);
    return filtered[0].tech;
  };

  useEffect(() => {
    const fetchData = async () => {
      setProgress(10);
      try {
        const response = await fetch(
          `https://raw.githubusercontent.com/Avdhesh-Varshney/WebMasterLog/main/database/${category}.json`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch projects data");
        }
        setProgress(30);
        const data = await response.json();
        setProgress(50);
        setProjectsData(data);
        setFilteredData(data);
        setProgress(80);
      } catch (error) {
        console.error("Error fetching projects data:", error);
      }
      setProgress(100);
    };
    fetchData();
  }, [category, setProgress]);

  useEffect(() => {
    if (tag === "All") {
      setFilteredData(projectsData);
    } else {
      setFilteredData(projectsData.filter((project) => project.tag === tag));
    }
  }, [tag, projectsData]);

  const handleTagClick = (selectedTag) => {
    setTag(selectedTag);
  };

  useEffect(() => {
    const dropdown = document.querySelector(".custom-dropdown");
    if (dropdown) {
      const colorMap = {
        Basic: "green",
        Intermediate: "yellow",
        Advanced: "red",
        All: "#1E90FF",
      };
      dropdown.style.border = '1px solid '+colorMap[tag] || "blue";
      dropdown.style.color = colorMap[tag] || "blue";
    }
  }, [tag]);

  return (
    <div className="">
      <h1 className='text-end my-2 mx-2'>{`${getName(category)} Projects`}</h1>
      <div className="button-group justify-content-end my-2 mx-3">
        <button type="button" className={`btn btn${tag !== 'Basic'? '-outline': ''}-success mx-1`} onClick={() => handleTagClick('Basic')}>Easy</button>
        <button type="button" className={`btn btn${tag !== 'Intermediate'? '-outline': ''}-warning mx-1`} onClick={() => handleTagClick('Intermediate')}>Medium</button>
        <button type="button" className={`btn btn${tag !== 'Advanced'? '-outline': ''}-danger mx-1`} onClick={() => handleTagClick('Advanced')}>Hard</button>
        <button type="button" className={`btn btn${tag !== 'All'? '-outline': ''}-info mx-1`} onClick={() => handleTagClick('All')}>All</button>
      </div>


      <div className="dropdown">
        <select
          className="dropdown form-select custom-dropdown"
          onChange={(e) => handleTagClick(e.target.value)}
        >
          <option value="Basic">Easy</option>
          <option value="Intermediate">Medium</option>
          <option value="Advanced">Hard</option>
          <option value="All" selected>All</option>
        </select>
      </div>
      <ProjectCards projectsData={filteredData} tech={getTech(category)} />
    </div>
  );
};

export default MainPage;
