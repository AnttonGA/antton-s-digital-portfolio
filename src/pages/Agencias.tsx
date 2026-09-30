import { Link } from "react-router-dom";

const model = [
  {
    title: "Bajo tu marca",
    description:
      "Trabajo en segundo plano. Tú das la cara ante tu cliente; yo no aparezco en ningún momento.",
  },
  {
    title: "El código es tuyo",
    description:
      "Repositorio tuyo desde el primer día y código documentado. Sin cajas negras ni dependencias de mí para mantenerlo.",
  },
  {
    title: "Tú pones tu margen",
    description:
      "Te paso un precio de coste técnico; lo que le cobras a tu cliente lo decides tú.",
  },
  {
    title: "No capto a tus clientes",
    description:
      "Compromiso de no captación: no contacto ni trabajo directamente con tus clientes. Esa relación es tuya.",
  },
  {
    title: "Dos rondas de revisión",
    description:
      "Cada proyecto incluye dos rondas de revisión para ajustar el resultado antes de la entrega.",
  },
  {
    title: "Comunicación clara",
    description:
      "Vengo del marketing: entiendo un briefing de agencia sin traducción de por medio y te hablo en tu idioma, no en tecnicismos.",
  },
];

const capabilities = [
  "Webs y ecommerce a medida",
  "Automatización de procesos",
  "Integración de IA (agentes, RAG sobre documentación)",
  "Asistentes internos y buscadores sobre datos propios",
];

const Agencias = () => {
  return (
    <>
      {/* Intro */}
      <section className="px-6 pt-20 md:pt-28 pb-16">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          <span className="inline-block text-xs font-medium text-year-accent tracking-[0.2em] uppercase mb-4">
            Para agencias y estudios
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.02] mb-6 max-w-3xl">
            La capa técnica bajo tu marca.
          </h1>
          <p className="text-base md:text-lg text-subtle leading-relaxed font-light max-w-2xl mb-8">
            Si tu estudio de diseño o branding recibe proyectos que necesitan desarrollo o
            automatización con IA, los ejecuto por ti en marca blanca. Tú mantienes al cliente
            y tu marca; yo pongo la parte técnica.
          </p>
          <Link
            to="/#contacto"
            className="inline-flex items-center justify-center text-sm font-medium bg-foreground text-background px-5 py-2.5 rounded-sm hover:opacity-90 transition-opacity duration-200"
          >
            Hablemos de tu proyecto
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-16 md:py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-12">
            Cómo colaboro
          </h2>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10">
            {model.map((item, i) => (
              <div key={item.title} className="border-t border-divider pt-5">
                <span className="block text-xs font-medium text-year-accent tracking-[0.15em] mb-3">
                  0{i + 1}
                </span>
                <h3 className="text-lg font-semibold tracking-tight mb-2">{item.title}</h3>
                <p className="text-subtle text-sm leading-relaxed font-light">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="px-6 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-8">
            Qué puedo construir para tus clientes
          </h2>
          <ul className="grid sm:grid-cols-2 gap-4 mb-10">
            {capabilities.map((cap) => (
              <li key={cap} className="flex items-start gap-3 text-sm text-foreground/90">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground shrink-0" />
                <span className="leading-relaxed">{cap}</span>
              </li>
            ))}
          </ul>
          <Link
            to="/servicios"
            className="text-sm font-medium text-foreground underline underline-offset-4 hover:no-underline"
          >
            Ver los servicios en detalle
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 md:py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
            ¿Tienes un proyecto para un cliente?
          </h2>
          <p className="text-base text-subtle leading-relaxed font-light max-w-xl mx-auto mb-8">
            Cuéntame qué necesitas y te digo si encaja, cuánto costaría a grandes rasgos y en
            cuánto tiempo. Sin compromiso.
          </p>
          <Link
            to="/#contacto"
            className="inline-flex items-center justify-center text-sm font-medium bg-foreground text-background px-5 py-2.5 rounded-sm hover:opacity-90 transition-opacity duration-200"
          >
            Hablemos
          </Link>
        </div>
      </section>
    </>
  );
};

export default Agencias;
