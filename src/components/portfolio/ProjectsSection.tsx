import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Loader2 } from "lucide-react";
import InstagramFeed from "./InstagramFeed";
import AboutTab from "./AboutTab";
import { useWebProjects, WebProject } from "@/hooks/useWebProjects";

// Fallback data for when database is empty
const fallbackProjects: WebProject[] = [
  {
    id: "birakari",
    title: "Birakari",
    year: "2025",
    type: "Proyecto personal",
    description:
      "La web de Birakari es un marketplace multivendedor donde los usuarios pueden publicar, buscar y filtrar anuncios de venta, alquiler o trueque de material outdoor. Incluye mensajería interna y gestión autónoma de anuncios. Se está trabajando en incluir una pasarela de pago segura. Además, ofrece servicios premium como verificación de productos, intermediación logística y perfiles destacados.",
    features: [
      {
        title: "Ecommerce multivendedor",
        description:
          "Permite compra, alquiler y trueque de material deportivo outdoor, con publicación gratuita de anuncios.",
      },
      {
        title: "Búsqueda avanzada",
        description:
          "Búsqueda avanzada utilizando buscador y filtros por tipo de material, precio, ubicación, etc. Para una búsqueda óptima.",
      },
      {
        title: "Mensajería interna",
        description:
          "Permite intercambiar mensajes entre cuentas registradas para llevar a cabo la transacción.",
      },
    ],
    link: "Birakari.com",
  },
  {
    id: "teklatam",
    title: "Teklatam",
    year: "2025",
    type: "Proyecto",
    description:
      "Web corporativa con sistema de gestión de contenidos personalizado. La página incluye un apartado privado para gestionar el contenido, tanto imágenes como textos y títulos. SEO técnico y on-page optimizado para maximizar resultados en buscadores.",
    features: [
      {
        title: "Contenido dinámico",
        description:
          "La página incluye un apartado privado para gestionar el contenido, tanto imágenes como textos y títulos.",
      },
      {
        title: "SEO Optimizado",
        description:
          "SEO técnico y on-page optimizado para maximizar resultados SEO en buscadores.",
      },
      {
        title: "Análisis de datos",
        description:
          "El apartado privado permite conocer los datos de personas que visitan la web, duración media de las visitas, apartados visitados, etc.",
      },
    ],
    link: "Teklatam.com",
  },
  {
    id: "locopolo",
    title: "Loco Polo",
    year: "2021",
    type: "Prácticas",
    description:
      "En Loco Polo colaboré en el desarrollo de la página web, trabajando con WordPress y diversos plugins para optimizar su funcionalidad y experiencia de usuario. Además, apoyé el posicionamiento SEO, mejorando la estructura, el contenido y la visibilidad orgánica del sitio.",
    features: [
      {
        title: "WordPress",
        description:
          "Desarrollé y configuré la web utilizando WordPress y plugins específicos para mejorar su funcionalidad y rendimiento.",
      },
      {
        title: "SEO Optimizado",
        description:
          "Implementé mejoras SEO centradas en estructura, contenido y metadatos para aumentar la visibilidad y el tráfico orgánico.",
      },
      {
        title: "Experiencia de uso",
        description:
          "Optimicé la experiencia de usuario ajustando navegación, tiempos de carga y claridad visual para lograr una interacción más fluida e intuitiva.",
      },
    ],
    link: "Locopolo.com",
  },
];

type TabType = "web" | "social" | "about";

const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState<TabType>("web");
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal({ threshold: 0.3 });
  const { data: dbProjects, isLoading } = useWebProjects();

  // Use database projects if available, otherwise fallback
  const projects = dbProjects && dbProjects.length > 0 ? dbProjects : fallbackProjects;

  return (
    <section id="proyectos" className="px-6 py-24 md:py-32">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div 
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`mb-16 transition-all duration-500 ease-out ${
            titleVisible 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-block text-xs font-medium text-year-accent tracking-[0.2em] uppercase mb-4">
            Trabajo
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Proyectos seleccionados
          </h2>
        </div>

        {/* Minimal Tabs */}
        <div className="flex gap-8 mb-12 border-b border-divider">
          <button
            onClick={() => setActiveTab("web")}
            className={`pb-4 text-sm font-medium tracking-wide transition-all duration-200 border-b-2 -mb-px ${
              activeTab === "web"
                ? "border-foreground text-foreground"
                : "border-transparent text-subtle hover:text-foreground"
            }`}
          >
            Desarrollo Web
          </button>
          <button
            onClick={() => setActiveTab("social")}
            className={`pb-4 text-sm font-medium tracking-wide transition-all duration-200 border-b-2 -mb-px ${
              activeTab === "social"
                ? "border-foreground text-foreground"
                : "border-transparent text-subtle hover:text-foreground"
            }`}
          >
            Creación de Contenido
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`pb-4 text-sm font-medium tracking-wide transition-all duration-200 border-b-2 -mb-px ${
              activeTab === "about"
                ? "border-foreground text-foreground"
                : "border-transparent text-subtle hover:text-foreground"
            }`}
          >
            Sobre Mí
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === "web" ? (
          isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-5 h-5 animate-spin text-subtle" />
            </div>
          ) : (
            <div>
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          )
        ) : activeTab === "social" ? (
          <InstagramFeed />
        ) : (
          <AboutTab />
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
