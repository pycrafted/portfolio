import React, { useEffect, useRef } from 'react';

const AnimatedGradient: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let time = 0;

    function animate() {
      time += 0.005;

      // Create animated gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2 + Math.sin(time) * 100,
        canvas.height / 2 + Math.cos(time) * 100,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 2
      );

      // Animated colors
      const hue1 = (time * 50) % 360;
      const hue2 = (time * 50 + 120) % 360;
      const hue3 = (time * 50 + 240) % 360;

      gradient.addColorStop(0, `hsla(${hue1}, 70%, 50%, 0.1)`);
      gradient.addColorStop(0.5, `hsla(${hue2}, 70%, 50%, 0.05)`);
      gradient.addColorStop(1, `hsla(${hue3}, 70%, 50%, 0.02)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      requestAnimationFrame(animate);
    }

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
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ 
        zIndex: -3,
        opacity: 0.4
      }}
    />
  );
};

export default AnimatedGradient;
