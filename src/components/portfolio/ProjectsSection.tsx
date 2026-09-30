import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useT } from "@/i18n/LanguageContext";
import AboutTab from "./AboutTab";

interface CaseStudy {
  id: string;
  context: string;
  title: string;
  problema: string;
  solucion: string;
  resultado: string;
}

// El stack son nombres propios: iguales en cualquier idioma.
const caseStacks: Record<string, string[]> = {
  mekoa: [
    "React",
    "TypeScript",
    "Hono",
    "Supabase / PostgreSQL",
    "Vercel AI SDK",
    "LiveKit",
    "Deepgram",
    "Stripe",
  ],
  "akademia-ene": ["WordPress", "WooCommerce"],
};

interface CaseLabels {
  problem: string;
  solution: string;
  result: string;
  stackAria: string;
}

const CaseCard = ({
  study,
  index,
  labels,
}: {
  study: CaseStudy;
  index: number;
  labels: CaseLabels;
}) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const stack = caseStacks[study.id];

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
          <h4 className="text-xs font-medium tracking-[0.15em] uppercase text-subtle">{labels.problem}</h4>
          <p className="text-subtle text-sm leading-relaxed font-light">{study.problema}</p>
        </div>
        <div className="space-y-2">
          <h4 className="text-xs font-medium tracking-[0.15em] uppercase text-subtle">{labels.solution}</h4>
          <p className="text-subtle text-sm leading-relaxed font-light">{study.solucion}</p>
        </div>
        <div className="space-y-2">
          <h4 className="text-xs font-medium tracking-[0.15em] uppercase text-foreground">{labels.result}</h4>
          <p className="text-foreground/90 text-sm leading-relaxed font-light">{study.resultado}</p>
        </div>
      </div>

      {stack && stack.length > 0 && (
        <ul className="flex flex-wrap gap-2 mt-8" aria-label={labels.stackAria}>
          {stack.map((tech) => (
            <li key={tech} className="px-3 py-1 text-xs border border-divider rounded-full text-subtle">
              {tech}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
};

const OtherProjects = ({
  title,
  projects,
}: {
  title: string;
  projects: { id: string; title: string; year: string; description: string }[];
}) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`border-t border-divider pt-10 transition-all duration-500 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <h3 className="text-sm font-medium text-subtle tracking-wide uppercase mb-6">{title}</h3>
      <div className="space-y-6">
        {projects.map((p) => (
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
  const t = useT();
  const [activeTab, setActiveTab] = useState<TabType>("casos");
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal({ threshold: 0.3 });

  const labels: CaseLabels = {
    problem: t.cases.labelProblem,
    solution: t.cases.labelSolution,
    result: t.cases.labelResult,
    stackAria: t.cases.stackAria,
  };

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
            {t.cases.eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{t.cases.title}</h2>
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
            {t.cases.tabCases}
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`pb-4 text-sm font-medium tracking-wide transition-all duration-200 border-b-2 -mb-px ${
              activeTab === "about"
                ? "border-foreground text-foreground"
                : "border-transparent text-subtle hover:text-foreground"
            }`}
          >
            {t.cases.tabAbout}
          </button>
        </div>

        {/* Content */}
        {activeTab === "casos" ? (
          <div>
            {t.cases.items.map((study, index) => (
              <CaseCard key={study.id} study={study} index={index} labels={labels} />
            ))}
            <OtherProjects title={t.cases.otherTitle} projects={t.cases.other} />
          </div>
        ) : (
          <AboutTab />
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
