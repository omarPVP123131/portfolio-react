// components/HeroSection.tsx
import { motion } from "framer-motion";
import { FaArrowDown, FaDownload } from "react-icons/fa";
import TypingAnimation from "../typing/TypingAnimation";

interface HeroSectionProps {
  darkMode: boolean;
  handleScroll: (ref: React.RefObject<HTMLElement>) => void;
  inicioRef: React.RefObject<HTMLElement>;
  proyectosRef: React.RefObject<HTMLElement>; // Añadimos 'proyectosRef'

}

export const HeroSection: React.FC<HeroSectionProps> = ({
  darkMode,
  handleScroll,
  inicioRef,
  proyectosRef,
}) => {
  return (
    <section
      ref={inicioRef}
      id="proyectos"
      className="min-h-screen pt-20 relative overflow-hidden flex items-center"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 dark:from-blue-900/30 dark:to-purple-900/30" />
      <div
        className="absolute inset-0 opacity-30 dark:opacity-20"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
      />
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-12 lg:gap-24">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full blur-2xl opacity-30 animate-pulse" />
            <img
              src="/images/yo.png"
              alt="Omar Palomares"
              width={300}
              height={300}
              className="rounded-full border-4 border-white dark:border-gray-800 shadow-2xl object-cover z-10 relative"
            />
          </motion.div>

          <div className="text-center lg:text-left max-w-2xl">
            <motion.h1
              className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Omar Palomares Velasco
            </motion.h1>

            <motion.div
              className="mt-6 text-xl md:text-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <TypingAnimation darkMode={darkMode} />
            </motion.div>

            <motion.div
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button
                onClick={() => handleScroll(proyectosRef)}
                className={`px-8 py-3 rounded-full ${
                  darkMode
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                } transition-colors duration-200 flex items-center justify-center space-x-2`}
              >
                <span>Ver Proyectos</span>
                <FaArrowDown className="w-5 h-5" />
              </button>

              <a
                href="/cv/cv.pdf"
                download
                className={`px-8 py-3 rounded-full border-2 ${
                  darkMode
                    ? "border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900"
                    : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                } transition-all duration-200 flex items-center justify-center space-x-2`}
              >
                <span>Descargar CV</span>
                <FaDownload className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
