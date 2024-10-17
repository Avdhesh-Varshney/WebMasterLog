'use server';

import ProjectCard from '../../components/shared/ProjectCard';
import React from 'react';
import fs from 'fs';

const Project = ({ params }: { params: { projectDomain: string } }) => {
  const rootDirFiles = fs.readdirSync('./../');
  const rootDirProjects = rootDirFiles.filter(project => project.includes('-Projects'));
  const projectDir = rootDirProjects.find(project => project.replace('-Projects', '').replace('-', '').toLowerCase() == params.projectDomain);
  const projectFiles = fs.readdirSync(`./../${projectDir}`);

  const levels = [
    { level: 'Basic', projects: projectFiles.filter(project => project.includes('Basic')) },
    { level: 'Intermediate', projects: projectFiles.filter(project => project.includes('Intermediate')) },
    { level: 'Advanced', projects: projectFiles.filter(project => project.includes('Advanced')) }
  ];

  const renderProjects = (level: string, projectDir: string, projectSubdir: string) => {
    if (!projectSubdir) return null;
    return (
      <div key={level} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {fs.readdirSync(`./../${projectDir}/${projectSubdir}`).map((project, key) => (
          <ProjectCard key={key} projectDir={projectDir} projectSubdir={projectSubdir} project={project} />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-5">
      {levels.map(level => level.projects.length > 0 && renderProjects(level.level, projectDir!, level.projects[0]))}
    </div>
  );
};

export default Project;
