import React from "react";
import { motion } from "framer-motion";

const SparklesEffect = () => {
  // Se memorizan los sparkles para que sus valores aleatorios se fijen una sola vez.
  const sparkles = React.useMemo(
    () =>
      Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 2 + 1,
        delay: Math.random() * 2,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      })),
    []
  );

  return (
    <div className="absolute inset-0 pointer-events-none">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full bg-blue-400 dark:bg-blue-300"
          style={{
            width: sparkle.size,
            height: sparkle.size,
            left: sparkle.left,
            top: sparkle.top,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            // Si deseas quitar cualquier movimiento vertical, omite la propiedad `y`
            // y: [-20, 20],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default SparklesEffect;
