import { motion } from "framer-motion";

export const Loading = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 text-white"
    >
      <motion.div
        className="relative flex items-center justify-center"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 360, 0],
          backgroundColor: ["#3b82f6", "#6366f1", "#3b82f6"],
          borderRadius: ["20%", "50%", "20%"],
        }}
        transition={{
          duration: 1.2,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <motion.div
          className="absolute inset-0 w-full h-full bg-blue-500 rounded-full opacity-50"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 1.8,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
        <motion.div
          className="w-16 h-16 bg-blue-500 rounded-full shadow-2xl"
          animate={{
            scale: [0.9, 1.3, 0.9],
            rotate: [0, 360, 0],
            borderRadius: ["50%", "20%", "50%"],
            boxShadow: [
              "0px 0px 10px rgba(59, 130, 246, 0.5)",
              "0px 0px 20px rgba(99, 102, 241, 0.7)",
              "0px 0px 10px rgba(59, 130, 246, 0.5)",
            ],
          }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      </motion.div>
      <motion.p
        className="absolute bottom-10 text-lg text-gray-300"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: [10, -10, 10], opacity: [0, 1, 0] }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        Cargando...
      </motion.p>
    </div>
  );
};