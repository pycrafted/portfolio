/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Active le mode sombre via la classe "dark"
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#8A2BE2", // Violet principal
          dark: "#6A1CB2", // Version foncée
          light: "#9D4EFF", // Version claire
        },
        secondary: {
          DEFAULT: "#FF00FF", // Magenta
          dark: "#CC00CC",
          light: "#FF33FF",
        },
        neon: {
          green: "#39FF14",
          blue: "#00FFFF",
          pink: "#FF10F0",
          purple: "#B026FF",
          yellow: "#FFFF00",
        },
        dark: {
          DEFAULT: "#121212", // Fond sombre amélioré pour un meilleur contraste
          lighter: "#1E1E1E", // Gris très foncé, mais lisible
          light: "#2C2C2C", // Gris plus clair pour le mode dark
        },
        light: {
          DEFAULT: "#F8F9FA", // Fond clair amélioré (blanc cassé)
          dark: "#E0E0E0", // Gris clair pour les contrastes
          darker: "#CFCFCF", // Gris plus foncé
        },
        text: {
          light: "#000000", // Texte noir pour le mode clair
          dark: "#FFFFFF", // Texte blanc pour le mode sombre
        },
      },
      fontFamily: {
        cyber: ["Share Tech Mono", "monospace"],
        sans: ["Rajdhani", "sans-serif"],
      },
      animation: {
        glitch: "glitch 1s linear infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        float: "float 6s ease-in-out infinite",
        matrix: "matrix 20s linear infinite",
        pulseNeon: "pulseNeon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-5px, 5px)" },
          "40%": { transform: "translate(-5px, -5px)" },
          "60%": { transform: "translate(5px, 5px)" },
          "80%": { transform: "translate(5px, -5px)" },
        },
        glow: {
          "0%": {
            textShadow:
              "0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #8A2BE2, 0 0 20px #8A2BE2",
          },
          "100%": {
            textShadow:
              "0 0 10px #FFF, 0 0 20px #FFF, 0 0 30px #8A2BE2, 0 0 40px #8A2BE2",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        matrix: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-10000px)" },
        },
        pulseNeon: {
          "0%, 100%": {
            opacity: 1,
            boxShadow: "0 0 10px #8A2BE2, 0 0 20px #8A2BE2, 0 0 30px #8A2BE2",
          },
          "50%": {
            opacity: 0.7,
            boxShadow: "0 0 5px #8A2BE2, 0 0 10px #8A2BE2, 0 0 15px #8A2BE2",
          },
        },
      },
    },
  },
  plugins: [],
};
