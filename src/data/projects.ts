export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  images: string[];
  liveUrl?: string;
  repoUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "QuakeSafe",
    description: "An earthquake safety and preparedness application with interactive maps, real-time alerts, and offline-first capabilities for emergency situations",
    tags: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "TanStack Query", "Leaflet", "i18next", "PWA", "Vercel"],
    images: ["/projects/quake-safe.png"],
    liveUrl: "https://quakesafe-beta.vercel.app/",
    repoUrl: "https://github.com/rhaprace/quakesafe",
  },
  {
    id: 2,
    title: "Portfolio",
    description: "My personal portfolio website built with React, TypeScript, and Tailwind CSS. Features include a hero section, about me section, experience section, and a projects section.",
    tags: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "GSAP", "React Responsive"],
    images: ["/projects/portfolio.png"],
    liveUrl: "https://rhaprace.github.io",
    repoUrl: "https://github.com/rhaprace/rhaprace.github.io",
  },
  {
    id: 3,
    title: "NutriMate",
    description: "NutriMate is a smart nutrition tracking and meal logging web application designed to help users monitor their daily food intake, track macronutrients, and achieve their health goals.",
    tags: ["React 18", "TypeScript" ,"Zustand","Tailwind CSS","MongoDB","Jotai","Lucide React","Zod","Node.js","Express.js","node-cron","JWT"],
    images: ["/projects/Nutrimate/login.png", "/projects/Nutrimate/dashboard.png", "/projects/Nutrimate/history.png"],
  },
];



