import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface ParticlesProps {
  className?: string;
  quantity?: number;
  darkMode?: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export const Particles: React.FC<ParticlesProps> = ({
  className = "",
  quantity = 50,
  darkMode = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef);
  const controls = useAnimation();

  // Generamos las partículas una única vez según la cantidad y el modo
  const particles = React.useMemo<Particle[]>(() => {
    return Array.from({ length: quantity }, (_, i) => {
      const size = Math.random() * 3 + 0.5;
      const opacity = Math.random() * 0.5 + 0.3;
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size,
        color: darkMode
          ? `rgba(255, 255, 255, ${opacity})`
          : `rgba(0, 0, 0, ${opacity})`,
      };
    });
  }, [quantity, darkMode]);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Se eliminan los cambios de posición; solo se anima la opacidad para simular un efecto de parpadeo
  const particleVariants = {
    hidden: (particle: Particle) => ({
      x: `${particle.x}%`,
      y: `${particle.y}%`,
      opacity: 0,
    }),
    visible: (particle: Particle) => ({
      x: `${particle.x}%`,
      y: `${particle.y}%`,
      opacity: [0, 1, 0],
      transition: {
        duration: Math.random() * 5 + 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          custom={particle}
          variants={particleVariants}
          initial="hidden"
          animate={controls}
          className="absolute rounded-full"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            filter: `blur(${particle.size / 3}px)`,
            boxShadow: darkMode
              ? `0 0 ${particle.size * 2}px rgba(255, 255, 255, 0.3)`
              : `0 0 ${particle.size * 2}px rgba(0, 0, 0, 0.2)`,
          }}
        />
      ))}
    </div>
  );
};
