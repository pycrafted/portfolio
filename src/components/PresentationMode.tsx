import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, SkipBack, SkipForward, Clock, Volume2, VolumeX } from 'lucide-react';
import Home from '../pages/Home';
import About from '../pages/About';
import Projects from '../pages/Projects';
import Skills from '../pages/Skills';
import Contact from '../pages/Contact';

interface PresentationModeProps {
  isActive: boolean;
  onClose: () => void;
  currentSection: number;
  onSectionChange: (section: number) => void;
}

const PresentationMode: React.FC<PresentationModeProps> = ({
  isActive,
  onClose,
  currentSection,
  onSectionChange
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes
  const [showControls, setShowControls] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [autoStarted, setAutoStarted] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);
  const [currentUtterance, setCurrentUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const sections = [
    { 
      name: 'Accueil', 
      path: '/', 
      component: Home,
      script: "Bonjour et bienvenue sur mon portfolio ! Je suis un développeur passionné par la création d'applications web et mobiles innovantes. J'aime transformer des idées créatives en solutions numériques qui font la différence."
    },
    { 
      name: 'À Propos', 
      path: '/about', 
      component: About,
      script: "Laissez-moi vous présenter mon parcours professionnel et mes compétences en développement. J'ai une passion pour l'innovation technologique et j'adore transformer des concepts en réalité tangible. Mon approche combine créativité et rigueur technique."
    },
    { 
      name: 'Projets', 
      path: '/projects', 
      component: Projects,
      script: "Découvrez mes projets les plus significatifs, du concept initial jusqu'à la réalisation complète. Chaque projet raconte une histoire unique et représente une étape importante de mon évolution professionnelle. J'ai mis un point d'honneur à créer des solutions innovantes et performantes."
    },
    { 
      name: 'Compétences', 
      path: '/skills', 
      component: Skills,
      script: "Voici un aperçu de mes compétences techniques, couvrant le développement front-end et back-end. Je maîtrise les technologies modernes et j'aime constamment apprendre de nouveaux outils et frameworks pour rester à la pointe de l'innovation."
    },
    { 
      name: 'Contact', 
      path: '/contact', 
      component: Contact,
      script: "Envie de collaborer sur un projet passionnant ? N'hésitez pas à me contacter. J'adorerais discuter de vos idées et voir comment nous pourrions travailler ensemble pour créer quelque chose d'extraordinaire."
    }
  ];

  const sectionDuration = 24; // 24 seconds per section (120 seconds / 5 sections)

  useEffect(() => {
    if (isActive && isPlaying) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Instead of closing, restart the presentation
            setTimeRemaining(120);
            onSectionChange(0);
            return 120;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, isPlaying, onClose, onSectionChange]);

  // Initialize speech synthesis
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      setSpeechSynthesis(synth);
      
      // Wait for voices to load
      const loadVoices = () => {
        const voices = synth.getVoices();
        if (voices.length > 0) {
          console.log('Available voices:', voices.map(v => v.name));
          // If presentation is active and we haven't started speaking yet, start now
          if (isActive && autoStarted && currentSection === 0) {
            setTimeout(() => speakSection(0), 500);
          }
        }
      };
      
      if (synth.getVoices().length > 0) {
        loadVoices();
      } else {
        synth.addEventListener('voiceschanged', loadVoices);
        return () => synth.removeEventListener('voiceschanged', loadVoices);
      }
    }
  }, [isActive, autoStarted, currentSection]);

  // Function to speak the current section
  const speakSection = (sectionIndex: number) => {
    console.log('Attempting to speak section:', sectionIndex);
    
    if (!speechSynthesis) {
      console.log('Speech synthesis not available');
      return;
    }
    
    if (isMuted) {
      console.log('Speech is muted');
      return;
    }
    
    // Stop any current speech
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(sections[sectionIndex].script);
    
    // Configure voice settings for a more natural female voice
    utterance.rate = 0.8; // Slower for more natural pace and French pronunciation
    utterance.pitch = 1.02; // Slightly higher but not too much
    utterance.volume = 0.9; // Good volume
    utterance.lang = 'fr-FR'; // Force French language
    
    // Try to find the best available voice
    const voices = speechSynthesis.getVoices();
    console.log('Available voices:', voices.map(v => `${v.name} (${v.lang})`));
    
    // Priority order for better voice quality - FORCE FRENCH
    const preferredVoice = voices.find(voice => 
      voice.lang.includes('fr') && voice.name.toLowerCase().includes('female')
    ) || voices.find(voice => 
      voice.lang.includes('fr-FR') && voice.name.toLowerCase().includes('female')
    ) || voices.find(voice => 
      voice.lang.includes('fr-CA') && voice.name.toLowerCase().includes('female')
    ) || voices.find(voice => 
      voice.lang.includes('fr')
    ) || voices.find(voice => 
      voice.lang.includes('fr-FR')
    ) || voices.find(voice => 
      voice.lang.includes('fr-CA')
    ) || voices.find(voice => 
      voice.name.toLowerCase().includes('siri') && voice.lang.includes('fr')
    ) || voices.find(voice => 
      voice.name.toLowerCase().includes('alexa') && voice.lang.includes('fr')
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
      console.log('Using voice:', preferredVoice.name, 'with lang:', preferredVoice.lang);
    } else {
      console.log('No French voice found, using default');
    }
    
    // Add slight pauses for more natural speech
    const textWithPauses = sections[sectionIndex].script
      .replace(/\./g, '... ')
      .replace(/,/g, ', ')
      .replace(/:/g, ': ');
    
    utterance.text = textWithPauses;
    
    // Add event listeners for debugging
    utterance.onstart = () => console.log('Speech started for section:', sectionIndex);
    utterance.onend = () => console.log('Speech ended for section:', sectionIndex);
    utterance.onerror = (event) => console.error('Speech error:', event.error);
    
    setCurrentUtterance(utterance);
    speechSynthesis.speak(utterance);
  };

  // Auto-start presentation when mode is activated
  useEffect(() => {
    if (isActive && !autoStarted) {
      setAutoStarted(true);
      setIsPlaying(true);
      setTimeRemaining(120);
      // Start speaking the first section with a longer delay to ensure voices are loaded
      setTimeout(() => {
        if (speechSynthesis) {
          speakSection(0);
        } else {
          // If speechSynthesis is not ready, try again after a short delay
          setTimeout(() => speakSection(0), 1000);
        }
      }, 1000);
    }
  }, [isActive, autoStarted, speechSynthesis]);

  useEffect(() => {
    if (isActive) {
      const handleKeyPress = (e: KeyboardEvent) => {
        switch (e.key) {
          case 'Escape':
            onClose();
            break;
          case ' ':
            e.preventDefault();
            setIsPlaying(!isPlaying);
            break;
          case 'ArrowLeft':
            e.preventDefault();
            onSectionChange(Math.max(0, currentSection - 1));
            break;
          case 'ArrowRight':
            e.preventDefault();
            onSectionChange(Math.min(sections.length - 1, currentSection + 1));
            break;
          case 'Home':
            e.preventDefault();
            onSectionChange(0);
            break;
          case 'End':
            e.preventDefault();
            onSectionChange(sections.length - 1);
            break;
        }
      };

      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [isActive, isPlaying, currentSection, onSectionChange, onClose, sections.length]);

  useEffect(() => {
    if (isActive && isPlaying) {
      // Auto-advance sections like a video
      const sectionTimer = setTimeout(() => {
        if (currentSection < sections.length - 1) {
          onSectionChange(currentSection + 1);
        } else {
          // If we're at the last section, restart from beginning
          onSectionChange(0);
        }
      }, sectionDuration * 1000);

      return () => clearTimeout(sectionTimer);
    }
  }, [isActive, isPlaying, currentSection, onSectionChange, sections.length]);

  // Speak when section changes
  useEffect(() => {
    if (isActive && isPlaying) {
      speakSection(currentSection);
    }
  }, [currentSection, isActive, isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((120 - timeRemaining) / 120) * 100;

  if (!isActive) return null;

  const CurrentComponent = sections[currentSection].component;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black z-50 flex flex-col"
      >
        {/* Header */}
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="bg-dark-lighter/90 backdrop-blur-md border-b border-primary/30 p-4 z-10"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-cyber text-white">
                Mode Présentation - {sections[currentSection].name}
              </h1>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Clock size={16} />
                <span>{formatTime(timeRemaining)}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Progress Bar */}
              <div className="w-32 h-2 bg-dark rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1 }}
                />
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onSectionChange(Math.max(0, currentSection - 1))}
                  className="p-2 rounded-full hover:bg-primary/20 transition-colors"
                  disabled={currentSection === 0}
                >
                  <SkipBack size={16} className="text-white" />
                </button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-full hover:bg-primary/20 transition-colors"
                >
                  {isPlaying ? <Pause size={16} className="text-white" /> : <Play size={16} className="text-white" />}
                </button>

                <button
                  onClick={() => onSectionChange(Math.min(sections.length - 1, currentSection + 1))}
                  className="p-2 rounded-full hover:bg-primary/20 transition-colors"
                  disabled={currentSection === sections.length - 1}
                >
                  <SkipForward size={16} className="text-white" />
                </button>

                <button
                  onClick={() => {
                    setIsMuted(!isMuted);
                    if (speechSynthesis) {
                      if (!isMuted) {
                        speechSynthesis.cancel(); // Stop current speech
                      } else {
                        speakSection(currentSection); // Resume speech
                      }
                    }
                  }}
                  className="p-2 rounded-full hover:bg-primary/20 transition-colors"
                >
                  {isMuted ? <VolumeX size={16} className="text-white" /> : <Volume2 size={16} className="text-white" />}
                </button>

                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-red-500/20 transition-colors"
                >
                  <X size={16} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="h-full overflow-y-auto"
              style={{ paddingTop: '80px' }} // Account for header
            >
              {currentSection === 1 ? (
                <About isPresentationMode={true} />
              ) : (
                <CurrentComponent />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {sections.map((_, index) => (
            <button
              key={index}
              onClick={() => onSectionChange(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSection
                  ? 'bg-primary scale-125'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* Keyboard Shortcuts Help */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 50 }}
          className="absolute bottom-4 right-4 bg-dark-lighter/90 backdrop-blur-md rounded-lg p-3 text-xs text-gray-400 z-20"
        >
          <div className="space-y-1">
            <div>← → : Navigation</div>
            <div>Espace : Pause/Play</div>
            <div>Échap : Quitter</div>
          </div>
        </motion.div>

        {/* Section Indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          key={currentSection}
          className="absolute top-20 left-4 bg-primary/20 backdrop-blur-md rounded-lg p-3 z-20"
        >
          <div className="text-sm font-cyber text-primary">
            {currentSection + 1} / {sections.length}
          </div>
          <div className="text-xs text-gray-400">
            {sections[currentSection].name}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PresentationMode;
