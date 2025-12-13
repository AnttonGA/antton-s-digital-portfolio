import { useScrollReveal } from "@/hooks/useScrollReveal";

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
}

const experiences: Experience[] = [
  {
    company: "Birakari",
    role: "Cofundador & Developer",
    period: "2022 - Actualidad",
    description: [
      "Desarrollo y mantenimiento de plataforma ecommerce multivendor",
      "Estrategia de marketing digital y gestión de campañas",
    ],
  },
  {
    company: "Talde Koop Elk.",
    role: "Resp. Marketing & Comunicación",
    period: "2023 - 2024",
    description: [
      "Liderazgo del departamento de marketing y comunicación",
      "Gestión de clientes y desarrollo de estrategias digitales",
    ],
  },
  {
    company: "LABORAL Kutxa",
    role: "Técnico de Marketing",
    period: "2022 - 2023",
    description: [
      "Análisis de datos y reporting con Google Analytics",
      "Gestión de campañas de email marketing",
    ],
  },
  {
    company: "Fagor Ederlan",
    role: "Prácticas Marketing",
    period: "2021 - 2022",
    description: [
      "Apoyo en estrategia de comunicación corporativa",
      "Gestión de contenidos digitales",
    ],
  },
  {
    company: "Freelance",
    role: "Desarrollador Web",
    period: "2020 - Actualidad",
    description: [
      "Desarrollo de sitios web para clientes diversos",
      "WordPress, PHP y soluciones personalizadas",
    ],
  },
];

const ExperienceSection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();

  return (
    <section className="py-20 md:py-28 px-6 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`mb-12 transition-all duration-700 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-medium text-year-accent tracking-[0.2em] uppercase">
              Trayectoria
            </span>
            <div className="flex-1 h-px bg-divider" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Experiencia Profesional
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-4 top-0 bottom-0 w-px bg-divider" />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <ExperienceCard key={exp.company + exp.role} experience={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

const ExperienceCard = ({ experience, index }: ExperienceCardProps) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`relative pl-8 md:pl-12 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Timeline Dot */}
      <div className="absolute left-0 md:left-4 top-2 w-2 h-2 -translate-x-1/2 bg-foreground rounded-full" />

      {/* Card Content */}
      <div className="pb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
          <h3 className="text-lg font-semibold">{experience.company}</h3>
          <span className="text-xs text-subtle font-medium tracking-wider">
            {experience.period}
          </span>
        </div>
        <p className="text-sm text-year-accent font-medium mb-3">{experience.role}</p>
        <ul className="space-y-1.5">
          {experience.description.map((item, i) => (
            <li key={i} className="text-sm text-subtle flex items-start gap-2">
              <span className="text-foreground/40 mt-1.5">—</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExperienceSection;
