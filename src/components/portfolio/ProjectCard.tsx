import { ExternalLink } from "lucide-react";

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ProjectData {
  id: string;
  title: string;
  year: string;
  type: "Proyecto personal" | "Proyecto" | "Prácticas";
  description: string;
  features: ProjectFeature[];
  link?: string;
}

interface ProjectCardProps {
  project: ProjectData;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <article 
      className={`bg-project-card border border-project-card rounded-lg p-8 md:p-10 animate-fade-in-up`}
      style={{ animationDelay: `${(index + 1) * 150}ms` }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div>
          <span className="text-sm font-medium text-year-accent tracking-wide uppercase">
            {project.type} — {project.year}
          </span>
          <h3 className="text-3xl md:text-4xl font-bold mt-2">{project.title}</h3>
        </div>
        {project.link && (
          <a
            href={`https://${project.link}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-subtle hover:text-foreground transition-colors group shrink-0"
          >
            <span>{project.link}</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        )}
      </div>

      {/* Description */}
      <p className="text-subtle text-lg leading-relaxed mb-8 max-w-3xl">
        {project.description}
      </p>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {project.features.map((feature, i) => (
          <div key={i} className="space-y-2">
            <h4 className="font-heading font-semibold text-lg">{feature.title}</h4>
            <p className="text-subtle text-sm leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </article>
  );
};

export default ProjectCard;
