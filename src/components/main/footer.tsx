import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa"; // Asegúrate de tener estas dependencias instaladas
import { SocialIcon } from "../icons";
import { motion } from "framer-motion";

interface FooterProps {
  darkMode: boolean;
}
  
export const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  return (
      <footer className="relative bg-gradient-to-b from-gray-900 to-black text-white py-12 overflow-hidden">
        {/* Fondo mejorado sin grid.svg */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Omar Palomares
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Desarrollador web especializado en crear experiencias digitales únicas y memorables.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-300">Contacto</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">
                  <span className="text-blue-400">Email:</span> omarpalvel@gmail.com
                </li>
                <li className="text-gray-400">
                  <span className="text-blue-400">Ubicación:</span> México
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-300">Redes Sociales</h4>
              <div className="flex space-x-4">
                <SocialIcon
                  href="https://github.com/omarPVP123131"
                  icon={
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaGithub size={24} />
                    </motion.div>
                  }
                  label="GitHub"
                />
                <SocialIcon
                  href="https://www.linkedin.com/in/omar-palomares/"
                  icon={
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaLinkedin size={24} />
                    </motion.div>
                  }
                  label="LinkedIn"
                />
                <SocialIcon
                  href="mailto:omarpalvel@gmail.com"
                  icon={
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaEnvelope size={24} />
                    </motion.div>
                  }
                  label="Email"
                />
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Omar Palomares. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;