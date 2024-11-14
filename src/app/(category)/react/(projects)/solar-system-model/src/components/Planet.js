import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Ring } from '@react-three/drei';

const Planet = ({ planetData, scale, position, setSelectedPlanet }) => {
  const meshRef = useRef();
  const texture = useLoader(TextureLoader, planetData.texture);

  useFrame(() => {
    meshRef.current.rotation.y += 0.01 / (planetData.rotationPeriod / 24);
  });

  const isSaturn = planetData.name === 'Saturn';
  

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        scale={scale}
        onClick={() => setSelectedPlanet(planetData)}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      {isSaturn && (
        <Ring args={[1.2, 2, 32]} rotation={[Math.PI / 2, 0, 0]} scale={scale}>
          <meshBasicMaterial color="#A49B72" side={2} transparent opacity={0.8} />
        </Ring>
      )}
    </group>
  );
};

export default Planet;