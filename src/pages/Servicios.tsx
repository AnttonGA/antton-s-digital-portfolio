import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Seo from "@/components/Seo";

interface ServicePackage {
  title: string;
  description: string;
  points: string[];
  duration: string;
  price?: string;
}

const packages: ServicePackage[] = [
  {
    title: "Diagnóstico de automatización",
    description:
      "Antes de construir nada, miro tu operativa real. Identifico los tres o cuatro procesos que más te compensa automatizar y te entrego una hoja de ruta con presupuesto por fases, para que decidas con datos y sin comprometerte a todo de golpe.",
    points: [
      "Revisión de tus procesos reales, no de una plantilla",
      "Los 3–4 procesos que más horas te ahorran, priorizados",
      "Plan por fases con un presupuesto para cada una",
    ],
    duration: "Dos o tres días",
    price: "Desde 600 €",
  },
  {
    title: "Automatizar un proceso concreto",
    description:
      "Cogemos esa tarea repetitiva que os come horas y la dejamos funcionando sola. Conecto las herramientas que ya usas y, donde hace falta, meto IA para que el proceso se encargue solo.",
    points: [
      "Pedidos que llegan por WhatsApp o email y acaban solos en tu sistema",
      "Facturas en PDF que se vuelcan a contabilidad",
      "Informes mensuales que se generan y se envían solos",
    ],
    duration: "Dos o tres semanas",
  },
  {
    title: "Asistente sobre tu documentación",
    description:
      "Monto un buscador o asistente que responde desde los manuales, catálogos y procedimientos reales de tu empresa. Tu equipo pregunta en lenguaje normal y obtiene la respuesta correcta, con su fuente.",
    points: [
      "Responde desde tu documentación real; no se lo inventa",
      "Tu equipo deja de buscar en carpetas y PDFs",
      "Se actualiza cuando cambia tu documentación",
    ],
    duration: "Según el volumen de documentación",
  },
];

const Servicios = () => {
  return (
    <>
      <Seo
        title="Servicios · Automatización e IA para empresas · Antton Gorrochategui"
        description="Diagnóstico de automatización, automatización de procesos concretos y asistentes con IA sobre tu documentación. Sin precios ocultos: el alcance se cierra en una valoración gratuita."
        path="/servicios"
      />
      {/* Intro */}
      <section className="px-6 pt-20 md:pt-28 pb-12">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          <span className="inline-block text-xs font-medium text-year-accent tracking-[0.2em] uppercase mb-4">
            Servicios
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.02] mb-6 max-w-3xl">
            Qué puedo automatizar en tu empresa.
          </h1>
          <p className="text-base md:text-lg text-subtle leading-relaxed font-light max-w-2xl">
            Tres formas de empezar, según lo claro que tengas el problema. El alcance y el
            presupuesto los cerramos en la valoración gratuita, sin compromiso.
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="px-6 pb-8">
        <div className="max-w-4xl mx-auto">
          {packages.map((pkg, i) => (
            <article key={pkg.title} className="border-t border-divider py-10 md:py-12">
              <div className="grid md:grid-cols-[auto_1fr] gap-4 md:gap-10">
                <span className="text-sm font-medium text-year-accent tracking-[0.15em]">
                  0{i + 1}
                </span>
                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
                    {pkg.title}
                  </h2>
                  <p className="text-subtle text-base leading-relaxed font-light max-w-2xl mb-6">
                    {pkg.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {pkg.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm text-foreground/90">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground shrink-0" />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    {pkg.price && (
                      <span className="text-sm font-semibold text-foreground">{pkg.price}</span>
                    )}
                    <span className="text-xs text-subtle uppercase tracking-wider">
                      Duración orientativa: <span className="text-foreground/80">{pkg.duration}</span>
                    </span>
                    <Link
                      to="/#contacto"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground group"
                    >
                      <span className="border-b border-foreground pb-0.5">Hablar de esto</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Maintenance */}
      <section className="px-6 py-16 md:py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block text-xs font-medium text-year-accent tracking-[0.2em] uppercase mb-4">
            Servicio recurrente
          </span>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
            Mantenimiento mensual
          </h2>
          <p className="text-subtle text-base leading-relaxed font-light max-w-2xl">
            Una vez algo está funcionando, me encargo de que siga funcionando: vigilancia,
            ajustes, pequeñas mejoras y soporte. Un servicio recurrente para que la automatización
            evolucione contigo y no dependas de nadie a última hora.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
            ¿Cuál encaja con tu caso?
          </h2>
          <p className="text-base text-subtle leading-relaxed font-light max-w-xl mx-auto mb-8">
            Cuéntame el proceso que te come horas y te digo si tiene solución, cuánto costaría a
            grandes rasgos y por dónde empezaría. Sin compromiso.
          </p>
          <Link
            to="/#contacto"
            className="inline-flex items-center justify-center text-sm font-medium bg-foreground text-background px-5 py-2.5 rounded-sm hover:opacity-90 transition-opacity duration-200"
          >
            Pedir valoración gratuita
          </Link>
        </div>
      </section>
    </>
  );
};

export default Servicios;
