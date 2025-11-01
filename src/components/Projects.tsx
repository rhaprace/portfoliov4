import { memo } from "react";
import { projects } from "../utils/dataCache";
import { useProjectsAnimation } from "../hooks/useProjectsAnimation";
import { SectionSeparator } from "./SectionSeparator";
import { SectionTitle } from "./SectionTitle";

export const Projects = memo(() => {
  const sectionRef = useProjectsAnimation();

  return (
    <section ref={sectionRef} className="w-full bg-white overflow-hidden">
      <div className="px-8 md:px-16 py-20">
        <SectionTitle className="mb-20">
          Projects
        </SectionTitle>
      </div>

      {projects.map((project, index) => (
        <div key={project.id}>
          <div
            className={`project-${project.id} relative py-12 md:py-16 lg:py-20 lg:min-h-screen`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div className="px-8 md:px-16 lg:pl-16 lg:pr-8">
                <div className={`project-${project.id}-title lg:sticky lg:top-32 transition-opacity duration-200`}>
                  <div className="mb-6">
                    <div className={`project-${project.id}-indicator h-1 w-16 bg-black mb-4`}></div>
                    <span className="text-sm font-bold tracking-widest uppercase text-gray-400">
                      0{project.id}
                    </span>
                  </div>
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-base md:text-lg text-gray-600 mb-8 max-w-md leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-semibold text-gray-600 bg-gray-100 px-4 py-2 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className={`project-${project.id}-images px-8 md:px-16 lg:pr-16 lg:pl-8 space-y-6 md:space-y-8 lg:space-y-12 pb-8 lg:pb-20`}>
                {Array.from({ length: project.images }).map((_, imgIndex) => (
                  <div
                    key={imgIndex}
                    className={`project-${project.id}-image w-full aspect-[16/10] md:aspect-[4/3] lg:aspect-[3/2] bg-gray-100 overflow-hidden rounded-2xl shadow-lg`}
                  >
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200">
                      <span className="text-gray-300 text-2xl md:text-3xl lg:text-4xl font-black">
                        {project.id}.{imgIndex + 1}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {index < projects.length - 1 && <SectionSeparator />}
        </div>
      ))}
    </section>
  );
});

Projects.displayName = "Projects";

