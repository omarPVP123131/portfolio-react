import React, { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { FaArrowDown, FaDownload } from "react-icons/fa";
import { Particles } from "../particles/Particles";
import { TypingAnimation } from "../typing/TypingAnimation";
import SparklesEffect from "../particles/SparklesEffect";

interface HeroSectionProps {
  darkMode: boolean;
  handleScroll: (ref: React.RefObject<HTMLElement>) => void;
  inicioRef: React.RefObject<HTMLElement>;
  proyectosRef: React.RefObject<HTMLElement>;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  darkMode,
  handleScroll,
  inicioRef,
  proyectosRef,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showDownloadButton, setShowDownloadButton] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!isMobile) {
      setShowDownloadButton(latest < 100);
    }
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Detectar si es un dispositivo móvil
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Llamar a la función para inicializar

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  const contentVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section
      ref={inicioRef}
      className="min-h-screen pt-20 relative overflow-hidden flex items-center bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-black"
    >
      <div className="absolute inset-0 z-10">
        <Particles className="absolute inset-0" quantity={100} darkMode={darkMode} />
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none">
        <SparklesEffect />
      </div>

      <div className="absolute inset-0 z-5 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-12 lg:gap-24">
          <motion.div
            className="relative group perspective-1000"
            animate={{
              x: mousePosition.x,
              y: mousePosition.y,
              rotateX: mousePosition.y * 0.1,
              rotateY: mousePosition.x * 0.1,
            }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
          >
            <motion.img
              src="/images/yo.png"
              alt="Omar Palomares"
              width={300}
              height={300}
              className="rounded-full border-4 border-white dark:border-gray-800 shadow-2xl object-cover"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
          </motion.div>

          <motion.div
            className="text-center lg:text-left max-w-2xl"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={contentVariants} className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-4">
              ¡Hola! 👋 Soy
            </motion.div>

            <motion.h1 variants={contentVariants} className="text-5xl md:text-7xl font-extrabold">
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Omar Palomares
              </span>
            </motion.h1>

            <motion.div variants={contentVariants} className="mt-6 h-16">
              <TypingAnimation darkMode={darkMode} />
            </motion.div>

            <motion.div
              variants={contentVariants}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                onClick={() => handleScroll(proyectosRef)}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Ver Proyectos</span>
                <FaArrowDown className="w-5 h-5 group-hover:animate-bounce" />
              </motion.button>

              <motion.a
                href="/cv/cv.pdf"
                download
                className={`px-8 py-3 rounded-full border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-white hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 group ${
                  showDownloadButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
                } md:opacity-100 md:pointer-events-auto`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Descargar CV</span>
                <FaDownload className="w-5 h-5 group-hover:animate-bounce" />
              </motion.a>

              {/* Div invisible para evitar fallos entre secciones */}
              <div className="h-[0px] opacity-0 pointer-events-none" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
