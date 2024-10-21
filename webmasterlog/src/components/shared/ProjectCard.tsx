'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ProjectCard = ({ key, projectDir, projectSubdir, project }: { key: number, projectDir: string, projectSubdir: string, project: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [name, setName] = React.useState('');
  const [githubUrl, setGithubUrl] = React.useState('');
  const [date, setDate] = React.useState('');
  const [avatarUrl, setAvatarUrl] = React.useState('');

  React.useEffect(() => {
    const fetchData = async (project: string) => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/Avdhesh-Varshney/WebMasterLog/commits?path=${projectDir}/${projectSubdir}/${project}&per_page=50`,
          {
            next: {
              revalidate: 86400,
            },
          }
        );
        const data = await response.json();
        if (data.length > 0) {
          const firstCommit = data[data.length - 1];
          setName(firstCommit.commit.author.name);
          setGithubUrl(firstCommit.author.html_url);
          setDate(firstCommit.commit.author.date);
          setAvatarUrl(firstCommit.author.avatar_url);
        } else {
          console.error('No commits found for the specified path.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(project);
  }, [projectDir, projectSubdir, project]);


  return (
    <Card className="bg-[#191c24] border-none rounded-sm" key={key}>
      <CardHeader>
        <CardTitle className="text-white">{project.replace(/-/g, ' ')}</CardTitle>
        <CardDescription>
          <Link href={`https://github.com/Avdhesh-Varshney/WebMasterLog/raw/main/${projectDir}/${projectSubdir}/${project}`}>
            {`${projectSubdir}/${project}`}
          </Link>
        </CardDescription>
      </CardHeader>

      <CardContent className="flex justify-center items-center">
        <div className="relative w-full h-48 group">
          <Image
            src={`https://raw.githubusercontent.com/Avdhesh-Varshney/WebMasterLog/main/${projectDir}/${projectSubdir}/${project}/screenshot.webp`}
            alt={project}
            width={300}
            height={280}
            sizes='280'
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClickCapture={() => router.push(`${pathname}/${projectSubdir.toLowerCase()}/${project.toLowerCase()}`)}
              className="relative border-2 border-emerald-500 text-emerald-500 bg-transparent rounded-md px-4 py-2 transition-all duration-300 hover:bg-emerald-500 hover:text-white">
              View Live Project
            </button>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-4">
        <div className='flex items-center justify-between gap-5 p-2'>
          <div className='avatar rounded-full min-h-6 min-w-6 bg-blue-500 font-[700] flex items-center justify-center'>
            <Image src={avatarUrl} alt='' width={30} height={30} className='rounded-full object-cover' sizes='30' />
          </div>
          <div className="grow">
            <p className='text-sm font-bold text-white'>
              <Link href={githubUrl || 'https://github.com'}>{name || 'Name not found'}</Link>
            </p>
            <p className='text-xs text-[#6c7293]'>
              {new Date(date).toDateString() !== 'Invalid Date' ? `Developed on ${new Date(date).toDateString()}` : 'Date not found'}
            </p>
          </div>
        </div>

        <span className={`w-full h-[2px] ${projectSubdir == 'Basic' ? 'bg-green-400' : projectSubdir == 'Intermediate' ? 'bg-yellow-400' : 'bg-red-400'}`}></span>
      </CardFooter>
    </Card>
  )
}

export default ProjectCard;
