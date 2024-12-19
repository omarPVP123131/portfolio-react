import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { ParallaxProvider } from "react-scroll-parallax";
import "react-circular-progressbar/dist/styles.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "react-circular-progressbar/dist/styles.css";
import "swiper/css/autoplay";
import "./app.css";
import ContactSection from "./components/main/ContactSection";
import { Loading } from "./components/loading";
import { Navbar } from "./components/navbar";
import { HeroSection } from "./components/main/herosection";
import { ProjectsSection } from "./components/main/proyects";
import { SkillsSection } from "./components/main/skill";
import Footer from "./components/main/footer";
import { FaArrowUp } from "react-icons/fa";
import ExperienceSection from "./components/main/experience";
import TestimonialSection from "./components/main/testimonials";

export const App = () => {
  // Estados
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeSection] = useState<string>("inicio");
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { scrollYProgress } = useScroll();

  // Referencias para las secciones
  const proyectosRef = useRef<HTMLDivElement>(null);
  const habilidadesRef = useRef<HTMLDivElement>(null);
  const experienciaRef = useRef<HTMLDivElement>(null);
  const testimoniosRef = useRef<HTMLDivElement>(null);
  const contactoRef = useRef<HTMLDivElement>(null);
  const inicioRef = useRef<HTMLDivElement>(null);

  // Objeto de referencias para pasar al Navbar
  const refs = {
    inicio: inicioRef,
    proyectos: proyectosRef,
    habilidades: habilidadesRef,
    experiencia: experienciaRef,
    testimonios: testimoniosRef,
    contacto: contactoRef,
  };

  // Función para manejar el scroll
  const handleScroll = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false); // Cierra el menú móvil después de hacer clic
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

  if (isLoading) {
    return <div>{isLoading ? <Loading /> : <div></div>}</div>;
  }

  return (
    <ParallaxProvider>
      <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
          <Navbar
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            activeSection={activeSection}
            handleScroll={handleScroll}
            refs={refs}
          />

          {/* Progress Bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-blue-500 z-50"
            style={{ scaleX: scrollYProgress }}
          />

          <HeroSection
            darkMode={darkMode}
            handleScroll={handleScroll}
            inicioRef={inicioRef}
            proyectosRef={proyectosRef}
          />

          {/* Projects Section */}
          <ProjectsSection
            darkMode={darkMode}
            handleScroll={handleScroll}
            proyectosRef={proyectosRef}
          />

          <SkillsSection
            darkMode={darkMode}
            handleScroll={handleScroll}
            habilidadesRef={habilidadesRef}
          />
          <ExperienceSection
            darkMode={darkMode}
            handleScroll={handleScroll}
            experienciaRef={experienciaRef}
          />
          <TestimonialSection
            darkMode={darkMode}
            handleScroll={handleScroll}
            testimoniosRef={testimoniosRef}
          />

          {/* Contact Section */}
          <ContactSection contactoRef={contactoRef} />

          {/* Projects Section */}
          <Footer darkMode={darkMode} />

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


export default App;
