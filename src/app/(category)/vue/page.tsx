import React from 'react';
import data from '../../../database/data.json';
import { ProjectsData } from '../../../types';
import ProjectCard from '../../../components/shared/ProjectCard';

const levels = ['beginner', 'intermediate', 'advanced'] as const;

const page = () => {
    const projects = data.vue as ProjectsData;

    return (
        <div className="flex flex-col gap-5">
            {levels.map((level) => (
                <div key={level} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects[level].map((project, index) => (
                        <ProjectCard key={index} category="vue" level={level} project={project} liveURL={`#`} />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default page;