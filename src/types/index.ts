export type Project = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  github?: string;
};

export type Skill = {
  name: string;
  level: number;
  icon: JSX.Element;
};

export type Experience = {
  company: string;
  position: string;
  period: string;
  description: string[];
  icon: React.ReactNode;
  skills?: string[]; // ahora es opcional
};


export type Testimonial = {
  name: string;
  position: string;
  content: string;
  avatar: string;
};

export interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  activeSection: string;
  handleScroll: (ref: React.RefObject<HTMLElement>) => void;
  refs: {
    inicio: React.RefObject<HTMLElement>;
    proyectos: React.RefObject<HTMLElement>;
    habilidades: React.RefObject<HTMLElement>;
    experiencia: React.RefObject<HTMLElement>;
    testimonios: React.RefObject<HTMLElement>;
    contacto: React.RefObject<HTMLElement>;
  };
}
export interface MenuItem {
  name: string;
  ref: React.RefObject<HTMLElement>;
}

export interface Section {
  id: string;
  ref: React.RefObject<HTMLElement>;
  title: string;
}