export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  images: number;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with real-time inventory management",
    tags: ["React", "Node.js", "MongoDB"],
    images: 3,
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "Modern portfolio with advanced animations and smooth interactions",
    tags: ["React", "GSAP", "Tailwind"],
    images: 3,
  },
  {
    id: 3,
    title: "Task Management App",
    description: "Collaborative task management with real-time updates",
    tags: ["TypeScript", "Firebase", "Vite"],
    images: 3,
  },
];

