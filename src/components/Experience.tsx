import { memo } from "react";
import { useExperienceAnimation } from "../hooks/useExperienceAnimation";
import { PositionedOrbital } from "./PositionedOrbital";
import { experiences } from "../utils/dataCache";
import { SectionTitle } from "./SectionTitle";
import { Paragraph } from "./Paragraph";

export const Experience = memo(() => {
  const sectionRef = useExperienceAnimation();

  return (
    <section
      ref={sectionRef}
      className="min-h-screen w-full flex items-center py-20 md:py-32 relative overflow-hidden bg-gray-50"
    >
      <PositionedOrbital position="top-left" size="large" />

      <div className="w-full px-8 md:px-16 relative z-10">
        <SectionTitle className="experience-title mb-16 md:mb-24">
          Experience
        </SectionTitle>

        <div className="max-w-5xl mx-auto space-y-12 md:space-y-16">
          {experiences.map((exp) => (
            <div key={exp.id} className="experience-item">
              <div className="relative z-20">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black mb-2">
                  {exp.title}
                </h3>
                <p className="text-xl md:text-2xl text-gray-900 mb-4">
                  {exp.company} • {exp.location} • {exp.period}
                </p>
                <ul className="space-y-3 mb-6">
                  {exp.responsibilities.map((responsibility, index) => (
                    <li
                      key={index}
                      className="flex items-start"
                    >
                      <span className="mr-3 mt-2 w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0"></span>
                      <Paragraph size="base" className="flex-1">
                        {responsibility}
                      </Paragraph>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-sm md:text-base font-semibold bg-gray-200 text-gray-800 rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Experience.displayName = "Experience";

