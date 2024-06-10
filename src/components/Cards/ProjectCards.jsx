import React from 'react';
import Card from './Card';
import './card.css';
import Footer from '../Footer/Footer';

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
    <div className="projects-container">
      <div className='projectsCard row row-cols-1 row-cols-md-3 g-4'>
        {projectsData.map((data, index) => (
          <div className="col card-container" key={index} style={{  minHeight: '300px', paddingTop: '20px', paddingBottom: '20px' }}>
            <Card key={index} tech={tech} tag={truncateDescription(data.tag, 1)} title={truncateDescription(data.title, 5)} description={truncateDescription(data.description, 20)} />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default ProjectCards;
