import { Download } from "lucide-react";
import profilePhoto from "@/assets/profile-antton.jpg";

const HeroSection = () => {
  return (
    <header className="min-h-[75vh] flex items-center justify-center px-6 py-24 md:py-32">
      <div className="max-w-4xl w-full">
        <div className="grid md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-center animate-fade-in-up">
          {/* Text Content */}
          <div className="space-y-8">
            {/* Year badge */}
            <span className="inline-block text-xs font-medium text-year-accent tracking-[0.2em] uppercase border border-divider px-3 py-1.5 rounded-sm">
              Portfolio 2025
            </span>
            
            {/* Main heading */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[0.95] tracking-[-0.03em]">
                Antton G.<br />
                Aguirre
              </h1>
            </div>
            
            {/* Download CV Button */}
            <a
              href="/Antton-CV.pdf"
              download
              className="inline-flex items-center gap-2 text-sm font-medium border border-foreground px-4 py-2 rounded-sm hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              <Download size={16} />
              Descargar CV
            </a>
            
            {/* Subtitle */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-foreground/20" />
              <h2 className="text-lg md:text-xl font-normal text-subtle tracking-wide">
                Desarrollo Web & Marketing Digital
              </h2>
            </div>
            
            {/* Description */}
            <p className="text-base md:text-lg text-subtle leading-relaxed max-w-2xl font-light">
              Profesional de Marketing e Investigación de Mercados, especializado en marketing digital, 
              desarrollo web, inteligencia artificial y estrategia de crecimiento online. Con experiencia 
              liderando equipos de marketing, desarrollando productos digitales y emprendiendo proyectos 
              tecnológicos con IA aplicada.
            </p>
          </div>

          {/* Profile Photo */}
          <div className="hidden md:block">
            <div className="w-48 h-48 lg:w-56 lg:h-56 rounded-sm overflow-hidden">
              <img 
                src={profilePhoto} 
                alt="Antton G. Aguirre" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
