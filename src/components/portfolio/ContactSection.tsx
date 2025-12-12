import { Mail, Phone, Instagram, Linkedin } from "lucide-react";

const ContactSection = () => {
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
    <section id="contacto" className="px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Message */}
          <div className="space-y-6 animate-fade-in-up">
            <span className="text-sm font-medium text-year-accent tracking-widest uppercase">
              Contacto
            </span>
            <h2 className="text-4xl md:text-5xl font-bold">
              Trabajemos juntos
            </h2>
            <p className="text-lg text-subtle leading-relaxed">
              Estoy abierto a colaborar en proyectos donde pueda aportar mi experiencia 
              en marketing digital, desarrollo web y creación de contenido. Me gusta 
              trabajar de forma clara, estratégica y orientada a resultados. Si crees 
              que encajo en tu proyecto, estaré encantado de que trabajemos juntos.
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-6 animate-fade-in-up delay-200">
            {contactItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 p-4 rounded-lg bg-project-card border border-project-card hover:border-primary/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <span className="text-sm text-subtle">{item.label}</span>
                  <p className="font-medium group-hover:text-primary transition-colors">
                    {item.value}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
