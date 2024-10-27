import React from 'react';
import { motion } from 'framer-motion';
import Typing from 'react-typing-animation';

const TypingAnimation: React.FC = () => {
    const phrases = [
      "Desarrollador Full Stack",
      "Experto en React y Node.js",
      "Creador de soluciones innovadoras",
    ];
  
    return (
      <motion.div
        className="mt-3 max-w-md mx-auto text-base text-gray-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Typing loop={true} speed={100}>
          {phrases.map((phrase, index) => (
            <React.Fragment key={index}>
              <span>{phrase}</span>
              {/* Cambiar count a la longitud de la frase actual */}
              <Typing.Backspace count={phrase.length} delay={2000} />
            </React.Fragment>
          ))}
          {/* Asegúrate de que Typing.Reset se llame correctamente */}
          <Typing.Reset delay={500} />
        </Typing>
      </motion.div>
    );
  };
  
  export default TypingAnimation;