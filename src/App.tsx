import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";
import CustomCursor from "./components/CustomCursor";
import ParticlesBackground from "./components/ParticlesBackground";
import AnimatedGradient from "./components/AnimatedGradient";
import LiquidWaves from "./components/LiquidWaves";
// import MatrixRain from "./components/MatrixRain";
import PresentationMode from "./components/PresentationMode";

function App() {
  const [presentationMode, setPresentationMode] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const sections = [
    { name: 'Accueil', path: '/' },
    { name: 'À Propos', path: '/about' },
    { name: 'Projets', path: '/projects' },
    { name: 'Compétences', path: '/skills' },
    { name: 'Contact', path: '/contact' }
  ];

  const handlePresentationMode = () => {
    setPresentationMode(true);
    setCurrentSection(0);
    navigate('/');
  };

  const handleClosePresentation = () => {
    setPresentationMode(false);
  };

  const handleSectionChange = (section: number) => {
    setCurrentSection(section);
    navigate(sections[section].path);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="App" style={{ backgroundColor: 'transparent' }}>
      {/* Background Effects */}
      <AnimatedGradient />
      <ParticlesBackground />
      <LiquidWaves />
      {/* <MatrixRain /> */}
      <CustomCursor />

      {/* Presentation Mode */}
      {presentationMode && (
        <PresentationMode
          isActive={presentationMode}
          onClose={handleClosePresentation}
          currentSection={currentSection}
          onSectionChange={handleSectionChange}
        />
      )}

      {/* Main Content */}
      {!presentationMode && (
        <Navbar 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
          onPresentationMode={handlePresentationMode} 
        />
      )}
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {!presentationMode && <Footer />}
    </div>
  );
}

export default App;
