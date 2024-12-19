import { Experience } from "../types";
import { FaLaptopCode, FaGraduationCap } from "react-icons/fa";

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

export default experiences;