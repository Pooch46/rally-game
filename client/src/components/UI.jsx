import { useEffect, useState } from 'react';

const UI = () => {
  const [speed, setSpeed] = useState(0);
  const [gear, setGear] = useState('N');

  useEffect(() => {
    const updateUI = async () => {
      const res = await fetch('/physics'); // lovable.dev will route to the Go backend
      const data = await res.json();
      setSpeed(Math.round(data.Speed));
      setGear(data.Gear);
    };
    const interval = setInterval(updateUI, 100);
    return () => clearInterval(interval);
  }, []);

  const handleControl = (action) => {
    fetch('/control', { // lovable.dev will route to the Go backend
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action })
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const keyMap = {
        'w': 'accelerate', 's': 'brake',
        'a': 'left', 'd': 'right',
        'ArrowUp': 'accelerate', 'ArrowDown': 'brake',
        'ArrowLeft': 'left', 'ArrowRight': 'right'
      };
      if (keyMap[e.key]) handleControl(keyMap[e.key]);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="absolute top-0 left-0 p-4 w-full flex justify-between">
      <div className="bg-gray-900 p-4 rounded-lg border-4 border-gray-700">
        <h2 className="text-lg font-bold">Speed</h2>
        <div className="text-3xl">{speed} km/h</div>
      </div>
      <div className="bg-gray-900 p-4 rounded-lg border-4 border-gray-700">
        <h2 className="text-lg font-bold">Gear</h2>
        <div className="text-3xl">{gear}</div>
        <div className="mt-2 flex gap-2">
          {['N', '1', '2', '3', '4', 'R'].map(g => (
            <button
              key={g}
              className={`px-2 py-1 rounded ${gear === g ? 'bg-green-600' : 'bg-gray-600'} hover:bg-green-700`}
              onClick={() => handleControl(`gear_${g}`)}
            >
              {g}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-gray-900 p-4 rounded-lg border-4 border-gray-700">
        <h2 className="text-lg font-bold">Mini-Map</h2>
        <div className="w-32 h-32 bg-gray-800 rounded" />
      </div>
    </div>
  );
};

export default UI;
