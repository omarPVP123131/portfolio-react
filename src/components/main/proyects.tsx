import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { Tilt } from "react-tilt";
import { projects } from "../../data/projects";
import { Project } from "../../types";

const ProjectCard: React.FC<{ project: Project; index: number }> = ({
  project,
  index,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Tilt options={{ max: 25, scale: 1.05 }} className="w-full">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="h-full"
      >
        <div className="group relative h-full rounded-xl overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative h-48 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
            <img
              src={project.image}
              alt={project.title}
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg";
              }}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
            />
            <div className="absolute top-4 right-4 z-20 flex gap-2">
              {project.github && (
                <a
                  href={project.github}
                  className="p-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="w-5 h-5 text-white" />
                </a>
              )}
              <a
                href={project.link}
                className="p-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaExternalLinkAlt className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          <div className="relative p-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {project.description}
            </p>

            <motion.div
              className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: inView ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
        </div>
      </motion.div>
    </Tilt>
  );
};

interface ProjectsSectionProps {
  darkMode: boolean;
  handleScroll: (ref: React.RefObject<HTMLElement>) => void;
  proyectosRef: React.RefObject<HTMLElement>;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  darkMode,
  handleScroll,
  proyectosRef,
}) => {
  return (
    <section
      ref={proyectosRef}
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
          Proyectos Destacados
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
