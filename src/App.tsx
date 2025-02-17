import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { ParallaxProvider } from "react-scroll-parallax";
import { FaArrowUp } from "react-icons/fa";
import { Toaster } from "sonner";

// Componentes
import { Loading } from "./components/loading";
import { Navbar } from "./components/navbar";
import { HeroSection } from "./components/main/herosection";
import { ProjectsSection } from "./components/main/proyects";
import { SkillsSection } from "./components/main/skill";
import ContactSection from "./components/main/ContactSection";
import { ExperienceSection } from "./components/main/experience";
import { Footer } from "./components/main/footer";

// Estilos
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "react-circular-progressbar/dist/styles.css";
import "./app.css";

// Tipos
type SectionRefs = {
  inicio: React.RefObject<HTMLElement>;
  proyectos: React.RefObject<HTMLElement>;
  habilidades: React.RefObject<HTMLElement>;
  experiencia: React.RefObject<HTMLElement>;
  testimonios: React.RefObject<HTMLElement>;
  contacto: React.RefObject<HTMLElement>;
};

export const App = () => {
  // Custom hook para manejar el scroll al tope
  const useScrollToTop = (threshold = 300) => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setShowButton(window.scrollY > threshold);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [threshold]);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return { showButton, scrollToTop };
  };

  // Estados
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("inicio");
  const { scrollYProgress } = useScroll();
  const { showButton, scrollToTop } = useScrollToTop();

  // Referencias para las secciones
  const sectionRefs: SectionRefs = {
    inicio: useRef<HTMLElement>(null),
    proyectos: useRef<HTMLElement>(null),
    habilidades: useRef<HTMLElement>(null),
    experiencia: useRef<HTMLElement>(null),
    testimonios: useRef<HTMLElement>(null),
    contacto: useRef<HTMLElement>(null),
  };

  // Handlers
  const handleScroll = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  // Efecto de carga
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // IntersectionObserver para actualizar la sección activa
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target.getAttribute("data-section");
            if (section) {
              setActiveSection(section);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [sectionRefs]);

  if (isLoading) return <Loading />;

  return (
    <ParallaxProvider>
      <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
        <Toaster position="top-right" expand={true} richColors />
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
          <Navbar
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            activeSection={activeSection}
            handleScroll={handleScroll}
            refs={sectionRefs}
          />

          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-blue-500 z-50"
            style={{ scaleX: scrollYProgress }}
          />

          <main>
            <section ref={sectionRefs.inicio} data-section="inicio">
              <HeroSection
                darkMode={darkMode}
                handleScroll={handleScroll}
                inicioRef={sectionRefs.inicio}
                proyectosRef={sectionRefs.proyectos}
              />
            </section>

            <section ref={sectionRefs.proyectos} data-section="proyectos">
              <ProjectsSection
                darkMode={darkMode}
                handleScroll={handleScroll}
                proyectosRef={sectionRefs.proyectos}
              />
            </section>

            <section ref={sectionRefs.habilidades} data-section="habilidades">
              <SkillsSection
                darkMode={darkMode}
                handleScroll={handleScroll}
                habilidadesRef={sectionRefs.habilidades}
              />
            </section>

            <section ref={sectionRefs.experiencia} data-section="experiencia">
              <ExperienceSection
                darkMode={darkMode}
                handleScroll={handleScroll}
                experienciaRef={sectionRefs.experiencia}
              />
            </section>

            <section ref={sectionRefs.testimonios} data-section="testimonios">
              {/* Agrega el componente de testimonios si existe */}
            </section>

            <section ref={sectionRefs.contacto} data-section="contacto">
              <ContactSection contactoRef={sectionRefs.contacto} />
            </section>
          </main>

          <Footer darkMode={darkMode} />

          <AnimatePresence>
            {showButton && (
              <motion.button
                className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-xl dark:bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out transform hover:scale-110 focus:outline-none"
                onClick={scrollToTop}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Volver arriba"
              >
                <FaArrowUp size={24} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ParallaxProvider>
  );
};

export default App;