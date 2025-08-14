import { useEffect } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowDown, Code, Database, Shield, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

const Home = () => {
  useEffect(() => {
    // GSAP animation for the hero section
    gsap.fromTo(
      ".hero-content",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.2 }
    );

    // Play a subtle ambient sound
    const audio = new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-futuristic-technological-ambience-2534.mp3"
    );
    audio.volume = 0.05;
    audio.loop = true;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((e) => console.log("Audio play prevented:", e));
    }

    return () => {
      audio.pause();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20"
    >
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="hero-content mb-6"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 font-cyber">
                <span className="text-white">Ingénieur</span>{" "}
                <span className="text-primary animate-glow">Logiciel</span> &{" "}
                <span className="text-neon-blue animate-glow">Développeur Web</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hero-content mb-8"
            >
              <div className="font-cyber text-xl md:text-2xl text-gray-300 mb-8">
                <TypeAnimation
                  sequence={[
                    "Je construis des solutions robustes et élégantes.",
                    2000,
                    "Je développe des applications sécurisées et performantes.",
                    2000,
                    "Je transforme les défis en opportunités d'innovation.",
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="text-neon-green"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="hero-content flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link to="/projects" className="btn-cyber group">
                <span className="relative z-10 flex items-center">
                  Voir mes projets
                  <Code
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                    size={18}
                  />
                </span>
              </Link>
              <Link to="/contact" className="btn-cyber group">
                <span className="relative z-10 flex items-center">
                  Me contacter
                  <Zap
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                    size={18}
                  />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white"
        >
          <ArrowDown className="animate-bounce" />
        </motion.div>
      </section>

      {/* Featured Section */}
      <section className="py-20 backdrop-blur-sm liquid-bg" style={{ backgroundColor: 'rgba(30, 30, 30, 0.3)' }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-cyber text-white">
              <span className="text-primary">&lt;</span> Expertise{" "}
              <span className="text-primary">/&gt;</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="card-cyber p-6"
            >
              <div className="text-primary mb-4">
                <Code size={40} />
              </div>
              <h3 className="text-xl font-bold mb-2 font-cyber">
                Développement Web
              </h3>
              <p className="text-gray-400">
                Conception et développement d'applications web sur mesure avec architecture microservices, 
                clean code et bonnes pratiques de développement.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="card-cyber p-6"
            >
              <div className="text-neon-blue mb-4">
                <Database size={40} />
              </div>
              <h3 className="text-xl font-bold mb-2 font-cyber">
                Architecture & DevOps
              </h3>
              <p className="text-gray-400">
                Architecture logicielle UML & Mérise, DevOps avec Docker, CI/CD (GitHub Actions, GitLab CI), 
                et respect des normes ITIL.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="card-cyber p-6"
            >
              <div className="text-neon-yellow mb-4">
                <Shield size={40} />
              </div>
              <h3 className="text-xl font-bold mb-2 font-cyber">
                Sécurité & Tests
              </h3>
              <p className="text-gray-400">
                Sécurité des applications (OWASP, Auth, JWT), tests unitaires et tests d'intégration 
                pour garantir la qualité et la robustesse des solutions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="card-cyber p-6"
            >
              <div className="text-neon-pink mb-4">
                <Users size={40} />
              </div>
              <h3 className="text-xl font-bold mb-2 font-cyber">
                Formation & Support
              </h3>
              <p className="text-gray-400">
                Formation d'utilisateurs, maintenance corrective et évolutive, développement d'applications 
                spécialisées pour le secteur de la santé.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
