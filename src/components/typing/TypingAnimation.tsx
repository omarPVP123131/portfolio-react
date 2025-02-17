import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypingAnimationProps {
  darkMode: boolean;
}

const phrases = [
  { text: "Desarrollador Full Stack", icon: "👨‍💻" },
  { text: "Experto en React y Node.js", icon: "⚛️" },
  { text: "Creador de soluciones innovadoras", icon: "💡" },
  { text: "Desarrollador de aplicaciones móviles", icon: "📱" },
  { text: "Especialista en bases de datos", icon: "🗄️" },
  { text: "Consultor en ciberseguridad", icon: "🔒" },
  { text: "Entusiasta de la IA", icon: "🤖" },
  { text: "Desarrollador de APIs RESTful", icon: "🌐" },
  { text: "Ingeniero de software UX/UI", icon: "🎨" },
  { text: "Mentor tecnológico", icon: "🎓" },
];

export const TypingAnimation: React.FC<TypingAnimationProps> = ({ darkMode }) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">(
    "typing"
  );

  const currentPhrase = phrases[currentPhraseIndex].text;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (phase === "typing") {
      if (displayedText.length < currentPhrase.length) {
        timeoutId = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
        }, 80);
      } else {
        // Terminado de escribir, pasamos a pausa
        timeoutId = setTimeout(() => setPhase("pausing"), 500);
      }
    } else if (phase === "pausing") {
      // Mostramos el ícono durante la pausa
      timeoutId = setTimeout(() => setPhase("deleting"), 2500);
    } else if (phase === "deleting") {
      if (displayedText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length - 1));
        }, 30);
      } else {
        // Reiniciamos para la siguiente frase
        setPhase("typing");
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayedText, phase, currentPhrase]);

  return (
    <motion.div className="flex items-center gap-3 min-h-[2em]">
      <motion.span
        className={`text-xl md:text-2xl font-medium ${
          darkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {displayedText}
        <motion.span
          className={`inline-block w-[2px] h-[1.2em] ml-1 ${
            darkMode ? "bg-blue-400" : "bg-blue-600"
          }`}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      </motion.span>

      <AnimatePresence>
        {phase === "pausing" && (
          <motion.span
            key="icon"
            className="text-3xl"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            {phrases[currentPhraseIndex].icon}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
