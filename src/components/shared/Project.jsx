import React from 'react';
import { useParams } from 'react-router-dom';

const Project = () => {
  const {projectTag, project} = useParams();

  return (
    <div>ProjectDetail</div>
  )
}

export default Project;
