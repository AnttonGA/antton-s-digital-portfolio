import { useScrollReveal } from "@/hooks/useScrollReveal";

const skills = [
  { name: "Google Analytics 4", category: "analytics" },
  { name: "SEMrush", category: "seo" },
  { name: "Ahrefs", category: "seo" },
  { name: "Google Tag Manager", category: "analytics" },
  { name: "Mailchimp", category: "marketing" },
  { name: "WordPress", category: "development" },
  { name: "PHP", category: "development" },
  { name: "JavaScript", category: "development" },
  { name: "Figma", category: "design" },
  { name: "GitHub", category: "development" },
];

const languages = [
  { language: "Español", level: "Nativo" },
  { language: "Euskera", level: "C1" },
  { language: "Inglés", level: "B2" },
];

const experiences = [
  {
    company: "Loco Polo",
    role: "Prácticas Marketing",
    period: "Feb 2025 - Actualidad",
    description: [
      "Gestión de ecommerce y marketplaces",
      "SEO técnico y on-page",
      "Desarrollo web con WordPress",
    ],
  },
  {
    company: "Agencia EDE",
    role: "Prácticas Comunicación",
    period: "Sep 2024 - Ene 2025",
    description: [
      "Estrategia de contenidos y redes sociales",
      "Redacción de newsletters",
      "Análisis y segmentación de audiencias",
    ],
  },
  {
    company: "Saski Baskonia",
    role: "Prácticas Comunicación",
    period: "Ene 2024 - Jun 2024",
    description: [
      "Gestión de redes sociales del equipo",
      "Cobertura de eventos deportivos",
      "Creación de contenido multimedia",
    ],
  },
  {
    company: "ESI (UPV/EHU)",
    role: "Técnico Comunicación",
    period: "Sep 2022 - Sep 2023",
    description: [
      "Community management",
      "Diseño gráfico y edición de vídeo",
      "Organización de eventos universitarios",
    ],
  },
  {
    company: "CEBEK",
    role: "Prácticas Marketing",
    period: "Feb 2022 - Jun 2022",
    description: [
      "Email marketing y automatizaciones",
      "Análisis de campañas digitales",
      "Gestión de base de datos CRM",
    ],
  },
];

const AboutTab = () => {
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollReveal({ threshold: 0.2 });
  const { ref: langRef, isVisible: langVisible } = useScrollReveal({ threshold: 0.2 });
  const { ref: expRef, isVisible: expVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <div className="space-y-16">
      {/* Skills Grid */}
      <div
        ref={skillsRef as React.RefObject<HTMLDivElement>}
        className={`transition-all duration-500 ease-out ${
          skillsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h3 className="text-sm font-medium text-subtle tracking-wide uppercase mb-6">
          Herramientas
        </h3>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <span
              key={skill.name}
              className="px-4 py-2 text-sm border border-divider rounded-full text-foreground hover:border-foreground transition-colors duration-200"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {skill.name}
            </span>
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
            <div key={lang.language} className="flex items-center gap-2">
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
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-6 border-l border-divider">
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
    </div>
  );
};

export default AboutTab;
