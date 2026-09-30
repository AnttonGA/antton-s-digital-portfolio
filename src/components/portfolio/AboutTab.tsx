import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useT } from "@/i18n/LanguageContext";

const AboutTab = () => {
  const t = useT();
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
          {t.about.toolsTitle}
        </h3>
        <div className="space-y-6">
          {t.about.groups.map((group) => (
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
          {t.about.languagesTitle}
        </h3>
        <div className="flex flex-wrap gap-8">
          {t.about.languages.map((lang) => (
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
          {t.about.experienceTitle}
        </h3>
        <div className="space-y-8">
          {t.about.experiences.map((exp) => (
            <div key={exp.company} className="relative pl-6 border-l border-divider">
              <div className="absolute left-0 top-1.5 w-2 h-2 -translate-x-[5px] rounded-full bg-foreground" />
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                <div>
                  <span className="font-medium text-foreground">{exp.company}</span>
                  <span className="text-subtle mx-2">·</span>
                  <span className="text-subtle">{exp.role}</span>
                </div>
                <span className="text-xs text-subtle">{exp.period}</span>
              </div>
              {exp.description.length > 0 && (
                <ul className="space-y-1">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-sm text-subtle">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
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
          {t.about.educationTitle}
        </h3>
        <div className="space-y-4">
          {t.about.education.map((edu) => (
            <div
              key={edu.title}
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
