import { Link } from "react-router-dom";
import { Download } from "lucide-react";
import profilePhoto from "@/assets/profile-antton.jpg";

const HeroSection = () => {
  return (
    <header className="min-h-[80vh] flex items-center justify-center px-6 py-20 md:py-28">
      <div className="max-w-4xl w-full">
        <div className="grid md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-center animate-fade-in-up">
          {/* Text Content */}
          <div className="space-y-7">
            {/* Kicker */}
            <span className="inline-block text-xs font-medium text-year-accent tracking-[0.2em] uppercase">
              Automatización · Integración de IA · Desarrollo a medida
            </span>

            {/* Main heading — problem first */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.02] tracking-[-0.03em]">
              Automatizo los procesos que hoy haces a mano.
            </h1>

            {/* Concrete subtitle */}
            <p className="text-base md:text-lg text-subtle leading-relaxed max-w-2xl font-light">
              Pedidos que entran por WhatsApp o email y acaban solos en tu sistema. Facturas en
              PDF que se vuelcan a contabilidad. Informes que se generan solos. Asistentes que
              responden desde tus manuales. Menos tareas repetidas, más tiempo para tu negocio.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                to="/#contacto"
                className="inline-flex items-center justify-center text-sm font-medium bg-foreground text-background px-5 py-2.5 rounded-sm hover:opacity-90 transition-opacity duration-200"
              >
                Pedir valoración gratuita
              </Link>
              <Link
                to="/servicios"
                className="inline-flex items-center justify-center text-sm font-medium border border-foreground px-5 py-2.5 rounded-sm hover:bg-foreground hover:text-background transition-colors duration-200"
              >
                Ver servicios
              </Link>
            </div>

            {/* About line */}
            <p className="text-sm text-subtle leading-relaxed max-w-2xl font-light pt-2">
              Soy Antton Gorrochategui, desarrollador full-stack en Donostia. Vengo del marketing,
              así que entiendo tu negocio antes de escribir una línea de código.{" "}
              <a href="/Antton-CV.pdf" download className="inline-flex items-center gap-1 text-foreground underline underline-offset-4 hover:no-underline">
                <Download size={13} />
                Descargar CV
              </a>
            </p>
          </div>

          {/* Profile Photo */}
          <div className="hidden md:block">
            <div className="w-44 h-44 lg:w-52 lg:h-52 rounded-sm overflow-hidden">
              <img
                src={profilePhoto}
                alt="Retrato de Antton Gorrochategui"
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
