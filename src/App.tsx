import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
} from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaArrowUp,
  FaMoon,
  FaSun,
  FaDownload,
  FaCode,
  FaGraduationCap,
  FaLaptopCode,
  FaReact,
  FaNodeJs,
  FaPython,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaArrowDown,
} from "react-icons/fa";
import { SiCplusplus } from "react-icons/si";
import { RiFlutterFill } from "react-icons/ri";
import { useInView } from "react-intersection-observer";
import { Tilt } from "react-tilt";
import { ParallaxProvider } from "react-scroll-parallax";
import "react-circular-progressbar/dist/styles.css";
import CountUp from "react-countup";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "react-circular-progressbar/dist/styles.css";
import "swiper/css/autoplay";
import TypingAnimation from "./TypingAnimation"; // Ajusta la ruta según tu estructura de carpetas
import { Tooltip as ReactTooltip } from "react-tooltip"; // Asegúrate de que la importación sea correcta
import './app.css';
import ContactSection from "./ContactSection";
// Tipos
type Project = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  github?: string;
};

type Skill = {
  name: string;
  level: number;
  icon: JSX.Element;
};

type Experience = {
  company: string;
  position: string;
  period: string;
  description: string[];
  icon: React.ReactNode;
};

type Testimonial = {
  name: string;
  position: string;
  content: string;
  avatar: string;
};

// Componentes
const MenuIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const XIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

type ChevronIconProps = {
  className?: string;
};

const ChevronDownIcon: React.FC<ChevronIconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className} // Añadir className aquí
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeSection] = useState<string>("inicio");
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { scrollYProgress } = useScroll();

  const proyectosRef = useRef<HTMLDivElement>(null);
  const habilidadesRef = useRef<HTMLDivElement>(null);
  const experienciaRef = useRef<HTMLDivElement>(null);
  const testimoniosRef = useRef<HTMLDivElement>(null);
  const contactoRef = useRef<HTMLDivElement>(null);
  const footeref = useRef<HTMLDivElement>(null);
  const inicioref = useRef<HTMLDivElement>(null);

  const handleScroll = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const projects: Project[] = [
    {
      title: "Sistema de Gestión de Pacientes",
      description:
        "Un sistema diseñado específicamente para gestionar y administrar información de pacientes, construido con Vite y React para un rendimiento óptimo en un entorno local.",
      tags: ["Web", "React", "Vite"],
      image: "./images/proyect1.png",
      link: "https://github.com/omarPVP123131/veterinaria",
    },
    {
      title: "Punto de Venta",
      description:
        "Punto de Venta hecho en python con el framework de qt6 y sqlite para una base de datos local",
      tags: ["Desktop", "Python", "Sqlite", "Qt"],
      image: "/images/proyect2.png",
      link: "https://github.com/omarPVP123131/pos-python",
    },
    {
      title: "sistema de punto de venta",
      description:
        "Sistema de Punto De Venta completamente portatil la cual maneja una Api Restful propia la cual permite el enlace a la aplicacion de escritorio",
      tags: ["Multiplataforma", "Flutter", "Dart", "Sqlite", "Python"],
      image: "/images/proyect3.png",
      link: "https://github.com/omarPVP123131/pos",
    },
  ];

  const skills: Skill[] = [
    { name: "JavaScript", level: 90, icon: <FaCode /> },
    { name: "React", level: 85, icon: <FaReact /> },
    { name: "Node.js", level: 80, icon: <FaNodeJs /> },
    { name: "Python", level: 75, icon: <FaPython /> },
    { name: "C++", level: 80, icon: <SiCplusplus /> },
    { name: "Flutter", level: 65, icon: <RiFlutterFill /> },
  ];

  const experiences: Experience[] = [
    {
      company: "Freelance",
      position: "Desarrollador Full Stack",
      period: "2022 - Presente",
      description: [
        "Desarrollo de aplicaciones web utilizando React y Node.js",
        "Creación de APIs RESTful con Express y MongoDB",
        "Implementación de interfaces de usuario responsivas con HTML, CSS y JavaScript",
      ],
      icon: <FaLaptopCode />,
    },
    {
      company: "Proyectos Académicos",
      position: "Desarrollador de Software",
      period: "2020 - 2022",
      description: [
        "Desarrollo de aplicaciones móviles con Flutter",
        "Creación de juegos y aplicaciones interactivas con JavaScript",
        "Implementación de algoritmos y estructuras de datos en C++",
      ],
      icon: <FaGraduationCap />,
    },
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Juan Pérez",
      position: "CEO, TechCorp",
      content:
        "Omar es un desarrollador excepcional. Su trabajo en nuestro proyecto fue impecable y entregado a tiempo.",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "María González",
      position: "CTO, InnovaSoft",
      content:
        "La capacidad de Omar para resolver problemas complejos es impresionante. Recomiendo altamente sus servicios.",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Carlos Rodríguez",
      position: "Líder de Proyecto, DataTech",
      content:
        "Omar demostró gran habilidad en el desarrollo de nuestra aplicación móvil. Su código es limpio y eficiente.",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  ];

  if (isLoading) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 text-white"
        aria-label="Cargando contenido, por favor espere"
      >
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 360, 0],
            backgroundColor: ["#3b82f6", "#6366f1", "#3b82f6"],
            borderRadius: ["20%", "50%", "20%"],
          }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          {/* Capa adicional de pulso */}
          <motion.div
            className="absolute inset-0 w-full h-full bg-blue-500 rounded-full opacity-50"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 0.3, 0.6],
            }}
            transition={{
              duration: 1.8,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />

          {/* Ícono central con rebote */}
          <motion.div
            className="w-16 h-16 bg-blue-500 rounded-full shadow-2xl"
            animate={{
              scale: [0.9, 1.3, 0.9],
              rotate: [0, 360, 0],
              borderRadius: ["50%", "20%", "50%"],
              boxShadow: [
                "0px 0px 10px rgba(59, 130, 246, 0.5)",
                "0px 0px 20px rgba(99, 102, 241, 0.7)",
                "0px 0px 10px rgba(59, 130, 246, 0.5)",
              ],
            }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        </motion.div>

        {/* Texto de carga animado */}
        <motion.p
          className="absolute bottom-10 text-lg text-gray-300"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: [10, -10, 10], opacity: [0, 1, 0] }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          Cargando...
        </motion.p>
      </div>
    );
  }

  return (
    <ParallaxProvider>
      <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <motion.nav
      className="bg-white dark:bg-gray-800 shadow-lg fixed w-full z-50 transition-colors duration-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ 
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <motion.div
            className="flex-shrink-0 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 10
            }}
          >
            <FaCode 
              className="w-6 h-6 text-blue-500" 
              style={{ 
                filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))" 
              }}
            />
            <div className="flex flex-col">
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-size-200 animate-gradient">
                Omar Palomares
              </h1>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Full Stack Developer
              </span>
            </div>
          </motion.div>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8">
                  {[
                    "inicio",
                    "proyectos",
                    "habilidades",
                    "experiencia",
                    "testimonios",
                    "contacto",
                  ].map((item) => (
                    <motion.button
                      key={item}
                      onClick={() => {
                        handleScroll(
                          item === "inicio"
                            ? inicioref
                            : item === "proyectos"
                            ? proyectosRef
                            : item === "habilidades"
                            ? habilidadesRef
                            : item === "experiencia"
                            ? experienciaRef
                            : item === "testimonios"
                            ? testimoniosRef
                            : contactoRef
                        );
                      }}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        activeSection === item
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </motion.button>
                  ))}
                  {/* Dark Mode Button */}
                  <motion.button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {darkMode ? <FaSun /> : <FaMoon />}
                  </motion.button>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden flex items-center">
                  {/* Botón de modo oscuro */}
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
                    {isMenuOpen ? <XIcon /> : <MenuIcon />}
                  </motion.button>
                </div>
              </div>
            </div>
            {/* Mobile Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  className="md:hidden"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {[
                      "inicio",
                      "proyectos",
                      "habilidades",
                      "experiencia",
                      "testimonios",
                    ].map((item) => (
                      <motion.button
                        key={item}
                        onClick={() => {
                          handleScroll(
                            item === "inicio"
                              ? inicioref
                              : item === "proyectos"
                              ? proyectosRef
                              : item === "habilidades"
                              ? habilidadesRef
                              : item === "experiencia"
                              ? experienciaRef
                              : item === "testimonios"
                              ? testimoniosRef
                              : contactoRef
                          );
                          setIsMenuOpen(false);
                        }}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 w-full text-left"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>

          {/* Progress Bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-blue-500 z-50"
            style={{ scaleX: scrollYProgress }}
          />

          {/* Modified Hero Section */}
          <section className="min-h-screen pt-20 relative overflow-hidden flex items-center">
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
                    className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r 
                from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 leading-tight"
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
            <motion.div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden-on-mobile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-gray-400 dark:text-gray-500"
              >
                <div
                  onClick={() => handleScroll(contactoRef)}
                  className="cursor-pointer flex items-center justify-center transition-colors duration-200"
                >
                  <ChevronDownIcon className="h-8 w-8" />
                </div>
              </motion.div>
            </motion.div>
          </section>

          {/* Projects Section */}
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

          {/* Skills Section */}
          <section
            ref={habilidadesRef}
            id="habilidades"
            className="py-16 bg-gray-50 dark:bg-gray-900"
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

          {/* Experience Section */}
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

          {/* Testimonials Section */}
          <section
            ref={testimoniosRef}
            id="testimonios"
            className="py-16 bg-gray-50 dark:bg-gray-900"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.h2
                className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Testimonios
              </motion.h2>
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <SwiperSlide key={index}>
                    <TestimonialCard testimonial={testimonial} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>
          {/* Contact Section */}

          <ContactSection contactoRef={contactoRef} />

          {/* Footer */}
          <footer ref={footeref} className="bg-gray-900 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-center md:text-left">
                  &copy; {new Date().getFullYear()} Omar Palomares. Todos los
                  derechos reservados.
                </p>
                <div className="flex space-x-4">
                  <SocialIcon
                    href="https://github.com/omarPVP123131"
                    icon={<FaGithub size={20} />}
                    label="GitHub"
                  />
                  <SocialIcon
                    href="#"
                    icon={<FaLinkedin size={20} />}
                    label="LinkedIn"
                  />
                  <SocialIcon
                  href="mailto:omarpalvel@gmail.com"
                  icon={<FaEnvelope size={20} />}
                    label="Email"
                  />
                </div>
              </div>
            </div>
          </footer>

          {/* Scroll to top button */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                className="fixed bottom-4 right-4 bg-blue-600 text-white p-2 rounded-full shadow-lg dark:bg-blue-500"
                onClick={scrollToTop}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaArrowUp />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ParallaxProvider>
  );
};

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

const SkillCard: React.FC<{ skill: Skill; index: number }> = ({
  skill,
  index,
}) => {
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

      <style>{`
  @keyframes shine {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(100%);
    }
  }
  .animate-shine {
    animation: shine 2s infinite linear;
  }
`}</style>
    </motion.div>
  );
};

const ExperienceCard: React.FC<{ experience: Experience; index: number }> = ({
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

const TestimonialCard: React.FC<{
  testimonial: Testimonial;
  index?: number;
}> = ({ testimonial, index = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500" />

      <div className="relative">
        <div className="absolute -top-2 -left-2 text-6xl text-blue-500/20 dark:text-blue-400/20 font-serif">
          "
        </div>

        <p className="text-gray-600 dark:text-gray-300 italic mb-6 relative z-10 pt-4">
          {testimonial.content}
        </p>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-md"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-pulse" />
          </div>

          <div>
            <h4 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {testimonial.name}
            </h4>
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {testimonial.position}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-b-xl"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: inView ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
    </motion.div>
  );
};
const SocialIcon: React.FC<{
  href: string;
  icon: React.ReactNode;
  label: string;
}> = ({ href, icon, label }) => (
  <motion.a
    href={href}
    className="text-gray-400 hover:text-blue-400 dark:text-gray-300 dark:hover:text-blue-300 transition-colors"
    aria-label={label}
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
  >
    {icon}
  </motion.a>
);

const InputField: React.FC<{
  label: string;
  id: string;
  type: string;
  required: boolean;
}> = ({ label, id, type, required }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      required={required}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    />
  </div>
);

export default App;
