import { generateStaticParams } from '../../utils/generateStaticParams';
import ProjectCard from '../../components/shared/ProjectCard';
import React from 'react';

const Project = async ({ params }: { params: { projectDomain: string } }) => {
  const allProjects = await generateStaticParams(params.projectDomain);
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allProjects?.map((projectPath, index) => (
          <ProjectCard key={index} projectPath={projectPath} />
        ))}
      </div>
    </div>
  );
};

export default Project;
