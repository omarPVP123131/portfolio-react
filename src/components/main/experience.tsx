import { motion, useScroll, useTransform } from "framer-motion";
import ExperienceCard from "../particles/ExperienceCard";
import experiences from "../../data/experience"; // Asegúrate de que la ruta sea la correcta
import { Experience } from "../../types";

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
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.9, 1],
    [0, 1, 1, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.9, 1],
    [0.8, 1, 1, 0.8]
  );

  return (
    <section
      ref={experienciaRef}
      id="experiencia"
      className="relative py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
    >
      <motion.div
        style={{ opacity, scale }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Experiencia Profesional
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Un recorrido por mi trayectoria profesional y los proyectos que han marcado mi carrera
          </p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp: Experience, index: number) => (
            <ExperienceCard
              key={index}
              experience={exp}
              index={index}
              totalCount={experiences.length}
            />
          ))}
        </div>
      </motion.div>

      {/* Decoración de fondo */}
      <div className="absolute inset-0 bg-grid-gray-900/[0.02] dark:bg-grid-white/[0.02] -z-10" />
    </section>
  );
};

export default ExperienceSection;
