import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import Planet from './Planet';
import { planetData } from '../data/planetData';

const SolarSystem = ({ setSelectedPlanet }) => {
  const groupRef = useRef();

  useFrame(() => {
    groupRef.current.rotation.y += 0.0005;
  });

  const sunDiameter = planetData[0].diameter;
  const scaleFactor = 2 / sunDiameter;

  // Use a logarithmic scale for distances
  const minDistance = Math.min(...planetData.slice(1).map(p => p.distance));
  const maxDistance = Math.max(...planetData.map(p => p.distance));
  const logMinDist = Math.log(minDistance);
  const logMaxDist = Math.log(maxDistance);
  const distanceScale = 30 / (logMaxDist - logMinDist);

  return (
    <group ref={groupRef}>
      {planetData.map((planet) => {
        const isSun = planet.name === 'Sun';
        let distance = 0;
        if (!isSun) {
          const logDist = Math.log(planet.distance);
          distance = (logDist - logMinDist) * distanceScale + 5;
        }
        
        // Adjust planet scaling
        let planetScale;
        if (isSun) {
          planetScale = planet.diameter * scaleFactor;
        } else {
          // New scaling formula for planets
          const baseScale = planet.diameter * scaleFactor;
          const minScale = 0.1; // Minimum scale to ensure visibility
          const maxScale = 1.5; // Maximum scale to prevent planets from being too large
          
          // Logarithmic scaling to better represent size differences
          planetScale = Math.log(baseScale + 1) / Math.log(maxScale + 1) * maxScale;
          
          // Ensure the scale is within the desired range
          planetScale = Math.max(Math.min(planetScale, maxScale), minScale);
          
          // Special case for Saturn
          if (planet.name === 'Saturn') {
            planetScale *= 1.3; // Make Saturn slightly larger to emphasize its ring
          }
        }
        
        return (
          <Planet
            key={planet.name}
            planetData={planet}
            scale={planetScale}
            position={[distance, 0, 0]}
            setSelectedPlanet={setSelectedPlanet}
          />
        );
      })}
    </group>
  );
};

export default SolarSystem;