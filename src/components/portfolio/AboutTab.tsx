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
  { language: "Euskera", level: "Nativo" },
  { language: "Castellano", level: "Nativo" },
  { language: "Inglés", level: "C1" },
  { language: "Francés", level: "A1" },
];

const experiences = [
  {
    company: "Ayesa",
    role: "Encargado de atención al cliente",
    period: "Sep 2025 - Actualidad",
    description: [
      "Gestión de nuevos clientes",
      "Crear y aplicar estrategias de retención",
      "Contacto directo con el cliente",
    ],
  },
  {
    company: "Teklatam (Chile)",
    role: "Marketing Leader",
    period: "Ene 2025 - Ago 2025",
    description: [
      "Responsable de estrategias de marketing y presencia online",
      "Desarrollo página web",
      "Lanzamiento nuevos productos",
    ],
  },
  {
    company: "Bizipoza",
    role: "Organización de eventos (Proyecto)",
    period: "Abr 2025 - May 2025",
    description: [
      "Supervisión de operaciones",
      "Desarrollar plan de crecimiento",
      "Capacitación de personal",
    ],
  },
  {
    company: "FITT",
    role: "Asistente de Marketing (prácticas)",
    period: "Mar 2021 - May 2021",
    description: [
      "Gestión RRSS",
      "Desarrollo estrategia email marketing",
    ],
  },
  {
    company: "Loco Polo",
    role: "Asistente de Marketing (prácticas)",
    period: "Mar 2021 - May 2021",
    description: [
      "Gestión RRSS",
      "Desarrollo página web",
      "Desarrollo estrategia email marketing",
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
