import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Github,
  ExternalLink,
  Code,
  Database,
  Globe,
  Layers,
  Monitor,
  Shield,
  Users,
  X,
  Play,
} from "lucide-react";
import { useInView } from "react-intersection-observer";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo: string;
  videoUrl?: string;
  category: "web" | "ai" | "fullstack" | "healthcare";
  featured: boolean;
  icon: "code" | "database" | "globe" | "layers" | "monitor" | "shield" | "users";
}

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<
    "all" | "web" | "ai" | "fullstack" | "healthcare"
  >("all");
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    // Projets d'Abdoulaye LAH
    const projectsData: Project[] = [
      {
        id: 1,
        title: "Application RTS - Simulateur Réseaux Télécoms 3D",
        description:
          "Simulateur 3D pour les réseaux de télécommunications avec visualisation interactive des infrastructures et des flux de données.",
        image: "/Portfolio.png",
        tags: ["Java", "JavaFX", "3D Graphics", "Telecom", "Simulation"],
        github: "https://github.com/abdoulayelah/rts-simulator",
        demo: "#",
        videoUrl: "https://www.youtube.com/embed/nQ6f6lnmG_g",
        category: "fullstack",
        featured: true,
        icon: "monitor",
      },
      {
        id: 2,
        title: "MediConnect - Web médical & Intégration IA",
        description:
          "Plateforme web médicale avec intégration d'intelligence artificielle pour l'aide au diagnostic et la gestion des dossiers patients.",
        image: "/Portfolio.png",
        tags: ["React", "Node.js", "Python", "AI/ML", "Healthcare", "MongoDB"],
        github: "https://github.com/abdoulayelah/mediconnect",
        demo: "#",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Remplacez par votre vraie URL
        category: "healthcare",
        featured: true,
        icon: "users",
      },
      {
        id: 3,
        title: "Application IA Détecteur de Fake News FR/EN",
        description:
          "Système d'intelligence artificielle pour détecter les fausses nouvelles en français et en anglais avec analyse de contenu automatisée.",
        image: "/Portfolio.png",
        tags: ["Python", "TensorFlow", "NLP", "Machine Learning", "Flask"],
        github: "https://github.com/abdoulayelah/fake-news-detector",
        demo: "#",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Remplacez par votre vraie URL
        category: "ai",
        featured: false,
        icon: "shield",
      },
      {
        id: 4,
        title: "Application IA Analyseur de Sentiment",
        description:
          "Analyseur de sentiment utilisant l'IA pour évaluer les émotions dans les textes et les commentaires en temps réel.",
        image: "/Portfolio.png",
        tags: ["Python", "Scikit-learn", "NLTK", "Streamlit", "AI"],
        github: "https://github.com/abdoulayelah/sentiment-analyzer",
        demo: "#",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Remplacez par votre vraie URL
        category: "ai",
        featured: false,
        icon: "database",
      },
      {
        id: 5,
        title: "Comptel - App Comptabilité pour Blanchisserie",
        description:
          "Application de gestion comptable spécialisée pour les blanchisseries avec suivi des transactions et génération de rapports.",
        image: "/Portfolio.png",
        tags: ["PHP", "MySQL", "Bootstrap", "JavaScript", "Accounting"],
        github: "https://github.com/abdoulayelah/comptel",
        demo: "#",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Remplacez par votre vraie URL
        category: "web",
        featured: false,
        icon: "code",
      },
      {
        id: 6,
        title: "Clone WhatsApp Web en PHP & XML",
        description:
          "Clone fonctionnel de WhatsApp Web développé en PHP avec stockage XML, incluant messagerie instantanée et gestion des contacts.",
        image: "/Portfolio.png",
        tags: ["PHP", "XML", "JavaScript", "CSS", "Real-time"],
        github: "https://github.com/abdoulayelah/whatsapp-clone",
        demo: "#",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Remplacez par votre vraie URL
        category: "web",
        featured: false,
        icon: "globe",
      },
      {
        id: 7,
        title: "App Gestion Formations - Mansa Moussa School",
        description:
          "Système de gestion des formations pour l'école Mansa Moussa avec suivi des étudiants, planning et évaluations.",
        image: "/Portfolio.png",
        tags: ["Java", "Spring Boot", "MySQL", "Thymeleaf", "Education"],
        github: "https://github.com/abdoulayelah/mansa-moussa-school",
        demo: "#",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Remplacez par votre vraie URL
        category: "fullstack",
        featured: false,
        icon: "layers",
      },
      {
        id: 8,
        title: "Plateforme d'Actualité - Spring/JavaFX",
        description:
          "Plateforme d'actualités avec interface JavaFX et backend Spring, incluant gestion des articles et système de commentaires.",
        image: "/Portfolio.png",
        tags: ["Java", "Spring", "JavaFX", "MySQL", "News"],
        github: "https://github.com/abdoulayelah/news-platform",
        demo: "#",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Remplacez par votre vraie URL
        category: "fullstack",
        featured: false,
        icon: "monitor",
      },
      {
        id: 9,
        title: "Labyrinthe - BFS & DFS en JavaFX",
        description:
          "Application de résolution de labyrinthes utilisant les algorithmes BFS et DFS avec visualisation interactive en JavaFX.",
        image: "/Portfolio.png",
        tags: ["Java", "JavaFX", "Algorithms", "BFS", "DFS", "Graphics"],
        github: "https://github.com/abdoulayelah/maze-solver",
        demo: "#",
        videoUrl: "https://www.youtube.com/embed/vSBZF3GIaic",
        category: "fullstack",
        featured: false,
        icon: "code",
      },
      {
        id: 10,
        title: "Auto-évaluation IA pour Étudiants",
        description:
          "Système d'auto-évaluation basé sur l'IA pour aider les étudiants à évaluer leurs connaissances et progresser.",
        image: "/Portfolio.png",
        tags: ["Python", "AI", "Education", "Flask", "Machine Learning"],
        github: "https://github.com/abdoulayelah/ai-self-assessment",
        demo: "#",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Remplacez par votre vraie URL
        category: "ai",
        featured: false,
        icon: "users",
      },
    ];

    setProjects(projectsData);
    setFilteredProjects(projectsData);

    // GSAP animations
    gsap.fromTo(
      ".projects-title",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    // Play a subtle click sound when page loads
    const audio = new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-tech-click-1140.mp3"
    );
    audio.volume = 0.1;
    audio.play().catch((e) => console.log("Audio play prevented:", e));

    return () => {
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.category === activeFilter)
      );
    }
  }, [activeFilter, projects]);

  const handleFilterClick = (filter: "all" | "web" | "ai" | "fullstack" | "healthcare") => {
    // Play click sound
    const audio = new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-modern-technology-select-2866.mp3"
    );
    audio.volume = 0.1;
    audio.play().catch((e) => console.log("Audio play prevented:", e));

    setActiveFilter(filter);
  };

  const openProjectDetails = (project: Project) => {
    // Play click sound
    const audio = new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-tech-click-1140.mp3"
    );
    audio.volume = 0.1;
    audio.play().catch((e) => console.log("Audio play prevented:", e));

    setSelectedProject(project);
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
    setShowVideo(false);
  };

  const openVideo = () => {
    setShowVideo(true);
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "code":
        return <Code className="text-primary" size={24} />;
      case "database":
        return <Database className="text-neon-green" size={24} />;
      case "globe":
        return <Globe className="text-neon-pink" size={24} />;
      case "layers":
        return <Layers className="text-neon-purple" size={24} />;
      case "monitor":
        return <Monitor className="text-neon-yellow" size={24} />;
      case "shield":
        return <Shield className="text-neon-blue" size={24} />;
      case "users":
        return <Users className="text-primary" size={24} />;
      default:
        return <Code className="text-primary" size={24} />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "web":
        return "Web";
      case "ai":
        return "IA";
      case "fullstack":
        return "Full Stack";
      case "healthcare":
        return "Santé";
      default:
        return category;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 pb-20"
    >
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="projects-title text-4xl md:text-5xl font-bold mb-8 font-cyber text-center">
              <span className="text-primary">&lt;</span> Mes Projets{" "}
              <span className="text-primary">/&gt;</span>
            </h1>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button
                onClick={() => handleFilterClick("all")}
                className={`px-6 py-2 rounded-md font-cyber text-sm transition-all duration-300 ${
                  activeFilter === "all"
                    ? "bg-primary text-white shadow-[0_0_10px_rgba(138,43,226,0.7)]"
                    : "bg-dark-lighter text-gray-300 hover:bg-dark-light"
                }`}
              >
                Tous
              </button>
              <button
                onClick={() => handleFilterClick("web")}
                className={`px-6 py-2 rounded-md font-cyber text-sm transition-all duration-300 ${
                  activeFilter === "web"
                    ? "bg-primary text-white shadow-[0_0_10px_rgba(138,43,226,0.7)]"
                    : "bg-dark-lighter text-gray-300 hover:bg-dark-light"
                }`}
              >
                Web
              </button>
              <button
                onClick={() => handleFilterClick("ai")}
                className={`px-6 py-2 rounded-md font-cyber text-sm transition-all duration-300 ${
                  activeFilter === "ai"
                    ? "bg-primary text-white shadow-[0_0_10px_rgba(138,43,226,0.7)]"
                    : "bg-dark-lighter text-gray-300 hover:bg-dark-light"
                }`}
              >
                IA
              </button>
              <button
                onClick={() => handleFilterClick("fullstack")}
                className={`px-6 py-2 rounded-md font-cyber text-sm transition-all duration-300 ${
                  activeFilter === "fullstack"
                    ? "bg-primary text-white shadow-[0_0_10px_rgba(138,43,226,0.7)]"
                    : "bg-dark-lighter text-gray-300 hover:bg-dark-light"
                }`}
              >
                Full Stack
              </button>
              <button
                onClick={() => handleFilterClick("healthcare")}
                className={`px-6 py-2 rounded-md font-cyber text-sm transition-all duration-300 ${
                  activeFilter === "healthcare"
                    ? "bg-primary text-white shadow-[0_0_10px_rgba(138,43,226,0.7)]"
                    : "bg-dark-lighter text-gray-300 hover:bg-dark-light"
                }`}
              >
                Santé
              </button>
            </div>

            {/* Projects Grid */}
            <div
              ref={ref}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                  className="card-cyber parallax-3d overflow-hidden cursor-pointer group"
                  onClick={() => openProjectDetails(project)}
                >
                  <div className="relative h-48 overflow-hidden parallax-card">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-70"></div>
                    {project.featured && (
                      <div className="absolute top-3 right-3 bg-primary/80 text-white text-xs font-cyber px-2 py-1 rounded">
                        Featured
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 flex space-x-2">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="bg-dark-lighter/80 backdrop-blur-sm text-white text-xs font-cyber px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="bg-dark-lighter/80 backdrop-blur-sm text-white text-xs font-cyber px-2 py-1 rounded">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center mb-3">
                      <div className="mr-3">
                        {getIconComponent(project.icon)}
                      </div>
                      <h3 className="text-xl font-bold font-cyber text-white">
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-primary font-cyber uppercase">
                        {getCategoryLabel(project.category)}
                      </span>
                      <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-primary transition-colors duration-300"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={18} />
                        </a>
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-neon-blue transition-colors duration-300"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={18} />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 font-cyber">
                  Aucun projet trouvé dans cette catégorie.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Project Details Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/80 backdrop-blur-md"
          onClick={closeProjectDetails}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-dark-lighter border border-primary/30 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-70"></div>
              <button
                onClick={closeProjectDetails}
                className="absolute top-4 right-4 bg-dark/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-primary transition-colors duration-300"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="mr-3">
                  {getIconComponent(selectedProject.icon)}
                </div>
                <h2 className="text-2xl font-bold font-cyber text-white">
                  {selectedProject.title}
                </h2>
              </div>

              <p className="text-gray-300 mb-6">
                {selectedProject.description}
              </p>

              <div className="mb-6">
                <h3 className="text-lg font-cyber mb-3 text-primary">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-dark px-3 py-1 rounded-full text-sm text-gray-300 border border-primary/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cyber group flex-1 flex justify-center"
                >
                  <span className="relative z-10 flex items-center">
                    Code Source
                    <Github
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                      size={18}
                    />
                  </span>
                </a>
                {selectedProject.videoUrl && (
                  <button
                    onClick={openVideo}
                    className="btn-cyber group flex-1 flex justify-center border-neon-green"
                  >
                    <span className="relative z-10 flex items-center">
                      Voir la Démo
                      <Play
                        className="ml-2 group-hover:translate-x-1 transition-transform"
                        size={18}
                      />
                    </span>
                  </button>
                )}
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cyber group flex-1 flex justify-center border-neon-blue"
                >
                  <span className="relative z-10 flex items-center">
                    Démo Live
                    <ExternalLink
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                      size={18}
                    />
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Video Modal */}
      {showVideo && selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/90 backdrop-blur-md"
          onClick={closeProjectDetails}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeProjectDetails}
              className="absolute -top-12 right-0 bg-dark/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-primary transition-colors duration-300 z-10"
            >
              <X size={20} />
            </button>
            <div className="relative w-full h-0 pb-[56.25%]">
              <iframe
                src={selectedProject.videoUrl}
                title={selectedProject.title}
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Projects;
