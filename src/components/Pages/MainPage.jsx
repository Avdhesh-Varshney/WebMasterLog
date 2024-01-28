import React, { useEffect, useState } from 'react';
import ProjectCards from '../Cards/ProjectCards';
import './mainpage.css';

const MainPage = (props) => {
	const { category, routes } = props;
	if (category === '') return;

	const [projectsData, setProjectsData] = useState([]);
	const [tag, setTag] = useState('All');

	const getName = (category) => {
		let filtered = routes.filter(obj => obj.path === `/${category}`);
		return filtered[0].name;
	}
	const getTech = (category) => {
		let filtered = routes.filter(obj => obj.path === `/${category}`);
		return filtered[0].tech;
	}

	useEffect(() => {
		const fetchData = async () => {
			props.setProgress(10);
			try {
				const response = await fetch(`/database/${category}.json`);
				if (!response.ok) {
					throw new Error('Failed to fetch projects data');
				}
				props.setProgress(30);
				const data = await response.json();
				props.setProgress(50);
				let filteredData = data;
				if (tag !== 'All') {
					filteredData = data.filter(project => project.tag === tag);
				}
				props.setProgress(80);
				setProjectsData(filteredData);
			} catch (error) {
				console.error('Error fetching projects data:', error);
			}
			props.setProgress(100);
		};
		fetchData();
	}, [tag]);

	const handleTagClick = (selectedTag) => {
		setTag(selectedTag);
	};

	return (
		<>
			<h1 className='text-end my-2 mx-3'>{`${getName(category)} Projects`}</h1>
			<div className="d-flex justify-content-end my-2 mx-3">
				<button type="button" className="btn btn-success mx-1" onClick={() => handleTagClick('Basic')}>Easy</button>
				<button type="button" className="btn btn-warning mx-1" onClick={() => handleTagClick('Intermediate')}>Medium</button>
				<button type="button" className="btn btn-danger mx-1" onClick={() => handleTagClick('Advanced')}>Hard</button>
				<button type="button" className="btn btn-info mx-1" onClick={() => handleTagClick('All')}>All</button>
			</div>

			<ProjectCards projectsData={projectsData} tech={getTech(category)} />
		</>
	);
}

export default MainPage;
