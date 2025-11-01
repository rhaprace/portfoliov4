import { memo } from "react";
import { projects } from "../utils/dataCache";
import { useProjectsAnimation } from "../hooks/useProjectsAnimation";
import { SectionSeparator } from "./SectionSeparator";
import { SectionTitle } from "./SectionTitle";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { ImageContainer } from "./ImageContainer";

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
                  <div className="flex gap-2 flex-wrap mb-8">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-semibold text-gray-600 bg-gray-100 px-4 py-2 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {(project.liveUrl || project.repoUrl) && (
                    <div className="flex gap-4 flex-wrap">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          <FiExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                      )}
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 border-2 border-black text-black text-sm font-semibold rounded-lg hover:bg-black hover:text-white transition-colors"
                        >
                          <FiGithub className="w-4 h-4" />
                          View Code
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className={`project-${project.id}-images px-8 md:px-16 lg:pr-16 lg:pl-8 space-y-6 md:space-y-8 lg:space-y-12 pb-8 lg:pb-20`}>
                {project.images.map((imageSrc, imgIndex) => (
                  <div key={imgIndex} className={`project-${project.id}-image`}>
                    <ImageContainer
                      src={imageSrc}
                      alt={`${project.title} screenshot ${imgIndex + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {index < projects.length - 1 && (
            <div className={`project-${project.id}-separator`}>
              <SectionSeparator />
            </div>
          )}
        </div>
      ))}
    </section>
  );
});

Projects.displayName = "Projects";

