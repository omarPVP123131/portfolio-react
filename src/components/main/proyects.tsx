import { motion, useScroll, useTransform } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaRegEye } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { Tilt } from "react-tilt";
import { projects } from "../../data/projects";
import { Project } from "../../types";
import { useMediaQuery } from "react-responsive"; // Añadimos esta importación

const ProjectCard: React.FC<{ project: Project; index: number }> = ({
  project,
  index,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.3 : 0.5,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    rest: { scale: 1 },
    hover: { scale: isMobile ? 1 : 1.1 },
  };

  const overlayVariants = {
    rest: { opacity: isMobile ? 0.5 : 0 },
    hover: { opacity: 1 },
  };

  const linkVariants = {
    rest: { y: isMobile ? 0 : 20, opacity: isMobile ? 1 : 0 },
    hover: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial={isMobile ? "visible" : "hidden"}
      animate={inView ? "visible" : "hidden"}
      className="h-full"
    >
      <Tilt
        options={{
          max: isMobile ? 0 : 25,
          scale: 1,
          speed: 450,
          glare: !isMobile,
          "max-glare": 0.5,
        }}
        className="h-full"
      >
        <motion.div
          className="relative h-full rounded-xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl"
          whileHover="hover"
          initial="rest"
          animate="rest"
        >
          <div className="relative h-56 overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"
              variants={overlayVariants}
              transition={{ duration: 0.3 }}
            />
            <motion.img
              src={project.image}
              alt={project.title}
              variants={imageVariants}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-cover"
            />
            <motion.div
              className="absolute inset-0 z-20 flex items-center justify-center gap-4"
              variants={overlayVariants}
              transition={{ duration: 0.3 }}
            >
              {project.github && (
                <motion.a
                  href={project.github}
                  variants={linkVariants}
                  className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="w-6 h-6 text-white" />
                </motion.a>
              )}
              <motion.a
                href={project.link}
                variants={linkVariants}
                className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaExternalLinkAlt className="w-6 h-6 text-white" />
              </motion.a>
              <motion.button
                variants={linkVariants}
                className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors"
                onClick={() => window.open(project.link, '_blank')}
              >
                <FaRegEye className="w-6 h-6 text-white" />
              </motion.button>
            </motion.div>
          </div>

          <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-3 py-1 text-sm font-medium rounded-full 
                    bg-gradient-to-r from-blue-500/10 to-purple-500/10 
                    dark:from-blue-500/20 dark:to-purple-500/20 
                    text-blue-700 dark:text-blue-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {project.description}
            </p>

            {!isMobile && (
              <motion.div
                className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: inView ? 1 : 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            )}
          </div>
        </motion.div>
      </Tilt>
    </motion.div>
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
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.9, 1],
    isMobile ? [1, 1, 1, 1] : [0, 1, 1, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.9, 1],
    isMobile ? [1, 1, 1, 1] : [0.8, 1, 1, 0.8]
  );

  return (
    <section
      ref={proyectosRef}
      id="proyectos"
      className="relative py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
    >
      <motion.div
        style={{ opacity, scale }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Proyectos Destacados
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Una selección de mis mejores trabajos y contribuciones al mundo del desarrollo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {!isMobile && (
          <>
            <div className="absolute inset-0 bg-grid-gray-900/[0.02] dark:bg-grid-white/[0.02] -z-10" />
            <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white/40 to-transparent dark:from-gray-800/40 -z-10" />
            <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white/40 to-transparent dark:from-gray-800/40 -z-10" />
          </>
        )}
      </motion.div>
    </section>
  );
};

export default ProjectsSection;