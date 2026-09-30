import { Mail, Phone, Linkedin, ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import LeadForm from "./LeadForm";

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: "anttongorrochategui@gmail.com",
    href: "mailto:anttongorrochategui@gmail.com",
  },
  {
    icon: Phone,
    label: "Móvil",
    value: "+34 653 893 353",
    href: "tel:+34653893353",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Antton Gorrochategui",
    href: "https://www.linkedin.com/in/antton-gorrochategui-aguirre-03502330a/",
  },
];

const ContactSection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section id="contacto" className="px-6 py-24 md:py-32 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`mb-12 max-w-2xl transition-all duration-500 ease-out ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-block text-xs font-medium text-year-accent tracking-[0.2em] uppercase mb-4">
            Valoración gratuita
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-5">
            Cuéntame el proceso que te come horas
          </h2>
          <p className="text-base text-subtle leading-relaxed font-light">
            Te digo si tiene solución, cuánto costaría a grandes rasgos y por dónde
            empezaría. Sin compromiso y sin tecnicismos.
          </p>
        </div>

        <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 md:gap-16 items-start">
          {/* Form */}
          <LeadForm />

          {/* Direct contact */}
          <div className="space-y-6">
            <p className="text-sm text-subtle font-light">
              ¿Prefieres el trato directo? Escríbeme o llámame.
            </p>
            <div className="space-y-1">
              {contactItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-between py-3 border-b border-divider hover:text-foreground text-foreground/90 transition-colors duration-200 group"
                >
                  <span className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-subtle shrink-0" strokeWidth={1.5} />
                    <span className="text-sm">{item.value}</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-subtle opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0" />
                </a>
              ))}
            </div>
            <p className="text-sm text-subtle font-light">
              Con base en Donostia · disponible en remoto.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
