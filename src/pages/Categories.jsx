import React, { useEffect, useContext } from "react";
import { Context } from "../contexts/Context";
import { Link } from "react-router-dom";

// Importing Components
import Dashboard from "./Dashboard";
import FetchData from "../utils/FetchData";

const Categories = ({ page }) => {
  if (page === "Dashboard") return <Dashboard />;
  const { setProgress, data, tagData, setTagData } = useContext(Context);
  const pageObj = data.find((item) => item.showName === page);

  useEffect(() => {
    setProgress(10);
    const getData = async () => {
      setProgress(20);
      const result = await FetchData(pageObj.url);
      setProgress(40);
      const tags = result
        .filter((obj) => obj.type === "dir")
        .map((obj) => ({ name: obj.name, path: obj.path, url: obj.url }));
      setProgress(60);
      setTagData(tags);
      setProgress(100);
    };
    getData();
  }, [page, setProgress]);

  return (
    <div style={{ maxWidth: '100%' }} className="d-flex flex-column gap-3 my-3 justify-content-center align-items-center">
      <h1 className="border-bottom border-info border-2" style={{ color: `${pageObj.scrollBarColor}` }}>{page} Projects</h1>

      <div className="container">
        <div className="row g-1 justify-content-evenly">
          {tagData.map((project) => (

            <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center" key={project.name}>
              <div className="card text-white" style={{ width: '18rem', backgroundColor: `#12151e` }}>
                <img src={`/${project.name}.jpg`} className="card-img-top" alt={`${project.name} image`} />
                <div className="card-body">
                  <h5 className="card-title" style={{ color: `${pageObj.scrollBarColor}` }}>{project.name} Projects</h5>
                  <p className="card-text">
                    Explore an exciting collection of {project.name} level projects. Dive in to review, learn, and enhance your skills with hands-on experience.
                  </p>
                  <Link to={`/${project.path}`} className="btn text-white" style={{ backgroundColor: `${pageObj.scrollBarColor}` }}>View Projects</Link>
                </div>
              </div>
            </div>

          ))}
        </div>
      </div>

    </div>
  );
};

export default Categories;
