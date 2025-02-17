import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Skill } from "../../types";
import skills from "../../data/skills";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";

const SkillCard: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  const getLevelColor = (level: number) => {
    if (level >= 90)
      return "from-emerald-500 to-green-400 dark:from-emerald-400 dark:to-green-300";
    if (level >= 70)
      return "from-blue-500 to-cyan-400 dark:from-blue-400 dark:to-cyan-300";
    if (level >= 50)
      return "from-yellow-500 to-amber-400 dark:from-yellow-400 dark:to-amber-300";
    return "from-red-500 to-pink-400 dark:from-red-400 dark:to-pink-300";
  };

  const getLevelText = (level: number) => {
    if (level >= 90) return "Experto";
    if (level >= 70) return "Avanzado";
    if (level >= 50) return "Intermedio";
    return "Principiante";
  };

  return (
    <motion.div
      ref={ref}
      layout
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ scale }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-400/10 dark:to-purple-400/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />

      <div className="relative backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-1">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            {skill.icon && (
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg shadow-inner"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="p-3 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg shadow-inner">
                        <div className="text-2xl text-gray-700 dark:text-gray-200">
                          {skill.icon}
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>{skill.name}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>
            )}

            <div className="space-y-2">
              <h3 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                {skill.name}
              </h3>
              <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-200">
                {getLevelText(skill.level)}
              </span>
            </div>
          </div>

          <div className="text-right">
            <CountUp
              end={skill.level}
              suffix="%"
              duration={2.5}
              className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
            />
          </div>
        </div>

        <div className="relative w-full h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${getLevelColor(skill.level)}`}
            initial={{ width: 0 }}
            animate={inView ? { width: `${skill.level}%` } : {}}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/40 to-transparent animate-shimmer" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

interface SkillsSectionProps {
  darkMode: boolean;
  handleScroll: (ref: React.RefObject<HTMLElement>) => void;
  habilidadesRef: React.RefObject<HTMLElement>;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  darkMode,
  handleScroll,
  habilidadesRef,
}) => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const initialVisible = isMobile ? 3 : 6;
  const [visibleCount, setVisibleCount] = useState(initialVisible);

  // Actualiza isMobile en función del tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Reinicia visibleCount al valor inicial correspondiente si se había colapsado
      setVisibleCount((prev) => {
        const init = mobile ? 3 : 6;
        return prev <= init ? init : prev;
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleExpand = () => {
    if (visibleCount >= skills.length) {
      // Colapsa: vuelve al valor inicial dependiendo del dispositivo
      setVisibleCount(initialVisible);
    } else {
      // Expande de 3 en 3
      setVisibleCount((prev) => Math.min(prev + 3, skills.length));
    }
  };

  return (
    <section
      ref={habilidadesRef}
      id="habilidades"
      className="relative py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="absolute inset-0 bg-grid-gray-900/[0.04] dark:bg-grid-white/[0.02]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div style={{ opacity }} className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent mb-4"
          >
            Habilidades
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300"
          >
            Tecnologías y herramientas que domino
          </motion.p>
        </motion.div>

        {/* Grid con layout animado */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence>
            {skills.slice(0, visibleCount).map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence mode="wait">
          {skills.length > visibleCount && (
            <motion.div
              key="expand"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="mt-8 text-center"
            >
              <button
                onClick={handleExpand}
                className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors duration-300"
              >
                Ver más
              </button>
            </motion.div>
          )}

          {visibleCount >= skills.length && skills.length > initialVisible && (
            <motion.div
              key="collapse"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="mt-8 text-center"
            >
              <button
                onClick={handleExpand}
                className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors duration-300"
              >
                Colapsar
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};