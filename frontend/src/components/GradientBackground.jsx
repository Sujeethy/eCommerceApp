import { motion } from "framer-motion";

const GradientBackground = () => {
  return (
    <motion.div
      className="absolute inset-0 z-0 bg-gradient-to-r from-black via-blue-950 to-black opacity-90"
      animate={{
        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%", "100% 0%"],
      }}
      transition={{
        duration: 40,
        ease: "easeInOut",
        repeat: Infinity,
      }}
      style={{
        backgroundSize: "200% 200%",
      }}
      aria-hidden="true"
    />
  );
};

export default GradientBackground;
