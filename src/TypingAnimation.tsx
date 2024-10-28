import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./typing.css";

interface TypingAnimationProps {
  darkMode: boolean;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({ darkMode }) => {
  const phrases = [
    "Desarrollador Full Stack",
    "Experto en React y Node.js",
    "Creador de soluciones innovadoras",
    "Apasionado por el diseño de interfaces",
    "Entusiasta de la programación ágil",
    "Desarrollador de aplicaciones móviles",
    "Especialista en bases de datos",
    "Amante del código limpio y mantenible",
    "Consultor en ciberseguridad",
    "Entusiasta de la inteligencia artificial",
    "Colaborador en proyectos de código abierto",
    "Instructor de programación",
    "Desarrollador de APIs RESTful",
    "Experto en desarrollo de software escalable",
    "Ingeniero de software con enfoque en UX/UI",
    "Desarrollador de microservicios",
    "Facilitador de talleres de tecnología",
    "Analista de datos y visualización",
    "Mentor para nuevos desarrolladores",
    "Aficionado a las últimas tendencias tecnológicas",
  ];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const typingEffect = setTimeout(() => {
      if (!isDeleting && displayedText.length < currentPhrase.length) {
        setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
      } else if (isDeleting && displayedText.length > 0) {
        setDisplayedText(currentPhrase.slice(0, displayedText.length - 1));
      } else {
        setIsDeleting(!isDeleting);
        if (!isDeleting) {
          setTimeout(() => {
            setCurrentPhraseIndex(
              (prevIndex) => (prevIndex + 1) % phrases.length
            );
          }, 1800); // Mayor pausa entre frases
        }
      }
    }, typingSpeed);

    return () => clearTimeout(typingEffect);
  }, [displayedText, isDeleting, phrases, currentPhraseIndex]);

  return (
    <motion.div
      className={`typing-container ${darkMode ? "dark-text" : "light-text"}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {displayedText}
      <span className="blinking-cursor">|</span>
    </motion.div>
  );
};

export default TypingAnimation;
