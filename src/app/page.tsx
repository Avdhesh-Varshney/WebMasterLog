'use client';

import { useEffect, useState } from "react";
import data from "../database/data.json";
import ProjectCard from "../components/shared/ProjectCard";
import { ProjectsData, Project } from "../types";
import Link from "next/link";

export default function Home() {
  const [randomProjects, setRandomProjects] = useState<Project[]>([]);

  const getRandomProjects = (): Project[] => {
    const allProjects: Record<keyof ProjectsData, Project[]> = {
      beginner: [],
      intermediate: [],
      advanced: [],
    };
    for (const category in data) {
      if (Object.prototype.hasOwnProperty.call(data, category)) {
        const categoryData = data[category as keyof typeof data];
        for (const level in categoryData) {
          const levelKey = level as keyof ProjectsData;
          (categoryData[levelKey] as Project[]).forEach((project) =>
            allProjects[levelKey]?.push({ ...project, category, level: levelKey })
          );
        }
      }
    }

    const beginnerProject = allProjects.beginner[Math.floor(Math.random() * allProjects.beginner.length)];
    const intermediateProject = allProjects.intermediate[Math.floor(Math.random() * allProjects.intermediate.length)];
    const advancedProject = allProjects.advanced[Math.floor(Math.random() * allProjects.advanced.length)];
    return [beginnerProject, intermediateProject, advancedProject].filter(
      (project): project is Project => Boolean(project)
    );
  };

  useEffect(() => {
    const projects = getRandomProjects();
    setRandomProjects(projects);
  }, []);

  return (
    <div className="flex flex-col gap-5">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700 text-white text-center py-16 px-8 rounded-lg shadow-xl">
        <h1 className="text-4xl font-extrabold">Supercharge Your Web Development Journey</h1>
        <p className="mt-4 text-lg">
          Explore, learn, and contribute to diverse web development projects. Empower your skills with open-source.
        </p>
        <Link href="/angular">
          <button className="bg-white text-blue-600 mt-6 px-6 py-3 rounded-lg shadow-md font-semibold hover:bg-gray-100 transition-all">
            Get Started
          </button>
        </Link>
      </header>

      {/* Problem-Solution Showcase */}
      <section className="bg-gray-800 text-gray-200 py-16 px-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Why Web Master Log?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold mb-3 text-white">Real Projects</h3>
            <p className="text-gray-300">
              Access a wide range of real-world projects, from beginner-friendly to advanced.
            </p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold mb-3 text-white">Collaborative Learning</h3>
            <p className="text-gray-300">
              Contribute, learn, and grow by collaborating with a vibrant developer community.
            </p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold mb-3 text-white">Beginner-Friendly</h3>
            <p className="text-gray-300">
              Start your journey with easy-to-follow documentation and guides.
            </p>
          </div>
        </div>
      </section>

      {/* Explore Projects */}
      <section className="bg-gradient-to-b from-indigo-700 to-purple-900 text-white py-16 px-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6">Explore Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {randomProjects.map((project, index) => (
            <ProjectCard
              key={index}
              category={project.category as string}
              level={project.level as "beginner" | "intermediate" | "advanced"}
              project={project}
              liveURL="#"
            />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href={'/angular'}>
            <button className="bg-white text-indigo-700 px-6 py-3 rounded-lg shadow-md font-semibold hover:bg-gray-100 transition-all">
              Browse All Projects
            </button>
          </Link>
        </div>
      </section>

      {/* Call to Contribute */}
      <section className="bg-gray-800 py-16 px-8 text-gray-200 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Ready to Contribute?
        </h2>
        <p className="text-center mb-8 text-gray-300">
          Join our community and contribute to exciting open-source projects. It's
          easy, rewarding, and fun!
        </p>
        <div className="flex justify-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md font-semibold hover:bg-blue-700 transition-all">
            Start Contributing
          </button>
        </div>
      </section>

    </div>
  );
}
