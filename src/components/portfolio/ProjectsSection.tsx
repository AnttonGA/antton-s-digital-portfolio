import { useState } from "react";
import ProjectCard, { ProjectData } from "./ProjectCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Code, Megaphone } from "lucide-react";

// Web Development Projects
const webDevProjects: ProjectData[] = [
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
    year: "2025",
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

// Social Media / Content Creation Projects (placeholder - user can add content)
const socialMediaProjects: ProjectData[] = [
  {
    id: "social-placeholder",
    title: "Próximamente",
    year: "2025",
    type: "RRSS / Contenido",
    description:
      "Aquí se mostrarán los proyectos de gestión de redes sociales y creación de contenido. Esta sección está preparada para añadir nuevos proyectos de forma modular.",
    features: [
      {
        title: "Gestión de RRSS",
        description:
          "Estrategias de contenido y gestión de comunidades en redes sociales.",
      },
      {
        title: "Creación de contenido",
        description:
          "Desarrollo de contenido visual y escrito para plataformas digitales.",
      },
      {
        title: "Analítica social",
        description:
          "Medición y análisis de resultados en campañas de redes sociales.",
      },
    ],
  },
];

type TabType = "web" | "social";

const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState<TabType>("web");
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal({ threshold: 0.3 });

  const currentProjects = activeTab === "web" ? webDevProjects : socialMediaProjects;

  return (
    <section id="proyectos" className="px-6 py-20 bg-secondary/50">
      <div className="max-w-5xl mx-auto">
        <h2 
          ref={titleRef as React.RefObject<HTMLHeadingElement>}
          className={`text-3xl md:text-4xl font-bold mb-8 transition-all duration-700 ease-out ${
            titleVisible 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-6"
          }`}
        >
          Proyectos
        </h2>

        {/* Tabs */}
        <div className="flex gap-2 mb-10">
          <button
            onClick={() => setActiveTab("web")}
            className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === "web"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <Code className="w-4 h-4" />
            Desarrollo Web
          </button>
          <button
            onClick={() => setActiveTab("social")}
            className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === "social"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <Megaphone className="w-4 h-4" />
            Gestión RRSS / Contenido
          </button>
        </div>

        {/* Projects */}
        <div className="space-y-8">
          {currentProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
