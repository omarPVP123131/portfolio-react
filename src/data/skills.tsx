import { Skill } from "../types";
import {
  FaCode,
  FaReact,
  FaNodeJs,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaJava,
  FaDatabase,
} from "react-icons/fa";
import { SiCplusplus, SiCsharp, SiTypescript } from "react-icons/si";
import { RiFlutterFill } from "react-icons/ri";

const skills: Skill[] = [
  { name: "JavaScript", level: 90, icon: <FaCode /> },
  { name: "React", level: 85, icon: <FaReact /> },
  { name: "Node.js", level: 80, icon: <FaNodeJs /> },
  { name: "Python", level: 75, icon: <FaPython /> },
  { name: "C++", level: 80, icon: <SiCplusplus /> },
  { name: "Flutter", level: 65, icon: <RiFlutterFill /> },
  { name: "TypeScript", level: 80, icon: <SiTypescript /> },
  { name: "Java", level: 70, icon: <FaJava /> },
  { name: "C#", level: 65, icon: <SiCsharp /> },
  { name: "HTML5", level: 90, icon: <FaHtml5 /> },
  { name: "CSS3", level: 85, icon: <FaCss3Alt /> },
  { name: "SQL", level: 75, icon: <FaDatabase /> },
];

export default skills;