import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { db } from "../firebaseConfig"; // Import Firestore
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // GSAP animations
    gsap.fromTo(
      ".contact-title",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    gsap.fromTo(
      ".contact-item",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.3,
      }
    );
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Effet sonore
    const audio = new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-message-sent-notification-1008.mp3"
    );
    audio.volume = 0.2;
    audio.play().catch((err) => console.log("Audio play prevented:", err));

    try {
      await addDoc(collection(db, "messages"), {
        ...formData,
        createdAt: serverTimestamp(),
      });

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      setSubmitStatus("error");
    }

    setIsSubmitting(false);
  };

  useEffect(() => {
    if (submitStatus === "success") {
      const timer = setTimeout(() => setSubmitStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 pb-20"
    >
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="contact-title text-4xl md:text-5xl font-bold mb-8 font-cyber text-center">
              <span className="text-primary">&lt;</span> Contact{" "}
              <span className="text-primary">/&gt;</span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="lg:col-span-1">
                <div className="bg-dark-lighter/70 backdrop-blur-md rounded-lg p-6 border border-primary/20 h-full">
                  <h2 className="text-2xl font-bold mb-6 font-cyber">
                    Restons connectés
                  </h2>

                  <div className="space-y-6">
                    <div className="contact-item flex items-start">
                      <div className="bg-primary/20 p-3 rounded-lg mr-4">
                        <Mail className="text-primary" size={20} />
                      </div>
                      <div>
                        <h3 className="font-cyber text-sm text-gray-400 mb-1">
                          Email
                        </h3>
                        <a
                          href="mailto:abdoulayelah@esp.sn"
                          className="text-white hover:text-primary transition-colors"
                        >
                          abdoulayelah@esp.sn
                        </a>
                      </div>
                    </div>

                    <div className="contact-item flex items-start">
                      <div className="bg-primary/20 p-3 rounded-lg mr-4">
                        <MapPin className="text-neon-pink" size={20} />
                      </div>
                      <div>
                        <h3 className="font-cyber text-sm text-gray-400 mb-1">
                          Localisation
                        </h3>
                        <p className="text-white">Guélé Tapée, Dakar, Sénégal</p>
                      </div>
                    </div>

                    <div className="contact-item flex items-start">
                      <div className="bg-primary/20 p-3 rounded-lg mr-4">
                        <Phone className="text-neon-blue" size={20} />
                      </div>
                      <div>
                        <h3 className="font-cyber text-sm text-gray-400 mb-1">
                          Téléphone
                        </h3>
                        <a
                          href="tel:+221773520776"
                          className="text-white hover:text-neon-blue transition-colors"
                        >
                          +221 77 352 07 76
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="font-cyber text-sm text-gray-400 mb-3">
                      Réseaux sociaux
                    </h3>
                    <div className="flex space-x-4">
                      <a
                        href="https://github.com/abdoulayelah"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-dark-light p-3 rounded-lg text-gray-400 hover:text-primary hover:bg-dark transition-all duration-300"
                        aria-label="GitHub"
                      >
                        <Github size={20} />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/abdoulaye-lah"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-dark-light p-3 rounded-lg text-gray-400 hover:text-neon-blue hover:bg-dark transition-all duration-300"
                        aria-label="LinkedIn"
                      >
                        <Linkedin size={20} />
                      </a>
                      <a
                        href="https://twitter.com/abdoulayelah"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-dark-light p-3 rounded-lg text-gray-400 hover:text-neon-pink hover:bg-dark transition-all duration-300"
                        aria-label="Twitter"
                      >
                        <Twitter size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-dark-lighter/70 backdrop-blur-md rounded-lg p-6 border border-primary/20">
                  <h2 className="text-2xl font-bold mb-6 font-cyber">
                    Envoyez-moi un message
                  </h2>

                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block font-cyber text-sm text-gray-400 mb-1"
                        >
                          Nom
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-dark border border-primary/30 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block font-cyber text-sm text-gray-400 mb-1"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-dark border border-primary/30 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block font-cyber text-sm text-gray-400 mb-1"
                      >
                        Sujet
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full bg-dark border border-primary/30 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block font-cyber text-sm text-gray-400 mb-1"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full bg-dark border border-primary/30 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors resize-none"
                      ></textarea>
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-cyber group w-full flex justify-center items-center"
                      >
                        <span className="relative z-10 flex items-center">
                          {isSubmitting
                            ? "Envoi en cours..."
                            : "Envoyer le message"}
                          <Send
                            className="ml-2 group-hover:translate-x-1 transition-transform"
                            size={18}
                          />
                        </span>
                      </button>

                      {submitStatus === "success" && (
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-neon-green text-sm mt-2 font-cyber"
                        >
                          Message envoyé avec succès ! Je vous répondrai dès que
                          possible.
                        </motion.p>
                      )}

                      {submitStatus === "error" && (
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-2 font-cyber"
                        >
                          Une erreur est survenue. Veuillez réessayer plus tard.
                        </motion.p>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-dark-lighter/70 backdrop-blur-md rounded-lg p-6 border border-primary/20 overflow-hidden">
              <h2 className="text-2xl font-bold mb-6 font-cyber">
                Localisation
              </h2>

              <div className="relative h-80 rounded-lg overflow-hidden border border-primary/30">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.253798946083!2d-17.472993!3d14.715517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDQyJzU1LjgiTiAxN8KwMjgnMjIuOSJX!5e0!3m2!1sfr!2sfr!4v1710762345678!5m2!1sfr!2sfr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Google Maps - Guélé Tapée, Dakar"
                  className="grayscale contrast-125 opacity-80"
                ></iframe>
                <div className="absolute inset-0 pointer-events-none border border-primary/50 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;
