export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  status: "current" | "past";
  responsibilities: string[];
  technologies: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: "maplab-fullstack",
    title: "Junior Full Stack Developer",
    company: "Map Lab",
    location: "Remote",
    period: "2025 – Present",
    status: "current",
    responsibilities: [
      "Developing Lexi Quest, a quest based React Native language learning app.",
      "Built features for AI-powered phrase building, vocabulary exploration, and cultural deep-dives.",
      "Enhanced app UI/UX, making language learning engaging and interactive.",
    ],
    technologies: [
      "React Native",
      "Supabase",
      "PowerSync",
      "TypeScript",
      "Expo",
      "EAS",
      "Github Actions",
      "Docker",
      "Lolli",
    ],
  },
];

