import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const mobileMenuVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  },
  closed: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  }
};

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  toggleDarkMode,
  isMenuOpen,
  setIsMenuOpen,
  activeSection,
  handleScroll,
  refs,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const menuItems = [
    { name: "inicio", ref: refs.inicio, icon: "🏠" },
    { name: "proyectos", ref: refs.proyectos, icon: "💼" },
    { name: "habilidades", ref: refs.habilidades, icon: "🚀" },
    { name: "experiencia", ref: refs.experiencia, icon: "📚" },
    { name: "contacto", ref: refs.contacto, icon: "📫" },
  ];

  useEffect(() => {
    const handleScrollEvent = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScrollEvent);
    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, []);

  const handleMobileMenuClick = (item: any) => {
    handleScroll(item.ref);
    setIsMenuOpen(false);
    setTimeout(() => {
      window.scrollTo({
        top: item.ref.current.offsetTop - 70,
        behavior: 'smooth'
      });
    }, 100);
  };

  const navVariants = {
    visible: {
      backgroundColor: isScrolled
        ? darkMode ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)'
        : darkMode ? 'rgb(17, 24, 39)' : 'rgb(255, 255, 255)',
      y: 0,
    },
    hidden: { y: -100 },
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="visible"
      animate="visible"
      className={`fixed w-full z-50 backdrop-blur-md duration-300
        ${isScrolled ? 'shadow-lg dark:shadow-gray-900/20' : ''} 
        ${darkMode ? 'dark:border-gray-800' : 'border-gray-200'}`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center gap-3">
            <FaCode className="w-6 h-6 text-blue-500" />
            <div className="flex flex-col">
              <motion.h1
                className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600"
                animate={{ backgroundPosition: ["0%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                style={{ backgroundSize: "200%" }}
              >
                Omar Palomares
              </motion.h1>
              <span className="text-xs text-gray-700 dark:text-gray-400">
                Full Stack Developer
              </span>
            </div>
          </div>

          {/* Solo en desktop: solo se ilumina la sección activa, los demás están apagados */}
          <div className="hidden md:flex items-center space-x-2">
  {menuItems.map((item) => (
    <motion.button
      key={item.name}
      onClick={() => handleScroll(item.ref)}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
        activeSection === item.name
          ? "bg-blue-600 text-white"
          : "bg-transparent text-gray-800 dark:text-gray-200"
      }`}
    >
      <span className="flex items-center gap-2">
        {item.icon}
        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
      </span>
    </motion.button>
  ))}
  <motion.button
    onClick={toggleDarkMode}
    className="p-2 rounded-lg text-gray-800 dark:text-gray-200"
  >
    {darkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
  </motion.button>
</div>

          <div className="md:hidden flex items-center gap-2">
            <motion.button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-900 dark:text-gray-300"
            >
              {darkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
            </motion.button>
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-900 dark:text-gray-300"
            >
              <div className="space-y-1">
                <motion.span
                  animate={{
                    rotate: isMenuOpen ? 45 : 0,
                    y: isMenuOpen ? 8 : 0,
                  }}
                  className="block w-5 h-0.5 bg-current"
                />
                <motion.span
                  animate={{
                    opacity: isMenuOpen ? 0 : 1,
                  }}
                  className="block w-5 h-0.5 bg-current"
                />
                <motion.span
                  animate={{
                    rotate: isMenuOpen ? -45 : 0,
                    y: isMenuOpen ? -8 : 0,
                  }}
                  className="block w-5 h-0.5 bg-current"
                />
              </div>
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
  {isMenuOpen && (
    <motion.div
      variants={mobileMenuVariants}
      initial="closed"
      animate="open"
      exit="closed"
      className="md:hidden overflow-hidden"
    >
      <div className="px-2 pt-2 pb-3 space-y-1">
        {menuItems.map((item) => (
          <motion.button
            key={item.name}
            onClick={() => handleMobileMenuClick(item)}
            className={`w-full px-4 py-2 rounded-lg text-left text-sm font-medium ${
              activeSection === item.name
                ? "bg-blue-600 text-white"
                : "text-gray-800 dark:text-gray-200"
            }`}
          >
            <span className="flex items-center gap-2">
              {item.icon}
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )}
</AnimatePresence>
      </div>
    </motion.nav>
  );
};