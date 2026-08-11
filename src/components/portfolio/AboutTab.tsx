import { useScrollReveal } from "@/hooks/useScrollReveal";

const skillGroups = [
  {
    label: "Desarrollo",
    items: [
      "TypeScript",
      "React",
      "Node.js",
      "Hono",
      "PostgreSQL",
      "Supabase",
      "Row-Level Security",
      "REST APIs",
      "PHP",
      "JavaScript",
      "Vite",
      "TailwindCSS",
      "Zod",
      "Vitest",
      "Git",
    ],
  },
  {
    label: "IA",
    items: [
      "APIs de Anthropic y OpenAI",
      "Vercel AI SDK",
      "RAG y embeddings",
      "Agentes conversacionales",
      "Observabilidad de LLM",
    ],
  },
  {
    label: "Producto y marketing",
    items: [
      "WordPress",
      "WooCommerce",
      "Figma",
      "SEO (SEMrush, Ahrefs)",
      "GA4",
      "GTM",
      "Email marketing",
      "Go-to-market",
      "Scrum / Agile",
    ],
  },
];

const languages = [
  { id: "eu", language: "Euskera", level: "Nativo" },
  { id: "es", language: "Castellano", level: "Nativo" },
  { id: "en", language: "Inglés", level: "C1" },
  { id: "fr", language: "Francés", level: "A1" },
];

const experiences = [
  {
    id: "canexion",
    company: "Canexion",
    role: "Marketing Director",
    period: "2026 – Actualidad",
    description: [
      "Dirección de la estrategia de presencia digital para tienda física y e-commerce.",
      "Desarrollo del CRM de fidelización a medida, hoy en producción.",
    ],
  },
  {
    id: "akademia-ene",
    company: "Akademia eñe Online",
    role: "New Entrepreneur · Erasmus para Jóvenes Emprendedores",
    period: "2026",
    description: [
      "Desarrollo de la plataforma de cursos con arquitectura LMS sobre WooCommerce.",
      "Integración de una capa de IA conversacional en el producto.",
      "Colaboración en remoto entre Bratislava y Donostia bajo metodología Scrum/Agile.",
    ],
  },
  {
    id: "ayesa",
    company: "Ayesa",
    role: "Customer Success & Retention Lead",
    period: "2025 – 2026",
    description: [
      "Onboarding de nuevos clientes y diseño de estrategias de retención.",
      "Gestión directa de relaciones con clientes y coordinación de eventos.",
    ],
  },
  {
    id: "teklatam",
    company: "Teklatam",
    role: "Marketing Lead · Santiago de Chile",
    period: "2025",
    description: [
      "Estrategia de marketing digital y presencia online para una empresa tecnológica.",
      "Desarrollo de la web corporativa y lanzamiento de nuevos productos.",
      "SEO, contenido y adquisición de pago.",
    ],
  },
];

const education = [
  {
    id: "uoc",
    title: "Grado en Marketing e Investigación de Mercados",
    school: "UOC",
    period: "2025",
  },
  {
    id: "lanbide",
    title: "Desarrollo Web (FP)",
    school: "Lanbide",
    period: null,
  },
];

const AboutTab = () => {
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollReveal({ threshold: 0.2 });
  const { ref: langRef, isVisible: langVisible } = useScrollReveal({ threshold: 0.2 });
  const { ref: expRef, isVisible: expVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: eduRef, isVisible: eduVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <div className="space-y-16">
      {/* Skills */}
      <div
        ref={skillsRef as React.RefObject<HTMLDivElement>}
        className={`transition-all duration-500 ease-out ${
          skillsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h3 className="text-sm font-medium text-subtle tracking-wide uppercase mb-6">
          Herramientas
        </h3>
        <div className="space-y-6">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <h4 className="text-xs font-medium text-year-accent tracking-[0.15em] uppercase mb-3">
                {group.label}
              </h4>
              <div className="flex flex-wrap gap-3">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 text-sm border border-divider rounded-full text-foreground hover:border-foreground transition-colors duration-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div
        ref={langRef as React.RefObject<HTMLDivElement>}
        className={`transition-all duration-500 ease-out ${
          langVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h3 className="text-sm font-medium text-subtle tracking-wide uppercase mb-6">
          Idiomas
        </h3>
        <div className="flex flex-wrap gap-8">
          {languages.map((lang) => (
            <div key={lang.id} className="flex items-center gap-2">
              <span className="text-foreground font-medium">{lang.language}</span>
              <span className="text-subtle text-sm">({lang.level})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Timeline */}
      <div
        ref={expRef as React.RefObject<HTMLDivElement>}
        className={`transition-all duration-500 ease-out ${
          expVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h3 className="text-sm font-medium text-subtle tracking-wide uppercase mb-6">
          Experiencia
        </h3>
        <div className="space-y-8">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative pl-6 border-l border-divider">
              <div className="absolute left-0 top-1.5 w-2 h-2 -translate-x-[5px] rounded-full bg-foreground" />
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                <div>
                  <span className="font-medium text-foreground">{exp.company}</span>
                  <span className="text-subtle mx-2">·</span>
                  <span className="text-subtle">{exp.role}</span>
                </div>
                <span className="text-xs text-subtle">{exp.period}</span>
              </div>
              <ul className="space-y-1">
                {exp.description.map((item, i) => (
                  <li key={i} className="text-sm text-subtle">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div
        ref={eduRef as React.RefObject<HTMLDivElement>}
        className={`transition-all duration-500 ease-out ${
          eduVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h3 className="text-sm font-medium text-subtle tracking-wide uppercase mb-6">
          Formación
        </h3>
        <div className="space-y-4">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1"
            >
              <div>
                <span className="font-medium text-foreground">{edu.title}</span>
                <span className="text-subtle mx-2">·</span>
                <span className="text-subtle">{edu.school}</span>
              </div>
              {edu.period && <span className="text-xs text-subtle">{edu.period}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutTab;
