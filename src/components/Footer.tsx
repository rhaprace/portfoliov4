import { memo } from "react";
import { SectionSeparator } from "./SectionSeparator";

export const Footer = memo(() => {
  const currentYear = new Date().getFullYear();

  const techStack = [
    "React",
    "React Native",
    "Node.js",
    "JavaScript",
    "Supabase",
    "PostgreSQL",
    "MongoDB",
    "Docker",
    "Git",
    "Tailwind CSS",
    "Expo",
  ];

  return (
    <footer className="w-full bg-white">
      <SectionSeparator />
      <div className="px-8 md:px-16 py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black mb-3">
              Tech Stack
            </h3>
            <p className="text-sm md:text-base text-gray-600 font-medium">
              Technologies I work with
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12 max-w-4xl mx-auto">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 text-sm md:text-base font-semibold bg-gray-100 text-gray-800 rounded-lg hover:bg-black hover:text-white transition-colors duration-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12 max-w-4xl mx-auto">
            <SectionSeparator />
          </div>

          <div className="text-center">
            <p className="text-sm md:text-base text-gray-600 font-medium mb-2">
              Crafting beautiful digital experiences, one line of code at a time.
            </p>
            <p className="text-sm text-gray-500">
              © {currentYear} Made with <span className="text-red-500">❤️</span> by Rafael Race
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

