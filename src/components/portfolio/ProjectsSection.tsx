import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import AboutTab from "./AboutTab";

interface CaseStudy {
  id: string;
  context: string;
  title: string;
  problema: string;
  solucion: string;
  resultado: string;
  stack?: string[];
}

const cases: CaseStudy[] = [
  {
    id: "mekoa",
    context: "SaaS · Salud animal · Equipo de dos",
    title: "Plataforma de telemedicina veterinaria",
    problema:
      "Atender una consulta veterinaria a distancia es un rosario de pasos manuales: recoger el motivo, agendar, hacer la videollamada, tomar notas y redactar el informe clínico. Lento y fácil de equivocarse.",
    solucion:
      "Construí la plataforma de principio a fin: un chat con IA recoge y ordena el caso, el cliente reserva cita, la videoconsulta se transcribe en directo y el informe clínico se genera solo.",
    resultado:
      "El veterinario se centra en atender; el papeleo se genera automáticamente. En producción, con cuatro tipos de usuario (dueño, profesional, clínica y administración).",
    stack: [
      "React",
      "TypeScript",
      "Hono",
      "Supabase / PostgreSQL",
      "Vercel AI SDK",
      "LiveKit",
      "Deepgram",
      "Stripe",
    ],
  },
  {
    id: "canexion",
    context: "Retail · Tienda física + online · En producción",
    title: "CRM para un programa de fidelización",
    problema:
      "El programa de fidelización se llevaba en una hoja de cálculo: difícil de mantener, sin una visión clara del cliente y con trabajo manual cada día.",
    solucion:
      "Un CRM a medida, construido desde cero, que reúne a los clientes de la tienda física y de la online y automatiza el día a día del programa.",
    resultado:
      "Sustituyó la hoja de cálculo y hoy se usa a diario en producción: el programa de fidelización se gestiona en un solo sitio, con una visión del cliente que antes estaba dispersa.",
  },
  {
    id: "akademia-ene",
    context: "Educación · Escuela de idiomas",
    title: "Plataforma de cursos online",
    problema:
      "La escuela quería vender y servir sus cursos de idiomas por internet sin montar (ni pagar) una plataforma a medida desde cero.",
    solucion:
      "Monté la web de cursos sobre WooCommerce, con una arquitectura tipo campus online, entregada en remoto entre Bratislava y Donostia.",
    resultado:
      "La escuela tiene su catálogo de cursos funcionando sobre una base conocida y fácil de mantener por ellos mismos.",
    stack: ["WordPress", "WooCommerce"],
  },
];

const otherProjects = [
  {
    id: "birakari",
    title: "Birakari",
    year: "2025",
    description:
      "Marketplace de compraventa de material de montaña de segunda mano. Lo fundé y llevé producto, tecnología y captación. En pausa.",
  },
  {
    id: "kahir",
    title: "Kahir",
    year: "2024 – 2025",
    description:
      "Plataforma de rutas de montaña estilo Wikiloc con una IA conversacional que recomienda rutas según tu historial, tus hábitos y la previsión del tiempo.",
  },
];

const CaseCard = ({ study, index }: { study: CaseStudy; index: number }) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      className={`border-t border-divider pt-10 pb-12 transition-all duration-500 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <span className="block text-xs font-medium text-year-accent tracking-[0.15em] uppercase mb-3">
        {study.context}
      </span>
      <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-8">{study.title}</h3>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="space-y-2">
          <h4 className="text-xs font-medium tracking-[0.15em] uppercase text-subtle">El problema</h4>
          <p className="text-subtle text-sm leading-relaxed font-light">{study.problema}</p>
        </div>
        <div className="space-y-2">
          <h4 className="text-xs font-medium tracking-[0.15em] uppercase text-subtle">Qué construí</h4>
          <p className="text-subtle text-sm leading-relaxed font-light">{study.solucion}</p>
        </div>
        <div className="space-y-2">
          <h4 className="text-xs font-medium tracking-[0.15em] uppercase text-foreground">El resultado</h4>
          <p className="text-foreground/90 text-sm leading-relaxed font-light">{study.resultado}</p>
        </div>
      </div>

      {study.stack && study.stack.length > 0 && (
        <ul className="flex flex-wrap gap-2 mt-8" aria-label="Tecnologías del proyecto">
          {study.stack.map((tech) => (
            <li key={tech} className="px-3 py-1 text-xs border border-divider rounded-full text-subtle">
              {tech}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
};

const OtherProjects = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`border-t border-divider pt-10 transition-all duration-500 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <h3 className="text-sm font-medium text-subtle tracking-wide uppercase mb-6">Otros proyectos</h3>
      <div className="space-y-6">
        {otherProjects.map((p) => (
          <div key={p.id} className="flex flex-col sm:flex-row sm:gap-6">
            <div className="sm:w-40 shrink-0 mb-1 sm:mb-0">
              <span className="font-medium text-foreground">{p.title}</span>
              <span className="text-subtle text-sm"> · {p.year}</span>
            </div>
            <p className="text-subtle text-sm leading-relaxed font-light">{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

type TabType = "casos" | "about";

const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState<TabType>("casos");
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal({ threshold: 0.3 });

  return (
    <section id="casos" className="px-6 py-24 md:py-32">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`mb-12 transition-all duration-500 ease-out ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-block text-xs font-medium text-year-accent tracking-[0.2em] uppercase mb-4">
            Trabajo
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Casos reales
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 mb-12 border-b border-divider">
          <button
            onClick={() => setActiveTab("casos")}
            className={`pb-4 text-sm font-medium tracking-wide transition-all duration-200 border-b-2 -mb-px ${
              activeTab === "casos"
                ? "border-foreground text-foreground"
                : "border-transparent text-subtle hover:text-foreground"
            }`}
          >
            Casos
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`pb-4 text-sm font-medium tracking-wide transition-all duration-200 border-b-2 -mb-px ${
              activeTab === "about"
                ? "border-foreground text-foreground"
                : "border-transparent text-subtle hover:text-foreground"
            }`}
          >
            Sobre mí
          </button>
        </div>

        {/* Content */}
        {activeTab === "casos" ? (
          <div>
            {cases.map((study, index) => (
              <CaseCard key={study.id} study={study} index={index} />
            ))}
            <OtherProjects />
          </div>
        ) : (
          <AboutTab />
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
