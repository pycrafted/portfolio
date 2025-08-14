/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'cyber': ['Orbitron', 'monospace'],
      },
      colors: {
        'primary': '#00ffff',
        'secondary': '#ff00ff',
        'neon-blue': '#00bfff',
        'neon-pink': '#ff69b4',
        'neon-yellow': '#ffff00',
        'neon-green': '#00ff00',
        'dark': '#0a0a0a',
        'dark-lighter': '#1a1a1a',
      },
      animation: {
        'particle-float': 'particle-float 6s ease-in-out infinite',
        'liquid-flow': 'liquid-flow 8s ease-in-out infinite',
        'holographic-sweep': 'holographic-sweep 3s ease-in-out infinite',
        'holographic-scan': 'holographic-scan 2s ease-in-out infinite',
        'holographic-pulse': 'holographic-pulse 4s ease-in-out infinite',
        'wave-ripple': 'wave-ripple-animation 2s ease-out infinite',
        'glitch': 'glitch 0.3s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'matrix': 'matrix 2s linear infinite',
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
      },
      keyframes: {
        'particle-float': {
          '0%, 100%': {
            transform: 'translateY(0px) rotate(0deg)',
            opacity: '0',
          },
          '50%': {
            transform: 'translateY(-20px) rotate(180deg)',
            opacity: '1',
          },
        },
        'liquid-flow': {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
        },
        'holographic-sweep': {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
        },
        'holographic-scan': {
          '0%': {
            left: '-100%',
          },
          '100%': {
            left: '100%',
          },
        },
        'holographic-pulse': {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
            transform: 'scale(1)',
          },
          '50%': {
            backgroundPosition: '100% 50%',
            transform: 'scale(1.02)',
          },
        },
        'wave-ripple-animation': {
          '0%': {
            width: '0',
            height: '0',
            opacity: '1',
          },
          '100%': {
            width: '200px',
            height: '200px',
            opacity: '0',
          },
        },
        'glitch': {
          '0%, 100%': {
            transform: 'translate(0)',
          },
          '20%': {
            transform: 'translate(-2px, 2px)',
          },
          '40%': {
            transform: 'translate(-2px, -2px)',
          },
          '60%': {
            transform: 'translate(2px, 2px)',
          },
          '80%': {
            transform: 'translate(2px, -2px)',
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        'matrix': {
          '0%': {
            transform: 'translateY(-100%)',
            opacity: '0',
          },
          '10%': {
            opacity: '1',
          },
          '90%': {
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(100vh)',
            opacity: '0',
          },
        },
        'pulse-neon': {
          '0%, 100%': {
            boxShadow: '0 0 5px var(--primary), 0 0 10px var(--primary), 0 0 15px var(--primary)',
          },
          '50%': {
            boxShadow: '0 0 10px var(--primary), 0 0 20px var(--primary), 0 0 30px var(--primary)',
          },
        },
      },
    },
  },
  plugins: [],
}
