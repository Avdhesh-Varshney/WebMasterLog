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
        <h1 className="text-4xl font-extrabold">Supercharge Your  <span className="scribble ">Web Development</span> Journey</h1>
        <p className="mt-4 text-lg">
          Explore, learn, and contribute to diverse web development projects. Empower your skills with open-source.
        </p>
        <Link href="/angular">
          <button
            className="relative inline-block mt-5 p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105  active:scale-95"
          >
            <span
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            ></span>

            <span className="relative z-1 block px-6 py-3 rounded-xl bg-gray-950">
              <div className="relative z-1 flex items-center space-x-2">
                <span className="transition-all duration-500 group-hover:translate-x-1 text-transparent bg-clip-text bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E]"
                >Let's get started</span>
                <svg
                  className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                  data-slot="icon"
                  aria-hidden="true"
                  fill="#FF675E"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </span>
          </button>
        </Link>
      </header>

      {/* Problem-Solution Showcase */}
      <section className="bg-gradient-to-br from-gray-900  to-black text-gray-200 py-16 px-8 rounded-lg shadow-lg relative">
        <h2 className="text-3xl font-extrabold text-center mb-10 text-white">
          Why Web Master Log?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="bg-gradient-to-tr from-gray-700 via-gray-800 to-gray-900 p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300 relative">
            <div className="absolute top-4 right-4 w-3 h-3 bg-white rounded-full shadow-md animate-ping"></div>
            <div className="absolute top-4 right-4 w-3 h-3 bg-white rounded-full"></div>
            <h3 className="text-2xl font-semibold mb-3 text-white">Real Projects</h3>
            <p className="text-gray-400">
              Access a wide range of real-world projects, from beginner-friendly to advanced.
            </p>
            <div className="absolute inset-0 border border-gray-600 rounded-lg"></div>
          </div>
          <div className="bg-gradient-to-tr from-gray-700 via-gray-800 to-gray-900 p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300 relative">
            <div className="absolute top-4 right-4 w-3 h-3 bg-white rounded-full shadow-md animate-ping"></div>
            <div className="absolute top-4 right-4 w-3 h-3 bg-white rounded-full"></div>
            <h3 className="text-2xl font-semibold mb-3 text-white">Collaborative Learning</h3>
            <p className="text-gray-400">
              Contribute, learn, and grow by collaborating with a vibrant developer community.
            </p>
            <div className="absolute inset-0 border border-gray-600 rounded-lg"></div>
          </div>
          <div className="bg-gradient-to-tr from-gray-700 via-gray-800 to-gray-900 p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300 relative">
            <div className="absolute top-4 right-4 w-3 h-3 bg-white rounded-full shadow-md animate-ping"></div>
            <div className="absolute top-4 right-4 w-3 h-3 bg-white rounded-full"></div>
            <h3 className="text-2xl font-semibold mb-3 text-white">Beginner-Friendly</h3>
            <p className="text-gray-400">
              Start your journey with easy-to-follow documentation and guides.
            </p>
            <div className="absolute inset-0 border border-gray-600 rounded-lg"></div>
          </div>
        </div>
      </section>


      {/* Explore Projects */}
      <section className="bg-gradient-to-tr from-gray-900  to-black text-gray-200 py-16 px-8 rounded-lg shadow-xl">
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
            <button
              className="relative inline-block mt-5 p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105  active:scale-95"
            >
              <span
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              ></span>

              <span className="relative z-1 block px-6 py-3 rounded-xl bg-gray-950">
                <div className="relative z-1 flex items-center space-x-2">
                  <span className="transition-all duration-500 group-hover:translate-x-1 text-transparent bg-clip-text bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E]"
                  >Browse All</span>
                  <svg
                    className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                    data-slot="icon"
                    aria-hidden="true"
                    fill="#FF675E"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clip-rule="evenodd"
                      d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </span>
            </button>
          </Link>
        </div>
      </section>

      {/* Call to Contribute */}
      <section className="bg-gradient-to-br from-gray-900  to-black text-gray-200 py-16 px-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Ready to Contribute?
        </h2>
        <p className="text-center mb-8 text-gray-300">
          Join our community and contribute to exciting open-source projects. It's
          easy, rewarding, and fun!
        </p>
        <div className="flex justify-center">
          <button
            className="relative inline-block mt-5 p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105  active:scale-95"
          >
            <span
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            ></span>

            <span className="relative z-1 block px-6 py-3 rounded-xl bg-gray-950">
              <div className="relative z-1 flex items-center space-x-2">
                <span className="transition-all duration-500 group-hover:translate-x-1 text-transparent bg-clip-text bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E]"
                >Start Contributing</span>
                <svg
                  className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                  data-slot="icon"
                  aria-hidden="true"
                  fill="#FF675E"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </span>
          </button>
        </div>
      </section>

    </div>
  );
}
