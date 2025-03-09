import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';

const Car = () => {
  const carRef = useRef();
  const [position, setPosition] = useState([0, 0, 0]);
  const [rotation, setRotation] = useState([0, 0, 0]);

  useFrame(() => {
    fetch('/physics') // lovable.dev will route to the Go backend
      .then(res => res.json())
      .then(data => {
        setPosition([data.X, data.Y, data.Z]);
        setRotation([0, data.Rotation, 0]);
      });
  });

  return (
    <mesh ref={carRef} position={position} rotation={rotation}>
      <boxGeometry args={[2, 1, 4]} />
      <meshStandardMaterial map={new THREE.TextureLoader().load('/src/assets/textures/blocky_car.png')} />
    </mesh>
  );
};

export default Car;
