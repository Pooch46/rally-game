import * as THREE from 'three';

const Terrain = () => {
  const geometry = new THREE.PlaneGeometry(100, 100, 32, 32);
  const vertices = geometry.attributes.position.array;

  for (let i = 0; i < vertices.length; i += 3) {
    vertices[i + 2] = Math.sin(i / 10) * 2; // Hills and dips
  }
  geometry.attributes.position.needsUpdate = true;

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <bufferGeometry attach="geometry" {...geometry} />
      <meshStandardMaterial map={new THREE.TextureLoader().load('/src/assets/textures/blocky_dirt.png')} />
    </mesh>
  );
};

export default Terrain;
