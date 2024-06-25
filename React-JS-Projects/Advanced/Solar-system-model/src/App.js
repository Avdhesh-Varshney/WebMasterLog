import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import SolarSystem from './components/SolarSystem';
import PlanetInfo from './components/PlanetInfo';

function App() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 30, 50], fov: 60 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[0, 0, 0]} intensity={2} />
        <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} />
        <SolarSystem setSelectedPlanet={setSelectedPlanet} />
        <OrbitControls />
      </Canvas>
      {selectedPlanet && <PlanetInfo planet={selectedPlanet} />}
    </div>
  );
}

export default App;