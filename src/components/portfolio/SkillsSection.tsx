import { useScrollReveal } from "@/hooks/useScrollReveal";

const skills = [
  { name: "Google Analytics 4", category: "Analytics" },
  { name: "SEMrush", category: "SEO" },
  { name: "Ahrefs", category: "SEO" },
  { name: "Google Tag Manager", category: "Analytics" },
  { name: "Mailchimp", category: "Marketing" },
  { name: "WordPress", category: "CMS" },
  { name: "PHP", category: "Development" },
  { name: "JavaScript", category: "Development" },
  { name: "Figma", category: "Design" },
  { name: "GitHub", category: "Development" },
];

const SkillsSection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();

  return (
    <section className="py-20 md:py-28 px-6">
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
              Herramientas
            </span>
            <div className="flex-1 h-px bg-divider" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Skills & Tecnologías
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {skills.map((skill, index) => (
            <SkillBadge key={skill.name} skill={skill} index={index} />
          ))}
        </div>

        {/* Languages */}
        <div className="mt-12 pt-8 border-t border-divider">
          <h3 className="text-sm font-medium text-subtle uppercase tracking-wider mb-6">
            Idiomas
          </h3>
          <div className="flex flex-wrap gap-6">
            <LanguageItem language="Español" level="Nativo" />
            <LanguageItem language="Euskera" level="C1" />
            <LanguageItem language="Inglés" level="B2" />
          </div>
        </div>
      </div>
    </section>
  );
};

interface SkillBadgeProps {
  skill: { name: string; category: string };
  index: number;
}

const SkillBadge = ({ skill, index }: SkillBadgeProps) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`px-4 py-3 border border-divider rounded-sm text-center transition-all duration-500 hover:border-foreground/40 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <span className="text-sm font-medium">{skill.name}</span>
    </div>
  );
};

interface LanguageItemProps {
  language: string;
  level: string;
}

const LanguageItem = ({ language, level }: LanguageItemProps) => (
  <div className="flex items-center gap-2">
    <span className="font-medium">{language}</span>
    <span className="text-xs text-subtle px-2 py-0.5 border border-divider rounded-sm">
      {level}
    </span>
  </div>
);

export default SkillsSection;
