import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export const HeroContent = () => {
  return (
    <div className="flex flex-col justify-center h-full px-8 md:px-16 lg:px-24 max-w-7xl">
      <p className="hero-greeting text-lg md:text-xl text-gray-600 mb-2 font-medium">
        Hi, I'm
      </p>

      <h1 className="hero-name text-6xl md:text-8xl lg:text-9xl font-black mb-4 leading-none tracking-tight">
        Rafael R.
      </h1>

      <h2 className="hero-title text-3xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-8 leading-tight">
        Full Stack Developer
      </h2>

      <p className="hero-description text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mb-12 leading-relaxed">
        I craft beautiful, functional, and user-centered digital experiences
        that bring ideas to life.
      </p>

      <div className="hero-cta flex gap-4 flex-wrap items-center">
        <a
          href="https://github.com/rhaprace"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-black text-white text-base font-semibold rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105 flex items-center gap-2"
        >
          <FaGithub className="text-xl" />
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/rhaprace"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-black text-white text-base font-semibold rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105 flex items-center gap-2"
        >
          <FaLinkedin className="text-xl" />
          LinkedIn
        </a>
        <a
          href="mailto:rhaprace@gmail.com"
          className="px-6 py-3 border-2 border-black text-black text-base font-semibold rounded-full hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 flex items-center gap-2"
        >
          <FaEnvelope className="text-xl" />
          Email
        </a>
      </div>
    </div>
  );
};

