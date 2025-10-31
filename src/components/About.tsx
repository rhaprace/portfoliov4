import { useAboutAnimation } from "../hooks/useAboutAnimation";
import profileImage from "../assets/profile.jpg";
import { AboutOrbital } from "./AboutOrbital";

export const About = () => {
  const sectionRef  = useAboutAnimation();

  return (
    <section
      ref={sectionRef}
      className="min-h-screen w-full flex items-center py-20 md:py-32 relative overflow-hidden bg-white">

      <AboutOrbital />

      <div className="grid grid-cols-1 lg:grid-cols-2 w-full items-center px-8 md:px-16 gap-16 md:gap-24 lg:gap-32 relative z-10">
        <div className="about-image flex justify-center lg:justify-end py-8 lg:py-0">
          <div className="relative w-full max-w-lg">
            <div
              className="relative aspect-[4/5] rounded-3xl overflow-hidden border-8 border-black"
              style={{
                boxShadow: `
                  0 10px 30px -5px rgba(0, 0, 0, 0.15),
                  0 20px 50px -10px rgba(0, 0, 0, 0.12),
                  0 30px 70px -15px rgba(0, 0, 0, 0.08),
                  0 40px 90px -20px rgba(0, 0, 0, 0.04)
                `,
              }}
            >
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="about-content-wrapper py-8 lg:py-0">
          <h2 className="about-title text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-none">
            About Me
          </h2>
          <div className="space-y-6">
            <p className="about-content text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed">
              Hi there! I'm Rafael, a junior full-stack developer with a hobby for creating things in my mind. 
              When I'm not coding, you'll find me exploring new technologies, Also enjoying a good cup of coffee. 
              I'm always making myself face new challenges and learn new things. 
              I'm a big fan of clean code and applying principles of writing maintainable and high value quality code.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
