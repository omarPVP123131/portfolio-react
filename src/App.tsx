import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
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
} from "react-icons/fa";
import { SiCplusplus } from "react-icons/si";
import { RiFlutterFill } from "react-icons/ri";
import { useInView } from "react-intersection-observer";
import Typing from "react-typing-animation";
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
import TypingAnimation from './TypingAnimation'; // Ajusta la ruta según tu estructura de carpetas

// Tipos
type Project = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
};

type Skill = {
  name: string;
  level: number;
  icon: React.ReactNode;
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

const ChevronDownIcon: React.FC = () => (
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
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("inicio");
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { scrollYProgress } = useScroll();
  const headerRef = useRef<HTMLDivElement>(null);

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
      title: "Proyecto Integrador",
      description:
        "Aplicación web para gestionar proyectos integradores utilizando React y Express.",
      tags: ["React", "Express", "MongoDB"],
      image: "/placeholder.svg?height=300&width=400",
      link: "https://github.com/omarPVP123131/proyecto-integrador",
    },
    {
      title: "Juego de Memoria",
      description: "Juego de memoria implementado con HTML, CSS y JavaScript.",
      tags: ["HTML", "CSS", "JavaScript"],
      image: "/placeholder.svg?height=300&width=400",
      link: "https://github.com/omarPVP123131/juego-de-memoria",
    },
    {
      title: "API de Películas",
      description:
        "API RESTful para gestionar información de películas utilizando Node.js y Express.",
      tags: ["Node.js", "Express", "MongoDB"],
      image: "/placeholder.svg?height=300&width=400",
      link: "https://github.com/omarPVP123131/api-peliculas",
    },
  ];

  const skills: Skill[] = [
    { name: "JavaScript", level: 90, icon: <FaCode /> },
    { name: "React", level: 85, icon: <FaReact /> },
    { name: "Node.js", level: 80, icon: <FaNodeJs /> },
    { name: "Python", level: 75, icon: <FaPython /> },
    { name: "C++", level: 70, icon: <SiCplusplus /> },
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para manejar el envío del formulario
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 text-white">
        <motion.div
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 270, 270, 0],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1,
          }}
          className="w-16 h-16 bg-blue-500"
        />
      </div>
    );
  }

  
  return (
    <ParallaxProvider>
      <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
          {/* Navbar */}
          <motion.nav
            className="bg-white dark:bg-gray-800 shadow-lg fixed w-full z-50 transition-colors duration-300"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex justify-between items-center h-16">
                <motion.div
                  className="flex-shrink-0 flex items-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                    Omar Palomares
                  </h1>
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
                      onClick={() => setActiveSection(item)}
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
                      "contacto",
                    ].map((item) => (
                      <motion.button
                        key={item}
                        onClick={() => {
                          setActiveSection(item);
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

          {/* Hero Section */}
          <section className="pt-20 pb-10 bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center py-16">
                <motion.h1
                  className="text-4xl  tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Omar Palomares Velasco
                </motion.h1>
                <TypingAnimation />

                <motion.div
                  className="mt-5 flex justify-center space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <motion.a
                    href="#proyectos"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Ver Proyectos
                    <ChevronDownIcon />
                  </motion.a>
                  <motion.a
                    href="/cv/cv.pdf"
                    download
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Descargar CV
                    <FaDownload className="ml-2" />
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="proyectos" className="py-16 bg-white dark:bg-gray-800">
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
          <section id="experiencia" className="py-16 bg-white dark:bg-gray-800">
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
                  640: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 3,
                  },
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
          <section id="contacto" className="py-16 bg-white dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.h2
                className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Contacto
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    ¡Conectemos!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Estoy disponible para proyectos freelance y oportunidades
                    laborales.
                  </p>
                  <div className="flex space-x-4">
                    <SocialIcon
                      href="https://github.com/omarPVP123131"
                      icon={<FaGithub size={24} />}
                      label="GitHub"
                    />
                    <SocialIcon
                      href="#"
                      icon={<FaLinkedin size={24} />}
                      label="LinkedIn"
                    />
                    <SocialIcon
                      href="mailto:tu-email@ejemplo.com"
                      icon={<FaEnvelope size={24} />}
                      label="Email"
                    />
                  </div>
                </motion.div>
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <InputField label="Nombre" id="name" type="text" required />
                  <InputField label="Email" id="email" type="email" required />
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    ></textarea>
                  </div>
                  <motion.button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Enviar Mensaje
                  </motion.button>
                </motion.form>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gray-900 text-white py-8">
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
                    href="mailto:tu-email@ejemplo.com"
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
    <Tilt options={{ max: 25, scale: 1.05 }}>
      <motion.div
        ref={ref}
        className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-105"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {project.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href={project.link}
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver Proyecto
          </a>
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

  return (
    <motion.div
      ref={ref}
      className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-lg font-medium text-gray-900 dark:text-white">
          {skill.name}
        </span>
        {skill.icon}
      </div>
      <div className="w-full h-4 bg-gray-200 dark:bg-gray-600 rounded-full">
        <motion.div
          className="h-full bg-blue-600 dark:bg-blue-400 rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
      <div className="mt-2 text-right">
        <CountUp end={skill.level} suffix="%" duration={2} />
      </div>
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
      className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex items-center mb-4">
        <div className="mr-4 text-blue-600 dark:text-blue-400">
          {experience.icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {experience.position}
          </h3>
          <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
            {experience.company}
          </h4>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {experience.period}
      </p>
      <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
        {experience.description.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </motion.div>
  );
};

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => {
  return (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h4 className="text-lg font-bold text-gray-900 dark:text-white">
            {testimonial.name}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {testimonial.position}
          </p>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 italic">
        "{testimonial.content}"
      </p>
    </div>
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
