import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Skill } from "../../types"; // Asegúrate de que Skill esté bien definido.
import { useInView } from "react-intersection-observer";
import skills from  "../../data/skills";
import { Tooltip as ReactTooltip } from "react-tooltip"; // Asegúrate de que la importación sea correcta
import './skill.css'


const SkillCard: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });
  
    const getLevelColor = (level: number) => {
      if (level >= 90) return "bg-green-500 dark:bg-green-400";
      if (level >= 70) return "bg-blue-500 dark:bg-blue-400";
      if (level >= 50) return "bg-yellow-500 dark:bg-yellow-400";
      return "bg-red-500 dark:bg-red-400";
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
        className="backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            {skill.icon && (
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
                data-tip={skill.name}
                data-for={`tooltip-${skill.name}`}
              >
                {skill.icon}
              </motion.div>
            )}
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {skill.name}
              </h3>
              <span className="px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded-full dark:text-gray-100 dark:bg-gray-600">
                {getLevelText(skill.level)}
              </span>
            </div>
          </div>
          <div className="text-right">
            <CountUp
              end={skill.level}
              suffix="%"
              duration={2}
              className="text-2xl font-bold text-gray-900 dark:text-white"
            />
          </div>
        </div>
  
        <div className="relative w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${getLevelColor(skill.level)}`}
            initial={{ width: 0 }}
            animate={inView ? { width: `${skill.level}%` } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine" />
          </motion.div>
        </div>
  
        <ReactTooltip id={`tooltip-${skill.name}`} place="top" />
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
    return (
      <section
        ref={habilidadesRef}
        id="proyectos"
        className="py-16 bg-white dark:bg-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Habilidades
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <SkillCard key={index} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </section>
    );
  };