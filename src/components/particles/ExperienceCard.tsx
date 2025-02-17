import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaCalendarAlt, FaBriefcase, FaArrowRight } from "react-icons/fa";
import { Experience } from "../../types";

interface ExperienceCardProps {
  experience: Experience;
  index: number;
  totalCount: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, index, totalCount }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 200, damping: 20 },
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { type: "spring", stiffness: 200, damping: 15 },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="relative"
    >
      {/* Línea de conexión en la timeline (solo si no es el último item) */}
      {index < totalCount - 1 && (
        <div className="absolute left-6 top-24 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 opacity-20" />
      )}

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="relative bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700"
      >
        <div className="flex gap-6">
          <motion.div
            variants={iconVariants}
            whileHover="hover"
            className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg"
          >
            {experience.icon || <FaBriefcase className="w-6 h-6" />}
          </motion.div>

          <motion.div variants={contentVariants} className="flex-grow">
            <div className="flex justify-between items-start flex-wrap gap-2">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {experience.position}
                </h3>
                <h4 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {experience.company}
                </h4>
              </div>

              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <FaCalendarAlt className="w-4 h-4" />
                <span className="text-sm font-medium">{experience.period}</span>
              </div>
            </div>

            <motion.div
              className="mt-4 space-y-3"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
              }}
            >
              {experience.description.map((item, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { type: "spring", stiffness: 100, damping: 15 },
                    },
                  }}
                  className="flex items-start gap-3 group"
                >
                  <FaArrowRight className="w-4 h-4 mt-1 text-blue-500 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <p className="text-gray-600 dark:text-gray-300 flex-1">{item}</p>
                </motion.div>
              ))}
            </motion.div>

            {experience.skills && (
              <motion.div
                className="mt-4 flex flex-wrap gap-2"
                variants={contentVariants}
              >
                {experience.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 text-blue-700 dark:text-blue-300"
                  >
                    {skill}
                  </span>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Borde inferior animado */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ExperienceCard;
