'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [position, setPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const step = 15; // Aumentei o passo para um movimento mais notável
      setPosition((prev) => {
        let newX = prev.x;
        let newY = prev.y;
        switch (e.key.toLowerCase()) {
          case 'w':
            newY -= step;
            break;
          case 'a':
            newX -= step;
            break;
          case 's':
            newY += step;
            break;
          case 'd':
            newX += step;
            break;
          default:
            return prev;
        }

        // Limita o movimento dentro da "estrada"
        const road = document.getElementById('road');
        if (road) {
          const roadRect = road.getBoundingClientRect();
          const carSize = 50; 
          newX = Math.max(0, Math.min(newX, roadRect.width - carSize));
          newY = Math.max(0, Math.min(newY, roadRect.height - carSize));
        }

        return { x: newX, y: newY };
      });
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <main className="flex flex-col items-center justify-center h-screen w-screen bg-gray-800 overflow-hidden">
        <h1 className="text-2xl font-bold text-white mb-4">Mova o carro com W, A, S, D</h1>
        <div id="road" className="relative w-[80vw] h-[80vh] bg-gray-600 border-8 border-gray-400 rounded-lg shadow-2xl overflow-hidden">
            <div className="absolute w-full h-full flex items-center justify-center">
                 <div className="w-4 h-full border-dashed border-l-8 border-white opacity-50"></div>
            </div>
            <div
            id="car"
            className="w-[50px] h-[30px] bg-red-600 rounded-md absolute border-2 border-black shadow-lg"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                transition: 'left 0.1s linear, top 0.1s linear', // Animação suave
            }}
            />
        </div>
    </main>
  );
}
