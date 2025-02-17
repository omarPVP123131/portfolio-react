import { Experience } from "../types";
import { FaLaptopCode, FaGraduationCap, FaBriefcase, FaIndustry } from "react-icons/fa";

const experiences: Experience[] = [
  {
    company: "Freelance",
    position: "Desarrollador Full Stack",
    period: "2022 - Presente",
    description: [
      "Desarrollo de aplicaciones web utilizando React y Node.js.",
      "Creación de APIs RESTful con Express y MongoDB.",
      "Implementación de interfaces de usuario responsivas con HTML, CSS y JavaScript.",
      "Integración de servicios de terceros y optimización de rendimiento.",
    ],
    icon: <FaLaptopCode />,
  },
  {
    company: "Proyectos Académicos",
    position: "Desarrollador de Software",
    period: "2020 - 2022",
    description: [
      "Desarrollo de aplicaciones móviles con Flutter.",
      "Creación de juegos y aplicaciones interactivas con JavaScript.",
      "Implementación de algoritmos y estructuras de datos en C++.",
      "Colaboración en equipo multidisciplinario para proyectos innovadores.",
    ],
    icon: <FaGraduationCap />,
  },
  {
    company: "Tech Solutions Inc.",
    position: "Ingeniero de Software",
    period: "2018 - 2020",
    description: [
      "Diseño e implementación de soluciones escalables en entornos empresariales.",
      "Mantenimiento y mejora continua de sistemas legados utilizando Java y Spring Boot.",
      "Desarrollo de aplicaciones web modernas y responsivas.",
      "Realización de pruebas unitarias y de integración para garantizar calidad.",
    ],
    icon: <FaBriefcase />,
  },
  {
    company: "Startup XYZ",
    position: "Desarrollador de Innovación",
    period: "2016 - 2018",
    description: [
      "Desarrollo de prototipos de software y validación de conceptos.",
      "Implementación de soluciones IoT y aplicaciones móviles híbridas.",
      "Optimización de procesos internos a través de herramientas automatizadas.",
      "Colaboración con equipos de diseño y marketing para mejorar la experiencia del usuario.",
    ],
    icon: <FaIndustry />,
  },
];

export default experiences;