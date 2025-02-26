'use client'

import { useEffect, useRef } from 'react';

export const WaveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Wave parameters with higher amplitude
    const waves = [
      { amplitude: 120, frequency: 0.005, speed: 0.02, color: '#238636' },
      { amplitude: 100, frequency: 0.008, speed: 0.03, color: '#2ea043' },
      { amplitude: 80, frequency: 0.01, speed: 0.015, color: '#3fb950' }
    ];

    // Boxes parameters
    const boxes: Box[] = [];
    const boxCount = 30;

    interface Box {
      x: number;
      y: number;
      size: number;
      direction: 'up' | 'down' | 'left' | 'right';
      speed: number;
      opacity: number;
      rotationSpeed: number;
      rotation: number;
      color: string;
    }

    const colors = ['#238636', '#2ea043', '#3fb950', '#46c453'];
    const directions: ('up' | 'down' | 'left' | 'right')[] = ['up', 'down', 'left', 'right'];

    // Initialize boxes with specific directions
    for (let i = 0; i < boxCount; i++) {
      boxes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 40 + 20, // Larger size range
        direction: directions[Math.floor(Math.random() * directions.length)],
        speed: Math.random() * 2 + 1, // Faster movement
        opacity: Math.random() * 0.4 + 0.1,
        rotationSpeed: (Math.random() - 0.5) * 0.04,
        rotation: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    let time = 0;

    const drawWave = (wave: typeof waves[0], offset: number) => {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);

      for (let x = 0; x <= canvas.width; x += 1) {
        const y = Math.sin(x * wave.frequency + time * wave.speed + offset) * wave.amplitude;
        const baseY = canvas.height / 2;
        ctx.lineTo(x, baseY + y);
      }

      ctx.strokeStyle = wave.color;
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const updateBox = (box: Box) => {
      // Update position based on direction
      switch (box.direction) {
        case 'up':
          box.y -= box.speed;
          if (box.y + box.size < 0) {
            box.y = canvas.height;
            box.x = Math.random() * canvas.width;
          }
          break;
        case 'down':
          box.y += box.speed;
          if (box.y > canvas.height) {
            box.y = -box.size;
            box.x = Math.random() * canvas.width;
          }
          break;
        case 'left':
          box.x -= box.speed;
          if (box.x + box.size < 0) {
            box.x = canvas.width;
            box.y = Math.random() * canvas.height;
          }
          break;
        case 'right':
          box.x += box.speed;
          if (box.x > canvas.width) {
            box.x = -box.size;
            box.y = Math.random() * canvas.height;
          }
          break;
      }

      box.rotation += box.rotationSpeed;
    };

    const drawBox = (box: Box) => {
      ctx.save();
      ctx.translate(box.x + box.size / 2, box.y + box.size / 2);
      ctx.rotate(box.rotation);
      ctx.strokeStyle = `rgba(${hexToRgb(box.color)}, ${box.opacity})`;
      ctx.strokeRect(-box.size / 2, -box.size / 2, box.size, box.size);
      ctx.restore();
    };

    // Helper function to convert hex to rgb
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result 
        ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
        : '35, 134, 54';
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw waves
      waves.forEach((wave, i) => {
        drawWave(wave, i * Math.PI / 3);
      });

      // Update and draw boxes
      boxes.forEach(box => {
        updateBox(box);
        drawBox(box);
      });

      time += 0.02; // Increased speed for waves
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 opacity-40"
      style={{ filter: 'blur(0.5px)' }}
    />
  );
}; 
