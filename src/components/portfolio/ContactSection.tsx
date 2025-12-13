import { Mail, Phone, Instagram, Linkedin, ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const ContactSection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal({ threshold: 0.2 });
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal({ threshold: 0.1 });

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
      value: "+34 653 89 33 53",
      href: "tel:+34653893353",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@anttooon",
      href: "https://instagram.com/anttooon",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Antton Gorrochategui",
      href: "https://linkedin.com/in/antton-gorrochategui",
    },
  ];

  return (
    <section id="contacto" className="px-6 py-24 md:py-32">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Message */}
          <div 
            ref={titleRef as React.RefObject<HTMLDivElement>}
            className={`space-y-6 transition-all duration-500 ease-out ${
              titleVisible 
                ? "opacity-100 translate-x-0" 
                : "opacity-0 -translate-x-6"
            }`}
          >
            <span className="inline-block text-xs font-medium text-year-accent tracking-[0.2em] uppercase">
              Contacto
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Trabajemos<br />juntos
            </h2>
            <p className="text-base text-subtle leading-relaxed font-light">
              Estoy abierto a colaborar en proyectos donde pueda aportar mi experiencia 
              en marketing digital, desarrollo web y creación de contenido. Me gusta 
              trabajar de forma clara, estratégica y orientada a resultados.
            </p>
          </div>

          {/* Contact Details */}
          <div 
            ref={cardsRef as React.RefObject<HTMLDivElement>}
            className="space-y-1"
          >
            {contactItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`flex items-center justify-between py-4 border-b border-divider hover:bg-accent/50 transition-all duration-300 ease-out group ${
                  cardsVisible 
                    ? "opacity-100 translate-x-0" 
                    : "opacity-0 translate-x-6"
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="flex items-center gap-4">
                  <item.icon className="w-4 h-4 text-subtle" strokeWidth={1.5} />
                  <div>
                    <span className="text-xs text-year-accent uppercase tracking-wider">{item.label}</span>
                    <p className="text-sm font-medium">{item.value}</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-subtle opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
