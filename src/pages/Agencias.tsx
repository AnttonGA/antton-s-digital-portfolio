import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { useT } from "@/i18n/LanguageContext";

const Agencias = () => {
  const t = useT();
  const p = t.agenciasPage;

  return (
    <>
      <Seo title={t.seo.agencias.title} description={t.seo.agencias.description} path="/agencias" />

      {/* Intro */}
      <section className="px-6 pt-20 md:pt-28 pb-16">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          <span className="inline-block text-xs font-medium text-year-accent tracking-[0.2em] uppercase mb-4">
            {p.eyebrow}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.02] mb-6 max-w-3xl">
            {p.title}
          </h1>
          <p className="text-base md:text-lg text-subtle leading-relaxed font-light max-w-2xl mb-8">
            {p.intro}
          </p>
          <Link
            to="/#contacto"
            className="inline-flex items-center justify-center text-sm font-medium bg-foreground text-background px-5 py-2.5 rounded-sm hover:opacity-90 transition-opacity duration-200"
          >
            {p.ctaTop}
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-16 md:py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-12">{p.howTitle}</h2>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10">
            {p.model.map((item, i) => (
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
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-8">{p.capsTitle}</h2>
          <ul className="grid sm:grid-cols-2 gap-4 mb-10">
            {p.capabilities.map((cap) => (
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
            {p.capsLink}
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 md:py-24 bg-muted/30">
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

export default Agencias;
