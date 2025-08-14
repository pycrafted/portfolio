import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    const drops: number[] = [];
    const speeds: number[] = [];
    const colors: string[] = [];
    
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * canvas.height);
      speeds[i] = 0.5 + Math.random() * 1.5;
      colors[i] = '#8A2BE2';
    }

    const matrix = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const particles: Particle[] = [];

    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => {
      setIsMouseDown(true);
      // Create explosion particles
      for (let i = 0; i < 20; i++) {
        particles.push({
          x: mousePos.x,
          y: mousePos.y,
          vx: (Math.random() - 0.5) * 10,
          vy: (Math.random() - 0.5) * 10,
          life: 1,
          maxLife: 1,
          color: ['#8A2BE2', '#FF00FF', '#00FFFF', '#39FF14'][Math.floor(Math.random() * 4)]
        });
      }
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);

    function draw() {
      // Clear with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw matrix rain
      for (let i = 0; i < drops.length; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        // Calculate distance from mouse
        const distance = Math.sqrt((x - mousePos.x) ** 2 + (y - mousePos.y) ** 2);
        const maxDistance = 150;
        
        // Adjust color and speed based on mouse proximity
        let intensity = 1;
        if (distance < maxDistance) {
          intensity = 1 - (distance / maxDistance);
          speeds[i] = 0.5 + intensity * 2;
          
          // Change color based on proximity
          if (intensity > 0.8) {
            colors[i] = '#FF00FF';
          } else if (intensity > 0.6) {
            colors[i] = '#00FFFF';
          } else if (intensity > 0.4) {
            colors[i] = '#39FF14';
          } else {
            colors[i] = '#8A2BE2';
          }
        } else {
          colors[i] = '#8A2BE2';
          speeds[i] = 0.5 + Math.random() * 1.5;
        }

        // Draw character with glow effect
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.font = `${fontSize}px monospace`;
        
        // Glow effect
        ctx.shadowBlur = intensity * 15;
        ctx.shadowColor = colors[i];
        ctx.fillStyle = colors[i];
        ctx.fillText(text, x, y);
        
        // Reset shadow
        ctx.shadowBlur = 0;
        
        // Update drop position
        drops[i] += speeds[i] * 0.1;
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        
        // Update particle
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.02;
        
        // Draw particle
        if (particle.life > 0) {
          ctx.globalAlpha = particle.life;
          ctx.fillStyle = particle.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          particles.splice(i, 1);
        }
      }
      
      ctx.globalAlpha = 1;

      // Mouse trail effect
      if (isMouseDown) {
        ctx.fillStyle = '#FF00FF';
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#FF00FF';
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, 30, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const interval = setInterval(draw, 16); // 60fps
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mousePos, isMouseDown]);

  return (
    <canvas 
      ref={canvasRef} 
      className="matrix-bg cursor-none" 
      style={{ 
        opacity: 0.2,
        zIndex: -1
      }} 
    />
  );
};

export default MatrixRain;