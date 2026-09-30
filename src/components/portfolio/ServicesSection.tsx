import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface Service {
  title: string;
  description: string;
}

const services: Service[] = [
  {
    title: "Diagnóstico de automatización",
    description:
      "Reviso los procesos reales de tu empresa y te digo cuáles compensa automatizar. Te entrego un plan por fases con presupuesto para cada una. En pocos días tienes una hoja de ruta clara.",
  },
  {
    title: "Automatizar un proceso concreto",
    description:
      "Esa tarea repetitiva que os come horas: pedidos que llegan por WhatsApp o email y acaban solos en el sistema, facturas en PDF que se vuelcan a contabilidad, informes que se generan solos.",
  },
  {
    title: "Asistente sobre tu documentación",
    description:
      "Un buscador o asistente que responde desde tus manuales, catálogos y procedimientos reales. Tu equipo deja de perder el tiempo buscando en carpetas.",
  },
];

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      className={`border-t border-divider pt-6 transition-all duration-500 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <span className="block text-xs font-medium text-year-accent tracking-[0.15em] mb-4">
        0{index + 1}
      </span>
      <h3 className="text-lg font-semibold tracking-tight mb-3">{service.title}</h3>
      <p className="text-subtle text-sm leading-relaxed font-light">{service.description}</p>
    </article>
  );
};

const ServicesSection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal({ threshold: 0.3 });

  return (
    <section id="servicios" className="px-6 py-24 md:py-32 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`mb-16 max-w-2xl transition-all duration-500 ease-out ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-block text-xs font-medium text-year-accent tracking-[0.2em] uppercase mb-4">
            Servicios
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Cómo te quito trabajo de encima
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        {/* Maintenance + links */}
        <div className="mt-16 pt-8 border-t border-divider flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-subtle font-light max-w-md">
            ¿Ya está funcionando? Ofrezco <span className="text-foreground">mantenimiento mensual</span>{" "}
            para que siga rodando y evolucione contigo.
          </p>
          <Link
            to="/servicios"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground group shrink-0"
          >
            <span className="border-b border-foreground pb-0.5">Ver los servicios en detalle</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </Link>
        </div>

        {/* Agencies pointer */}
        <p className="mt-6 text-sm text-subtle font-light">
          ¿Eres agencia o estudio de diseño? Trabajo en marca blanca bajo tu marca.{" "}
          <Link to="/agencias" className="text-foreground underline underline-offset-4 hover:no-underline">
            Cómo colaboro con agencias
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ServicesSection;
