import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Cpu, Presentation } from "lucide-react";

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  onPresentationMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onPresentationMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Play click sound
    const audio = new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-modern-technology-select-2866.mp3"
    );
    audio.volume = 0.1;
    audio.play().catch((e) => console.log("Audio play prevented:", e));
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Accueil", path: "/" },
    { name: "À Propos", path: "/about" },
    { name: "Projets", path: "/projects" },
    { name: "Compétences", path: "/skills" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-dark/80 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Cpu className="text-primary h-8 w-8" />
            <span className="font-cyber text-xl text-white neon-text">
              Abdoulaye <span className="text-primary">lah</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-cyber text-sm uppercase tracking-wider transition-all duration-300 hover:text-primary ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Presentation Mode Button */}
            <button
              onClick={onPresentationMode}
              className="btn-cyber group flex items-center space-x-2 px-4 py-2"
            >
              <Presentation size={16} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm font-cyber">Présentation</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={onPresentationMode}
              className="p-2 mr-2 rounded-full hover:bg-primary/20 transition-colors duration-300"
              aria-label="Presentation Mode"
            >
              <Presentation className="h-5 w-5 text-primary" />
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-dark-light transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-primary" />
              ) : (
                <Menu className="h-6 w-6 text-primary" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-dark-lighter/90 backdrop-blur-md"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-cyber text-sm uppercase tracking-wider transition-all duration-300 hover:text-primary ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
