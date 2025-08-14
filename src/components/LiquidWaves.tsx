import React, { useEffect, useRef } from 'react';

interface LiquidWavesProps {
  className?: string;
}

const LiquidWaves: React.FC<LiquidWavesProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Wave configuration
    const waves = [
      {
        amplitude: 50,
        frequency: 0.02,
        speed: 0.05,
        color: 'rgba(0, 255, 255, 0.3)',
        offset: 0,
        y: canvas.height * 0.7
      },
      {
        amplitude: 30,
        frequency: 0.03,
        speed: 0.03,
        color: 'rgba(255, 0, 255, 0.2)',
        offset: 0,
        y: canvas.height * 0.8
      },
      {
        amplitude: 40,
        frequency: 0.025,
        speed: 0.04,
        color: 'rgba(0, 255, 0, 0.15)',
        offset: 0,
        y: canvas.height * 0.9
      }
    ];

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      waves.forEach((wave, index) => {
        // Update wave offset
        wave.offset += wave.speed;

        // Calculate mouse influence
        const mouseInfluence = Math.max(0, 1 - Math.abs(mouseRef.current.y - wave.y) / 200);
        const mouseAmplitude = mouseInfluence * 100;

        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        // Draw wave path
        for (let x = 0; x <= canvas.width; x += 2) {
          const distanceFromMouse = Math.abs(x - mouseRef.current.x);
          const mouseEffect = Math.max(0, 1 - distanceFromMouse / 300) * mouseAmplitude;
          
          const waveHeight = Math.sin(x * wave.frequency + wave.offset) * (wave.amplitude + mouseEffect);
          const y = wave.y + waveHeight;
          
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();

        // Create gradient
        const gradient = ctx.createLinearGradient(0, wave.y - wave.amplitude, 0, canvas.height);
        gradient.addColorStop(0, wave.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.fill();

        // Add glow effect
        ctx.shadowColor = wave.color;
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Add floating particles
      for (let i = 0; i < 20; i++) {
        const x = (i * 100 + waves[0].offset * 50) % canvas.width;
        const y = canvas.height * 0.6 + Math.sin(i + waves[0].offset) * 50;
        
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 255, ${0.3 + Math.sin(waves[0].offset + i) * 0.2})`;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-[-4] ${className}`}
      style={{ opacity: 0.6 }}
    />
  );
};

export default LiquidWaves;
