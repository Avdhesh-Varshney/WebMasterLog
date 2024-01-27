import React from 'react';
import { FaGithub } from "react-icons/fa";
import { BiSolidZap } from "react-icons/bi";

const Card = (props) => {
	const { imageLink, title, content, sourceLink, liveLink } = props;

	const handleProjectClick = () => {
		const githubUrlParts = liveLink.split('/tree/');
		const loadURL = 'https://raw.githack.com/Avdhesh-Varshney/WebMasterLog/' + githubUrlParts[1];
		window.location.href = loadURL;
	};

	return (
		<div className="card mx-1 my-2" style={{ maxWidth: '400px', backgroundColor: '#12151e', color: '#fff' }}>
            <img src={imageLink} alt={title} className="card-img-top my-2 mx-2" style={{ objectFit: 'cover', width: '380px', height: '180px' }} />

            <div className="card-body">
                <h5 className="card-title">{title}</h5>

                <p className="card-text">{content}</p>

                <a href={sourceLink} className="btn btn-dark m-1" style={{ fontSize: '1.3rem' }}>
                    <FaGithub />
                </a>

                <button className="btn btn-dark m-1" style={{ fontSize: '1.2rem', color: 'white', boxShadow: 'none', overflow: 'hidden' }} onClick={handleProjectClick}>
                    <BiSolidZap />
                </button>
            </div>
        </div>
	);
}

export default Card
