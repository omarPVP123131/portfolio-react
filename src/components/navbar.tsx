// components/Navbar.tsx
import { motion } from 'framer-motion';
import { FaCode, FaSun, FaMoon } from 'react-icons/fa';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
  activeSection: string;
  handleScroll: (ref: React.RefObject<HTMLElement>) => void;
  refs: {
    inicio: React.RefObject<HTMLElement>;
    proyectos: React.RefObject<HTMLElement>;
    habilidades: React.RefObject<HTMLElement>;
    experiencia: React.RefObject<HTMLElement>;
    testimonios: React.RefObject<HTMLElement>;
    contacto: React.RefObject<HTMLElement>;
  };
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  toggleDarkMode,
  isMenuOpen,
  setIsMenuOpen,
  activeSection,
  handleScroll,
  refs
}) => {
  const menuItems = [
    { name: "inicio", ref: refs.inicio },
    { name: "proyectos", ref: refs.proyectos },
    { name: "habilidades", ref: refs.habilidades },
    { name: "experiencia", ref: refs.experiencia },
    { name: "testimonios", ref: refs.testimonios },
    { name: "contacto", ref: refs.contacto },
  ];

  return (
    <motion.nav
      className="bg-white dark:bg-gray-800 shadow-lg fixed w-full z-50 transition-colors duration-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
    >
      {/* Logo and Brand */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <motion.div
            className="flex-shrink-0 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <FaCode 
              className="w-6 h-6 text-blue-500" 
              style={{ filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))" }}
            />
            <div className="flex flex-col">
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500">
                Omar Palomares
              </h1>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Full Stack Developer
              </span>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => handleScroll(item.ref)}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeSection === item.name
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </motion.button>
            ))}
            <motion.button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 mr-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </motion.button>
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? "×" : "☰"}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};