import React from 'react';

const PlanetInfo = ({ planet }) => {
  return (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      left: '20px',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      padding: '20px',
      borderRadius: '10px',
      maxWidth: '300px'
    }}>
      <h2>{planet.name}</h2>
      <p>Diameter: {planet.diameter.toLocaleString()} km</p>
      <p>Distance from Sun: {planet.distance.toLocaleString()} million km</p>
      <p>Rotation Period: {Math.abs(planet.rotationPeriod)} hours</p>
      <p>{planet.info}</p>
    </div>
  );
};

export default PlanetInfo;