import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Project } from '../../types';

const ProjectCard = ({ key, category, level, project, liveURL }: { key: number, category: string, level: string, project: Project, liveURL: string }) => {
	return (
		<Card className="bg-[#191c24] border-none rounded-sm" key={key}>
			<CardHeader>
				<CardTitle className="text-white">{project.project_name.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}</CardTitle>
				<CardDescription>
					<Link href={`https://github.com/Avdhesh-Varshney/WebMasterLog/raw/main/src/app/(category)/${category}/(projects)/${project.project_name}`}>
						{`${level}/${project.project_name}`}
					</Link>
				</CardDescription>
			</CardHeader>

			<CardContent className="flex justify-center items-center">
				<div className="relative w-full h-48 group">
					<Image
						src={`https://raw.githubusercontent.com/Avdhesh-Varshney/WebMasterLog/main/src/app/(category)/${category}/(projects)/${project.project_name}/screenshot.webp`}
						alt=''
						width={300}
						height={280}
						sizes='280'
						className="w-full h-full object-cover"
					/>

					<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
						<Link href={liveURL}
							className="relative border-2 border-emerald-500 text-emerald-500 bg-transparent rounded-md px-4 py-2 transition-all duration-300 hover:bg-emerald-500 hover:text-white">
							View Live Project
						</Link>
					</div>
				</div>
			</CardContent>

			<CardFooter className="flex flex-col items-start gap-4">
				<div className='flex items-center justify-between gap-5 p-2'>
					<div className='avatar rounded-full min-h-6 min-w-6 bg-blue-500 font-[700] flex items-center justify-center'>
						<Image src={project.avatar_url} alt='' width={30} height={30} className='rounded-full object-cover' sizes='30' />
					</div>
					<div className="grow">
						<p className='text-sm font-bold text-white'>
							<Link href={project.github_url}>{project.creator}</Link>
						</p>
						<p className='text-xs text-[#6c7293]'>
							Developed on {project.date}
						</p>
					</div>
				</div>

				<span className={`w-full h-[2px] ${level == 'beginner' ? 'bg-green-400' : level == 'intermediate' ? 'bg-yellow-400' : 'bg-red-400'}`}></span>
			</CardFooter>
		</Card>
	)
}

export default ProjectCard;
