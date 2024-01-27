import React from 'react';
import { FaGithub } from "react-icons/fa";
import { BiSolidZap } from "react-icons/bi";

const Card = (props) => {
	const { tech, tag, title, description, liveLink } = props;

	const imageURL = `https://github.com/Avdhesh-Varshney/WebMasterLog/raw/main/${tech}/${tag}/${title.replace(/\s+/g, '-')}/${title.replace(/\s+/g, '-')}.webp`;
	const sourceLink = `https://github.com/Avdhesh-Varshney/WebMasterLog/raw/main/${tech}/${tag}/${title.replace(/\s+/g, '-')}`

	const handleProjectClick = () => {
		const githubUrlParts = liveLink.split('/blob/');
		const loadURL = 'https://raw.githack.com/Avdhesh-Varshney/WebMasterLog/' + githubUrlParts[1];
		window.location.href = loadURL;
	};

	return (
		<div className="card h-100" style={{ maxWidth: '400px', backgroundColor: '#12151e', color: '#fff', marginLeft: 'auto' }}>
			<img src={imageURL} alt={title} className="card-img-top" style={{ objectFit: 'cover' }} />

			<div className="card-body">
				<h5 className="card-title">{title}</h5>

				<p className="card-text">{description}</p>

				<a href={sourceLink} className="btn btn-dark m-1" style={{ fontSize: '1.3rem' }}>
					<FaGithub />
				</a>

				<button className="btn btn-dark m-1" style={{ fontSize: '1.2rem', color: 'white' }} onClick={handleProjectClick}>
					<BiSolidZap />
				</button>
			</div>
		</div>
	);
}

export default Card
