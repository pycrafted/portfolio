import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code,
  Server,
  Database,
  Cpu,
  Globe,
  Layers,
  Palette,
  Lightbulb,
  Users,
  Clock,
  BookOpen,
} from "lucide-react";
import { useInView } from "react-intersection-observer";

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  category: "frontend" | "backend" | "database" | "ai" | "api" | "tools";
  logo: string;
}

const Skills = () => {
  const [frontendRef, frontendInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [backendRef, backendInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [databaseRef, databaseInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [aiRef, aiInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [apiRef, apiInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [toolsRef, toolsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skills: Skill[] = [
    // Frontend
    {
      name: "Angular",
      category: "frontend",
      logo: "/logos/angular.svg",
    },
    {
      name: "React",
      category: "frontend",
      logo: "/logos/react.svg",
    },
    {
      name: "TypeScript",
      category: "frontend",
      logo: "/logos/typescript.svg",
    },
    {
      name: "Tailwind CSS",
      category: "frontend",
      logo: "/logos/tailwind.svg",
    },
    {
      name: "Bootstrap",
      category: "frontend",
      logo: "/logos/bootstrap.svg",
    },

    // Backend
    {
      name: "Node.js",
      category: "backend",
      logo: "/logos/nodejs.svg",
    },
    {
      name: "Express",
      category: "backend",
      logo: "/logos/express1.svg",
    },
    {
      name: "Laravel",
      category: "backend",
      logo: "/logos/laravel.svg",
    },
    {
      name: "Django",
      category: "backend",
      logo: "/logos/django.svg",
    },
    {
      name: "Spring Boot",
      category: "backend",
      logo: "/logos/spring-boot.svg",
    },
    {
      name: "REST API",
      category: "api",
      logo: "/logos/api.svg",
    },
    {
      name: "SOAP",
      category: "api",
      logo: "/logos/soap.svg",
    },
    {
      name: "GraphQL",
      category: "api",
      logo: "/logos/graphql.svg",
    },

    // Database
    {
      name: "MongoDB",
      category: "database",
      logo: "/logos/mongodb.svg",
    },
    {
      name: "MySQL",
      category: "database",
      logo: "/logos/mysql.svg",
    },
    {
      name: "PostgreSQL",
      category: "database",
      logo: "/logos/postgresql.svg",
    },
    {
      name: "Firebase",
      category: "database",
      logo: "/logos/firebase.svg",
    },

    // AI
    {
      name: "TensorFlow",
      category: "ai",
      logo: "/logos/tensorflow.svg",
    },
    {
      name: "PyTorch",
      category: "ai",
      logo: "/logos/pytorch.svg",
    },
    {
      name: "Scikit-learn",
      category: "ai",
      logo: "/logos/scikit-learn.svg",
    },
    {
      name: "OpenAI API",
      category: "ai",
      logo: "/logos/openai.svg",
    },
    {
      name: "Computer Vision",
      category: "ai",
      logo: "/logos/opencv.svg",
    },
    {
      name: "NLP",
      category: "ai",
      logo: "/logos/nlp.svg",
    },

    // Tools
    {
      name: "Git",
      category: "tools",
      logo: "/logos/git.svg",
    },
    {
      name: "Docker",
      category: "tools",
      logo: "/logos/docker.svg",
    },

    {
      name: "Figma",
      category: "tools",
      logo: "/logos/figma.svg",
    },
  ];

  useEffect(() => {
    gsap.fromTo(
      ".skills-title",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const getSkillsByCategory = (category: string) => {
    return skills.filter((skill) => skill.category === category);
  };

  const renderSkills = (categorySkills: Skill[]) => {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {categorySkills.map((skill) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center p-4 skill-holographic hover:bg-dark-lighter/70 transition-all cursor-pointer"
          >
            <img
              src={skill.logo}
              alt={`${skill.name} logo`}
              className="w-12 h-12 mb-2"
            />
            <span className="text-sm font-cyber text-center">{skill.name}</span>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 pb-20"
    >
      <section className="py-20 liquid-bg" style={{ backgroundColor: 'rgba(30, 30, 30, 0.2)' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="skills-title text-4xl md:text-5xl font-bold mb-8 font-cyber text-center">
              <span className="text-primary">&lt;</span> Compétences{" "}
              <span className="text-primary">/&gt;</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {/* Frontend Skills */}
              <div ref={frontendRef} className="card-cyber p-6">
                <h2 className="text-2xl font-bold mb-6 font-cyber flex items-center">
                  <Code className="mr-2 text-primary" size={24} />
                  <span>Frameworks Frontend</span>
                </h2>
                {renderSkills(getSkillsByCategory("frontend"))}
              </div>

              {/* Backend Skills */}
              <div ref={backendRef} className="card-cyber p-6">
                <h2 className="text-2xl font-bold mb-6 font-cyber flex items-center">
                  <Server className="mr-2 text-neon-green" size={24} />
                  <span>Frameworks Backend</span>
                </h2>
                {renderSkills(getSkillsByCategory("backend"))}
              </div>

              {/* Database Skills */}
              <div ref={databaseRef} className="card-cyber p-6">
                <h2 className="text-2xl font-bold mb-6 font-cyber flex items-center">
                  <Database className="mr-2 text-neon-blue" size={24} />
                  <span>Bases de données</span>
                </h2>
                {renderSkills(getSkillsByCategory("database"))}
              </div>

              {/* AI Skills */}
              <div ref={aiRef} className="card-cyber p-6">
                <h2 className="text-2xl font-bold mb-6 font-cyber flex items-center">
                  <Cpu className="mr-2 text-neon-pink" size={24} />
                  <span>Intelligence Artificielle</span>
                </h2>
                {renderSkills(getSkillsByCategory("ai"))}
              </div>
            </div>

            {/* API Skills */}
            <div ref={apiRef} className="card-cyber p-6 mb-16">
              <h2 className="text-2xl font-bold mb-6 font-cyber flex items-center">
                <Globe className="mr-2 text-neon-yellow" size={24} />
                <span>APIs & Services Web</span>
              </h2>
              {renderSkills(getSkillsByCategory("api"))}
            </div>

            {/* Tools & Others */}
            <div ref={toolsRef} className="card-cyber p-6">
              <h2 className="text-2xl font-bold mb-6 font-cyber flex items-center">
                <Layers className="mr-2 text-neon-yellow" size={24} />
                <span>Outils & Autres</span>
              </h2>
              {renderSkills(getSkillsByCategory("tools"))}
            </div>

            {/* Soft Skills section */}
            <div className="mt-16">
              <h2 className="skills-title text-3xl font-bold mb-8 font-cyber text-center">
                <span className="text-primary">&lt;</span> Soft Skills{" "}
                <span className="text-primary">/&gt;</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-dark-lighter/70 backdrop-blur-md rounded-lg p-5 border border-primary/20 text-center"
                >
                  <div className="bg-dark-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="text-neon-yellow" size={32} />
                  </div>
                  <h3 className="text-lg font-bold mb-2 font-cyber">
                    Résolution de problèmes
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Approche analytique et créative pour résoudre des défis
                    techniques complexes.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-dark-lighter/70 backdrop-blur-md rounded-lg p-5 border border-primary/20 text-center"
                >
                  <div className="bg-dark-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Users className="text-neon-blue" size={32} />
                  </div>
                  <h3 className="text-lg font-bold mb-2 font-cyber">
                    Travail d'équipe
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Collaboration efficace, communication claire et partage de
                    connaissances.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-dark-lighter/70 backdrop-blur-md rounded-lg p-5 border border-primary/20 text-center"
                >
                  <div className="bg-dark-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Clock className="text-neon-pink" size={32} />
                  </div>
                  <h3 className="text-lg font-bold mb-2 font-cyber">
                    Gestion du temps
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Organisation efficace des tâches et respect des délais dans
                    les projets.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-dark-lighter/70 backdrop-blur-md rounded-lg p-5 border border-primary/20 text-center"
                >
                  <div className="bg-dark-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="text-primary" size={32} />
                  </div>
                  <h3 className="text-lg font-bold mb-2 font-cyber">
                    Apprentissage continu
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Veille technologique et adaptation rapide aux nouvelles
                    technologies.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Skills;
