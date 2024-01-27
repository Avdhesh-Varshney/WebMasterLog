import React from 'react'
import Card from './Card'

const ProjectCards = (props) => {
	const { projectsData } = props;
	return (
		<div className='ms-5 ps-5' style={{width: '1300px'}} >
			<div className="d-flex flex-wrap justify-content-evenly align-content-around">
				{projectsData.map((data, index) => (
					<Card key={index} imageLink={data.imageLink} title={data.title} content={data.content} sourceLink={data.sourceLink} liveLink={data.liveLink} />
				))}
			</div>
		</div>
	)
}

export default ProjectCards
