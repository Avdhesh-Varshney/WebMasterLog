import React from 'react';

// Importing Icons 
import { FaHome, FaAngular, FaCss3, FaReact, FaVuejs } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { FaNode } from "react-icons/fa6";
import { IoLogoJavascript } from "react-icons/io5";
import { MdLaptopWindows } from "react-icons/md";

const categories = ['', 'angular', 'css', 'frontend', 'next', 'node', 'react', 'vanilla', 'vue'];
const icons = {
  '': <FaHome className="dashboard" />,
  'angular': <FaAngular className="angular" />,
  'css': <FaCss3 className="css" />,
  'frontend': <MdLaptopWindows className="frontend" />,
  'next': <TbBrandNextjs className="next" />,
  'node': <FaNode className="node" />,
  'react': <FaReact className="react" />,
  'vanilla': <IoLogoJavascript className="vanilla" />,
  'vue': <FaVuejs className="vue" />,
};

const routesName = (category) => {
  if (category === '') return 'Dashboard';
  else if (category === 'css') return 'CSS';
  else if (category === 'frontend') return 'Front End';
  return category[0].toUpperCase() + category.slice(1) + ' JS';
};

const techName = (category) => {
  if(category === '') return 'Dashboard';
  else if(category === 'css') return 'CSS-Projects';
  else if(category === 'frontend') return 'Front-end-Projects';
  return category[0].toUpperCase() + category.slice(1) + '-JS-Projects';
}

const Links = () => {
  const routes = categories.map((category) => ({
    tech: techName(category),
    path: `/${category}`,
    name: routesName(category),
    icon: icons[category],
  }));
  return routes;
};

export default Links;
