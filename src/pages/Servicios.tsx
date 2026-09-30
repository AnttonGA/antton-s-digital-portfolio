import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Seo from "@/components/Seo";
import { useT } from "@/i18n/LanguageContext";

const Servicios = () => {
  const t = useT();
  const p = t.serviciosPage;

  return (
    <>
      <Seo title={t.seo.servicios.title} description={t.seo.servicios.description} path="/servicios" />

      {/* Intro */}
      <section className="px-6 pt-20 md:pt-28 pb-12">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          <span className="inline-block text-xs font-medium text-year-accent tracking-[0.2em] uppercase mb-4">
            {p.eyebrow}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.02] mb-6 max-w-3xl">
            {p.title}
          </h1>
          <p className="text-base md:text-lg text-subtle leading-relaxed font-light max-w-2xl">
            {p.intro}
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="px-6 pb-8">
        <div className="max-w-4xl mx-auto">
          {p.packages.map((pkg, i) => (
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
                      {p.durationLabel} <span className="text-foreground/80">{pkg.duration}</span>
                    </span>
                    <Link
                      to="/#contacto"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground group"
                    >
                      <span className="border-b border-foreground pb-0.5">{p.packageCta}</span>
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
            {p.maintenanceEyebrow}
          </span>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
            {p.maintenanceTitle}
          </h2>
          <p className="text-subtle text-base leading-relaxed font-light max-w-2xl">
            {p.maintenanceDesc}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">{p.ctaTitle}</h2>
          <p className="text-base text-subtle leading-relaxed font-light max-w-xl mx-auto mb-8">
            {p.ctaDesc}
          </p>
          <Link
            to="/#contacto"
            className="inline-flex items-center justify-center text-sm font-medium bg-foreground text-background px-5 py-2.5 rounded-sm hover:opacity-90 transition-opacity duration-200"
          >
            {p.ctaButton}
          </Link>
        </div>
      </section>
    </>
  );
};

export default Servicios;
