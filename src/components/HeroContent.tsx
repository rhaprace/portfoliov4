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

      <div className="hero-cta flex gap-6 flex-wrap">
        <button className="px-10 py-4 bg-black text-white text-lg font-semibold rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105">
          View My Work
        </button>
        <button className="px-10 py-4 border-2 border-black text-black text-lg font-semibold rounded-full hover:bg-black hover:text-white transition-all duration-300 hover:scale-105">
          Get In Touch
        </button>
      </div>
    </div>
  );
};

