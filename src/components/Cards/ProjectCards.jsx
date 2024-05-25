import React from 'react'
import Card from './Card'
import './card.css'

const ProjectCards = (props) => {
	const { projectsData, tech } = props;
	const truncateDescription = (description, limit) => {
    const words = description.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return description;
  };
	return (
		<div className='projectsCard row row-cols-1 row-cols-md-3 g-4' style={{ margin: '1rem auto', position: 'absolute', right: '0', top: '15%' }}>
    {projectsData.map((data, index) => (
        <div className="col" key={index} style={{ minWidth: '400px',minHeight:'300px' }}> {/* Set a minimum width */}
            <Card key={index} tech={tech} tag={truncateDescription(data.tag, 1)} title={truncateDescription(data.title, 5)} description={truncateDescription(data.description, 20)} />
        </div>
    ))}
</div>

	)
}

export default ProjectCards
