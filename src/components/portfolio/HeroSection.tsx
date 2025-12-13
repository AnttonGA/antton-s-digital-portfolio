const HeroSection = () => {
  return (
    <header className="min-h-[75vh] flex items-center justify-center px-6 py-24 md:py-32">
      <div className="max-w-4xl w-full">
        <div className="space-y-8 animate-fade-in-up">
          {/* Year badge */}
          <span className="inline-block text-xs font-medium text-year-accent tracking-[0.2em] uppercase border border-divider px-3 py-1.5 rounded-sm">
            Portfolio 2025
          </span>
          
          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-[-0.03em]">
              Antton G.<br />
              Aguirre
            </h1>
          </div>
          
          {/* Subtitle */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-foreground/20" />
            <h2 className="text-lg md:text-xl font-normal text-subtle tracking-wide">
              Desarrollo Web & Marketing Digital
            </h2>
          </div>
          
          {/* Description */}
          <p className="text-base md:text-lg text-subtle leading-relaxed max-w-2xl font-light">
            Graduado en Marketing e Investigación de Mercados, especializado en marketing digital, 
            desarrollo web y estrategia de crecimiento online. Con experiencia liderando proyectos 
            de marketing, gestionando clientes y desarrollando contenido y productos digitales.
          </p>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
