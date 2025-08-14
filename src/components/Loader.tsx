import { useEffect } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Cpu } from "lucide-react";

const Loader = () => {
  useEffect(() => {
    // Play a subtle boot-up sound
    const audio = new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-tech-interface-alert-notification-2520.mp3"
    );
    audio.volume = 0.2;
    audio.play().catch((e) => console.log("Audio play prevented:", e));
  }, []);

  return (
    <motion.div
      className="fixed inset-0 bg-dark flex flex-col items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="mb-8"
      >
        <Cpu size={64} className="text-primary animate-pulse-neon" />
      </motion.div>

      <div className="font-cyber text-xl sm:text-2xl text-white mb-8">
        <TypeAnimation
          sequence={[
            "Initializing system...",
            1000,
            "Loading modules...",
            1000,
            "Connecting to matrix...",
            1000,
            "System ready.",
            500,
          ]}
          wrapper="span"
          speed={50}
          className="text-neon-green"
        />
      </div>

      <div className="w-64 h-2 bg-dark-lighter rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-neon-blue to-secondary"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2 }}
        />
      </div>
    </motion.div>
  );
};

export default Loader;
