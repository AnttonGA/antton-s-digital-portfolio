import { ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ProjectData {
  id: string;
  title: string;
  year: string;
  type: string;
  description: string;
  features: ProjectFeature[];
  link?: string | null;
}

interface ProjectCardProps {
  project: ProjectData;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <article 
      ref={ref as React.RefObject<HTMLElement>}
      className={`border-t border-divider pt-10 pb-12 transition-all duration-500 ease-out ${
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div className="space-y-2">
          <span className="text-xs font-medium text-year-accent tracking-[0.15em] uppercase">
            {project.type} — {project.year}
          </span>
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">{project.title}</h3>
        </div>
        {project.link && (
          <a
            href={`https://${project.link}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-subtle hover:text-foreground transition-colors duration-200 group shrink-0"
          >
            <span className="border-b border-current pb-0.5">{project.link}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </a>
        )}
      </div>

      {/* Description */}
      <p className="text-subtle text-base leading-relaxed mb-10 max-w-3xl font-light">
        {project.description}
      </p>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {project.features.map((feature, i) => (
          <div 
            key={i} 
            className={`space-y-2 transition-all duration-400 ${
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-3"
            }`}
            style={{ transitionDelay: `${(index * 80) + (i * 60) + 150}ms` }}
          >
            <h4 className="font-medium text-sm tracking-wide">{feature.title}</h4>
            <p className="text-subtle text-sm leading-relaxed font-light">{feature.description}</p>
          </div>
        ))}
      </div>
    </article>
  );
};

export default ProjectCard;
