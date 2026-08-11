import { useState } from "react";
import ProjectCard, { ProjectData } from "./ProjectCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import AboutTab from "./AboutTab";

const projects: ProjectData[] = [
  {
    id: "mekoa",
    title: "MEKOA",
    year: "2025 – Actualidad",
    type: "SaaS · Telemedicina veterinaria con IA",
    description:
      "Plataforma de telemedicina veterinaria de extremo a extremo, construida en un equipo de dos como desarrollador full-stack. El flujo va del chat de triaje con IA a la reserva de cita, la videoconsulta con transcripción en vivo y un informe clínico generado automáticamente.",
    features: [
      {
        title: "IA en un flujo clínico real",
        description:
          "8 roles de modelo configurables, verificador de segunda pasada para reducir alucinaciones y RAG sobre una base de conocimiento etológico y vademécum.",
      },
      {
        title: "Multi-tenant seguro",
        description:
          "PostgreSQL con Row-Level Security y defensa en profundidad mediante triggers, con una suite de tests de RLS versionada.",
      },
      {
        title: "Escala de producto",
        description:
          "117 endpoints de API y unas 62 pantallas para cuatro roles de usuario distintos.",
      },
    ],
    stack: [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Hono",
      "Supabase / PostgreSQL",
      "Vercel AI SDK",
      "LiveKit",
      "Deepgram",
      "Stripe",
      "Vitest",
    ],
    link: null,
  },
  {
    id: "canexion",
    title: "CRM de fidelización — Canexion",
    year: "2026",
    type: "CRM a medida · En producción",
    description:
      "CRM a medida construido desde cero para gestionar el programa de fidelización de una tienda con venta física y online. En uso diario en producción.",
    features: [
      {
        title: "Hecho a medida",
        description:
          "Construido desde cero para el programa de fidelización, sin plantillas de por medio.",
      },
      {
        title: "Física y online",
        description:
          "Unifica la gestión de clientes de la tienda física y del canal online.",
      },
      {
        title: "En producción",
        description:
          "En uso diario por el equipo para operar el día a día del negocio.",
      },
    ],
    link: null,
  },
  {
    id: "akademia-ene",
    title: "Plataforma de cursos — Akademia eñe Online",
    year: "2026",
    type: "Plataforma LMS",
    description:
      "Desarrollo de la web que aloja los cursos online de la escuela, con una arquitectura LMS sobre WooCommerce. Proyecto realizado dentro del programa Erasmus para Jóvenes Emprendedores, entregado en remoto entre Bratislava y Donostia.",
    features: [
      {
        title: "LMS sobre WooCommerce",
        description: "Arquitectura de cursos online montada sobre WooCommerce.",
      },
      {
        title: "Erasmus para Jóvenes Emprendedores",
        description:
          "Desarrollado dentro del programa de la UE para nuevos emprendedores.",
      },
      {
        title: "Entrega en remoto",
        description: "Colaboración a distancia entre Bratislava y Donostia.",
      },
    ],
    stack: ["WordPress", "WooCommerce"],
    link: null,
  },
  {
    id: "kahir",
    title: "Kahir",
    year: "2024 – 2025",
    type: "Plataforma web + IA conversacional",
    description:
      "Plataforma de rutas de montaña estilo Wikiloc, con perfiles, registro de actividad y funciones de comunidad. Incluye una capa de IA conversacional con gestión de contexto multi-turno que ofrece recomendaciones personalizadas a partir del historial, los hábitos deportivos y la previsión meteorológica.",
    features: [
      {
        title: "Plataforma de rutas",
        description:
          "Estilo Wikiloc: perfiles de usuario, registro de actividad y funciones de comunidad.",
      },
      {
        title: "IA conversacional",
        description:
          "Contexto multi-turno con recomendaciones adaptadas al perfil y los hábitos del usuario.",
      },
      {
        title: "Datos en tiempo real",
        description: "Las recomendaciones integran la previsión meteorológica.",
      },
    ],
    stack: ["PHP", "JavaScript", "HTML / CSS"],
    link: null,
  },
  {
    id: "birakari",
    title: "Birakari",
    year: "2025",
    type: "Proyecto propio · En pausa",
    description:
      "Marketplace P2P para comprar, vender e intercambiar material de montaña de segunda mano. Lo fundé y me encargué de producto, tecnología y go-to-market. Actualmente en pausa.",
    features: [],
    link: null,
  },
];

type TabType = "web" | "about";

const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState<TabType>("web");
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal({ threshold: 0.3 });

  return (
    <section id="proyectos" className="px-6 py-24 md:py-32">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`mb-16 transition-all duration-500 ease-out ${
            titleVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-block text-xs font-medium text-year-accent tracking-[0.2em] uppercase mb-4">
            Trabajo
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Proyectos seleccionados
          </h2>
        </div>

        {/* Minimal Tabs */}
        <div className="flex gap-8 mb-12 border-b border-divider">
          <button
            onClick={() => setActiveTab("web")}
            className={`pb-4 text-sm font-medium tracking-wide transition-all duration-200 border-b-2 -mb-px ${
              activeTab === "web"
                ? "border-foreground text-foreground"
                : "border-transparent text-subtle hover:text-foreground"
            }`}
          >
            Desarrollo Web
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`pb-4 text-sm font-medium tracking-wide transition-all duration-200 border-b-2 -mb-px ${
              activeTab === "about"
                ? "border-foreground text-foreground"
                : "border-transparent text-subtle hover:text-foreground"
            }`}
          >
            Sobre Mí
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === "web" ? (
          <div>
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <AboutTab />
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
