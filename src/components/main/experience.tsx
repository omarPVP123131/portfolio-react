import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaCalendarAlt } from "react-icons/fa"; // Asegúrate de tener react-icons instalado
import experiences from "../../data/experience";
import {Experience} from "../../types/index";


interface ExperienceCardProps {
    experience: Experience;
    index: number;
  }
  
  const ExperienceCard: React.FC<ExperienceCardProps> = ({
    experience,
    index,
  }) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

  return (
    <motion.div
      ref={ref}
      className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500" />

      <div className="relative">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
            {experience.icon}
          </div>

          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {experience.position}
                </h3>
                <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                  {experience.company}
                </h4>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <FaCalendarAlt className="w-4 h-4" />
                <span>{experience.period}</span>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {experience.description.map((item, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 mt-2" />
                  <p className="text-gray-600 dark:text-gray-300 flex-1">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: inView ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
    </motion.div>
  );
};

interface ExperienceSectionProps {
    darkMode: boolean;
    handleScroll: (ref: React.RefObject<HTMLElement>) => void;
    experienciaRef: React.RefObject<HTMLElement>;
  }
  
  export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
    darkMode,
    handleScroll,
    experienciaRef,
  }) => {
    return (
    <section
      ref={experienciaRef}
      id="experiencia"
      className="py-16 bg-white dark:bg-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Experiencia
        </motion.h2>
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
