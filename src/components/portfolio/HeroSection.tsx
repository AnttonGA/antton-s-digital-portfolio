import { User } from "lucide-react";

const HeroSection = () => {
  return (
    <header className="min-h-[70vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-5xl w-full">
        <div className="grid md:grid-cols-[1fr_auto] gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 animate-fade-in-up">
            <div className="space-y-2">
              <span className="text-sm font-medium text-year-accent tracking-widest uppercase">
                Portfolio 2025
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
                Hola, soy<br />
                <span className="text-primary">Antton G. Aguirre</span>
              </h1>
            </div>
            <h2 className="text-2xl md:text-3xl font-heading font-semibold text-subtle">
              Desarrollo Web
            </h2>
            <p className="text-lg md:text-xl text-subtle leading-relaxed max-w-2xl">
              Graduado en Marketing e Investigación de Mercados, especializado en marketing digital, 
              desarrollo web y estrategia de crecimiento online. Con experiencia liderando proyectos 
              de marketing, gestionando clientes y desarrollando contenido y productos digitales.
            </p>
          </div>

          {/* Profile Avatar */}
          <div className="animate-fade-in-up delay-200 hidden md:block">
            <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-2xl overflow-hidden shadow-lg bg-primary flex items-center justify-center">
              <User className="w-24 h-24 lg:w-32 lg:h-32 text-primary-foreground" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
