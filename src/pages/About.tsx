import { useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code,
  Cpu,
  Lightbulb,
  Rocket,
  GraduationCap,
  Briefcase,
  Database,
  Shield,
  TestTube,
  Users,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useEffect(() => {
    // GSAP animations
    const timeline = gsap.timeline();

    timeline.fromTo(
      ".about-title",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    gsap.fromTo(
      ".about-content",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-content",
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      ".timeline-item",
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".timeline-section",
          start: "top 70%",
        },
      }
    );

    return () => {
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 pb-20"
    >
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="about-title text-4xl md:text-5xl font-bold mb-8 font-cyber text-center">
              <span className="text-primary">&lt;</span> À Propos{" "}
              <span className="text-primary">/&gt;</span>
            </h1>

                                        <div className="about-content bg-dark-lighter/70 backdrop-blur-md rounded-lg p-6 md:p-8 border border-primary/20 shadow-lg mb-12">
                <div className="flex flex-col md:flex-row items-center mb-8 max-w-6xl mx-auto">
                  <div className="w-full">
                  <h2 className="text-2xl font-bold mb-2 font-cyber text-white">
                    Ingénieur Logiciel | Développeur Web
                  </h2>
                  <p className="text-gray-300 mb-4">
                    Après près de trois ans d'expérience, j'ai choisi de reprendre mes études en Master Génie
                    Logiciel & Systèmes d'Information pour perfectionner mes compétences. Passionné par
                    les bonnes pratiques de développement et le travail en équipe, je cherche à construire
                    des solutions robustes, utiles et élégantes.
                  </p>
                  <p className="text-gray-300">
                    J'aime apprendre, partager et faire avancer les projets avec exigence et bienveillance.
                    Mon approche combine rigueur technique, innovation et collaboration pour créer des
                    applications qui répondent aux besoins réels des utilisateurs.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="about-content">
                  <h3 className="text-xl font-bold mb-3 font-cyber flex items-center">
                    <Code className="mr-2 text-primary" size={20} />
                    <span>Développement Web</span>
                  </h3>
                  <p className="text-gray-300">
                    Conception et développement de sites web et applications sur mesure pour des clients variés.
                    Expertise en architecture orientée microservices, clean code et bonnes pratiques de développement.
                    Maintenance corrective et évolutive des projets avec suivi des retours clients.
                  </p>
                </div>

                <div className="about-content">
                  <h3 className="text-xl font-bold mb-3 font-cyber flex items-center">
                    <Database className="mr-2 text-neon-blue" size={20} />
                    <span>Architecture & DevOps</span>
                  </h3>
                  <p className="text-gray-300">
                    Architecture logicielle UML & Mérise, collaboration agile. Expertise en DevOps avec
                    automatisation, déploiement et Docker. CI/CD avec GitHub Actions et GitLab CI.
                    Respect des normes ITIL pour une gestion efficace des services informatiques.
                  </p>
                </div>

                <div className="about-content">
                  <h3 className="text-xl font-bold mb-3 font-cyber flex items-center">
                    <Shield className="mr-2 text-neon-yellow" size={20} />
                    <span>Sécurité & Tests</span>
                  </h3>
                  <p className="text-gray-300">
                    Sécurité des applications avec OWASP, authentification et JWT. Tests unitaires et
                    tests d'intégration pour garantir la qualité du code. Participation à la rédaction
                    des spécifications techniques et estimation des charges de développement.
                  </p>
                </div>

                <div className="about-content">
                  <h3 className="text-xl font-bold mb-3 font-cyber flex items-center">
                    <Users className="mr-2 text-neon-pink" size={20} />
                    <span>Formation & Support</span>
                  </h3>
                  <p className="text-gray-300">
                    Formation de mutuelles de santé à l'usage du SIGICMU, favorisant son adoption terrain.
                    Correction de bugs et amélioration de la stabilité des systèmes. Développement
                    d'applications pour centraliser les acteurs du système de santé sénégalais.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section py-16 bg-dark-lighter/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="about-title text-3xl font-bold mb-12 font-cyber text-center">
              <span className="text-primary">&lt;</span> Parcours{" "}
              <span className="text-primary">/&gt;</span>
            </h2>

            <div className="relative border-l-2 border-primary/50 pl-8 ml-4 md:ml-8">
              <div className="timeline-item mb-12 relative">
                <div className="absolute -left-[42px] bg-dark p-2 rounded-full border-2 border-primary">
                  <GraduationCap className="text-primary" size={20} />
                </div>
                <div className="bg-dark-lighter/70 backdrop-blur-md rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold font-cyber mb-2">
                    Master Génie Logiciel et Systèmes d'Information
                  </h3>
                  <p className="text-sm text-primary mb-2">2024 - 2025</p>
                  <p className="text-gray-300">
                    Ecole Supérieure Polytechnique de Dakar (ESP)
                  </p>
                </div>
              </div>

              <div className="timeline-item mb-12 relative">
                <div className="absolute -left-[42px] bg-dark p-2 rounded-full border-2 border-neon-blue">
                  <Briefcase className="text-neon-blue" size={20} />
                </div>
                <div className="bg-dark-lighter/70 backdrop-blur-md rounded-lg p-6 border border-neon-blue/20">
                  <h3 className="text-xl font-bold font-cyber mb-2">
                    Développeur Web - Couverture Maladie Universelle
                  </h3>
                  <p className="text-sm text-neon-blue mb-2">Octobre 2022 - Décembre 2023</p>
                  <p className="text-gray-300">
                    Correction de bugs du module GESTAM du SIGICMU, améliorant la stabilité du système.
                    Formation de mutuelles de santé à l'usage du SIGICMU. Développement de l'application CSU
                    pour centraliser les acteurs du système de santé sénégalais.
                  </p>
                </div>
              </div>

              <div className="timeline-item mb-12 relative">
                <div className="absolute -left-[42px] bg-dark p-2 rounded-full border-2 border-neon-yellow">
                  <Briefcase className="text-neon-yellow" size={20} />
                </div>
                <div className="bg-dark-lighter/70 backdrop-blur-md rounded-lg p-6 border border-neon-yellow/20">
                  <h3 className="text-xl font-bold font-cyber mb-2">
                    Développeur Web - EFG Group
                  </h3>
                  <p className="text-sm text-neon-yellow mb-2">Janvier 2020 - Janvier 2022</p>
                  <p className="text-gray-300">
                    Conception et développement de sites web et applications sur mesure pour des clients variés.
                    Maintenance corrective et évolutive des projets avec suivi des retours clients.
                    Participation à la rédaction des spécifications techniques et estimation des charges.
                  </p>
                </div>
              </div>

              <div className="timeline-item relative">
                <div className="absolute -left-[42px] bg-dark p-2 rounded-full border-2 border-neon-pink">
                  <GraduationCap className="text-neon-pink" size={20} />
                </div>
                <div className="bg-dark-lighter/70 backdrop-blur-md rounded-lg p-6 border border-neon-pink/20">
                  <h3 className="text-xl font-bold font-cyber mb-2">
                    Licence en Informatique et Télécommunications
                  </h3>
                  <p className="text-sm text-neon-pink mb-2">2017 - 2020</p>
                  <p className="text-gray-300">
                    Ecole Supérieure Multinationale des Télécommunications (ESMT)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compétences Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="about-title text-3xl font-bold mb-12 font-cyber text-center">
              <span className="text-primary">&lt;</span> Compétences{" "}
              <span className="text-primary">/&gt;</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="about-content bg-dark-lighter/70 backdrop-blur-md rounded-lg p-6 border border-primary/20">
                <h3 className="text-lg font-bold font-cyber mb-3 flex items-center">
                  <Code className="mr-2 text-primary" size={18} />
                  <span>Développement</span>
                </h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Architecture orientée microservices</li>
                  <li>• Clean Code & bonnes pratiques</li>
                  <li>• Architecture logicielle UML & Mérise</li>
                  <li>• Collaboration agile</li>
                </ul>
              </div>

              <div className="about-content bg-dark-lighter/70 backdrop-blur-md rounded-lg p-6 border border-neon-blue/20">
                <h3 className="text-lg font-bold font-cyber mb-3 flex items-center">
                  <Rocket className="mr-2 text-neon-blue" size={18} />
                  <span>DevOps & CI/CD</span>
                </h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• DevOps (Automatisation, déploiement, Docker)</li>
                  <li>• CI/CD (GitHub Actions, GitLab CI)</li>
                  <li>• Respect des normes ITIL</li>
                </ul>
              </div>

              <div className="about-content bg-dark-lighter/70 backdrop-blur-md rounded-lg p-6 border border-neon-yellow/20">
                <h3 className="text-lg font-bold font-cyber mb-3 flex items-center">
                  <Shield className="mr-2 text-neon-yellow" size={18} />
                  <span>Sécurité & Tests</span>
                </h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Sécurité des applications (OWASP, Auth, JWT)</li>
                  <li>• Tests unitaires et tests d'intégrations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
