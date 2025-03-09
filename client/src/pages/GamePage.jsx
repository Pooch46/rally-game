import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Car from '../components/Car';
import Terrain from '../components/Terrain';
import UI from '../components/UI';

const GamePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 bg-gray-800 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Blocky Rally</h1>
        <nav>
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded">
            Start Race
          </button>
        </nav>
      </header>
      <main className="flex-grow relative">
        <Canvas className="w-full h-full">
          <PerspectiveCamera makeDefault position={[0, 5, 10]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} />
          <Car />
          <Terrain />
          <OrbitControls />
        </Canvas>
        <UI />
      </main>
      <footer className="p-4 bg-gray-800 text-center">
        <p>Hosted on <a href="https://lovable.dev" className="text-green-400">lovable.dev</a></p>
        <p>Controls: WASD or Arrow Keys</p>
      </footer>
    </div>
  );
};

export default GamePage;
