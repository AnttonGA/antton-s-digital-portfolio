import { useScrollReveal } from "@/hooks/useScrollReveal";

interface Service {
  title: string;
  description: string;
}

const services: Service[] = [
  {
    title: "Desarrollo web y ecommerce",
    description:
      "Sitios y tiendas online a medida, de la base de datos a la interfaz. Rápidos, mantenibles y pensados para vender, no plantillas maquilladas.",
  },
  {
    title: "Automatización e integración de IA",
    description:
      "Flujos con LLMs que hacen trabajo real: triaje, generación de contenido, RAG sobre tus propios datos y la observabilidad para saber qué está pasando.",
  },
  {
    title: "Colaboración en marca blanca para agencias",
    description:
      "Ejecuto la parte técnica y tú das la cara ante el cliente. Vengo del marketing, así que entiendo un briefing de agencia sin traducción de por medio.",
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
          className={`mb-16 transition-all duration-500 ease-out ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-block text-xs font-medium text-year-accent tracking-[0.2em] uppercase mb-4">
            Servicios
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            En qué puedo ayudarte
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
