import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa"; // Asegúrate de tener estas dependencias instaladas
import {SocialIcon} from "../icons"

interface FooterProps {
    darkMode: boolean;
  }
  
  export const Footer: React.FC<FooterProps> = ({
    darkMode,
  }) => {
    return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} Omar Palomares. Todos los derechos
            reservados.
          </p>
          <div className="flex space-x-4">
            <SocialIcon
              href="https://github.com/omarPVP123131"
              icon={<FaGithub size={20} />}
              label="GitHub"
            />
            <SocialIcon
              href="https://www.linkedin.com/in/omar-palomares/"
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
  );
};

export default Footer;
