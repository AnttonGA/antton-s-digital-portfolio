import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSkills, useLanguages, useExperiences } from "@/hooks/useAboutData";

// Fallback data
const fallbackSkills = [
  { id: "1", name: "Google Analytics 4", category: "analytics", display_order: 0 },
  { id: "2", name: "SEMrush", category: "seo", display_order: 1 },
  { id: "3", name: "Ahrefs", category: "seo", display_order: 2 },
  { id: "4", name: "Google Tag Manager", category: "analytics", display_order: 3 },
  { id: "5", name: "Mailchimp", category: "marketing", display_order: 4 },
  { id: "6", name: "WordPress", category: "development", display_order: 5 },
  { id: "7", name: "WooCommerce", category: "development", display_order: 6 },
  { id: "8", name: "PHP", category: "development", display_order: 7 },
  { id: "9", name: "JavaScript", category: "development", display_order: 8 },
  { id: "10", name: "Figma", category: "design", display_order: 9 },
  { id: "11", name: "GitHub", category: "development", display_order: 10 },
  { id: "12", name: "AI Integration", category: "technology", display_order: 11 },
  { id: "13", name: "Product Strategy", category: "business", display_order: 12 },
  { id: "14", name: "Go-to-Market", category: "business", display_order: 13 },
  { id: "15", name: "Scrum / Agile", category: "business", display_order: 14 },
  { id: "16", name: "Team Management", category: "business", display_order: 15 },
  { id: "17", name: "Client Success", category: "business", display_order: 16 },
  { id: "18", name: "Email Marketing", category: "marketing", display_order: 17 },
];

const fallbackLanguages = [
  { id: "1", language: "Euskera", level: "Nativo", display_order: 0 },
  { id: "2", language: "Castellano", level: "Nativo", display_order: 1 },
  { id: "3", language: "Inglés", level: "C1", display_order: 2 },
  { id: "4", language: "Francés", level: "A1", display_order: 3 },
];

const fallbackExperiences = [
  {
    id: "1",
    company: "Canexion",
    role: "Marketing Director",
    period: "Mar 2026 – Actualidad",
    description: [
      "Dirección de estrategia de presencia digital para tienda física y e-commerce",
      "Gestión de canales de redes sociales y presencia web en ventas físicas y online",
    ],
    display_order: 0,
  },
  {
    id: "2",
    company: "Akademia eñe Online",
    role: "New Entrepreneur — Erasmus for Entrepreneurs",
    period: "Mar 2026 – Sep 2026",
    description: [
      "Desarrollo de avatar de IA para plataforma de aprendizaje online en español",
      "Diseño e integración de IA conversacional en arquitectura LMS sobre WooCommerce",
      "Colaboración remota entre Bratislava y Donostia bajo metodología Scrum/Agile",
      "Construcción y preparación del lanzamiento público de Birakari",
    ],
    display_order: 1,
  },
  {
    id: "3",
    company: "Ayesa",
    role: "Customer Success & Retention Lead",
    period: "Sep 2025 – Feb 2026",
    description: [
      "Gestión de onboarding de nuevos clientes y diseño de estrategias de retención",
      "Gestión directa de relaciones con clientes y coordinación de eventos",
    ],
    display_order: 2,
  },
  {
    id: "4",
    company: "Teklatam",
    role: "Marketing Lead",
    period: "Ene 2025 – Ago 2025",
    description: [
      "Estrategia de marketing digital y presencia online para empresa tecnológica chilena, con sede en Santiago",
      "Desarrollo de página web y lanzamiento de nuevos productos",
      "Estrategias de SEO, contenido y adquisición de pago",
    ],
    display_order: 3,
  },
  {
    id: "5",
    company: "Bizipoza",
    role: "Event Operations Supervisor",
    period: "Abr 2025 – May 2025",
    description: [
      "Supervisión de operaciones y desarrollo de plan de crecimiento para proyecto de eventos en euskera",
      "Liderazgo en formación y capacitación del equipo",
    ],
    display_order: 4,
  },
  {
    id: "6",
    company: "FITT",
    role: "Asistente de Marketing (prácticas)",
    period: "Sep 2022 – Jun 2023",
    description: [
      "Gestión de redes sociales",
      "Organización de eventos",
      "Desarrollo de página web",
    ],
    display_order: 5,
  },
  {
    id: "7",
    company: "Loco Polo",
    role: "Asistente de Marketing (prácticas)",
    period: "Mar 2021 – May 2021",
    description: [
      "Gestión de redes sociales",
      "Desarrollo de página web",
      "Estrategia de email marketing",
    ],
    display_order: 6,
  },
];

const AboutTab = () => {
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollReveal({ threshold: 0.2 });
  const { ref: langRef, isVisible: langVisible } = useScrollReveal({ threshold: 0.2 });
  const { ref: expRef, isVisible: expVisible } = useScrollReveal({ threshold: 0.1 });

  const { data: dbSkills, isLoading: skillsLoading } = useSkills();
  const { data: dbLanguages, isLoading: languagesLoading } = useLanguages();
  const { data: dbExperiences, isLoading: experiencesLoading } = useExperiences();

  const skills = dbSkills && dbSkills.length > 0 ? dbSkills : fallbackSkills;
  const languages = dbLanguages && dbLanguages.length > 0 ? dbLanguages : fallbackLanguages;
  const experiences = dbExperiences && dbExperiences.length > 0 ? dbExperiences : fallbackExperiences;

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
              key={skill.id}
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
    </div>
  );
};

export default AboutTab;
