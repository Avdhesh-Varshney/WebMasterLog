import React from 'react';
import { FaGithub } from "react-icons/fa";
import { BiSolidZap } from "react-icons/bi";

const Card = (props) => {
	const { tech, tag, title, description } = props;
	const targetData = `main/${tech}/${tag}/${title.replace(/\s+/g, '-')}`;

	const imageURL = `https://github.com/Avdhesh-Varshney/WebMasterLog/raw/${targetData}/screenshot.webp`;
	const sourceLink = `https://github.com/Avdhesh-Varshney/WebMasterLog/raw/${targetData}`

	const handleProjectClick = () => {
		const loadURL = 'https://raw.githack.com/Avdhesh-Varshney/WebMasterLog/' + targetData + '/index.html';
		window.location.href = loadURL;
	};

	return (
		<div className="card h-100" style={{ maxWidth: '400px', backgroundColor: '#12151e', color: '#fff', marginLeft: 'auto' }}>
			<img src={imageURL} alt={title} className="card-img-top" style={{ objectFit: 'cover',height:'200px' }} />

			<div className="card-body">
				<h5 className="card-title">{title}</h5>

				<p className="card-text">{description}</p>

				<a href={sourceLink} className="btn btn-dark m-1" style={{ fontSize: '1.3rem' }}title="View Code">
					<FaGithub id='svg' />
				</a>

				{(tech !== 'Vanilla-JS-Projects' && tech !== 'Front-end-Projects')? '' : <button className="btn btn-dark m-1" style={{ fontSize: '1.2rem', color: 'white' }} onClick={handleProjectClick} title="View Project">
					<BiSolidZap id='svg' />
				</button>}
			</div>
		</div>
	);
}

export default Card
