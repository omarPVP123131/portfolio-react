import { Skill } from "../types";
import {
  FaCode,
  FaReact,
  FaNodeJs,
  FaPython,
} from "react-icons/fa";
import { SiCplusplus } from "react-icons/si";
import { RiFlutterFill } from "react-icons/ri";

const skills: Skill[] = [
  { name: "JavaScript", level: 90, icon: <FaCode /> },
  { name: "React", level: 85, icon: <FaReact /> },
  { name: "Node.js", level: 80, icon: <FaNodeJs /> },
  { name: "Python", level: 75, icon: <FaPython /> },
  { name: "C++", level: 80, icon: <SiCplusplus /> },
  { name: "Flutter", level: 65, icon: <RiFlutterFill /> },
];

export default skills;
