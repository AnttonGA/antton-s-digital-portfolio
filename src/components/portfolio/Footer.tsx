import { Link } from "react-router-dom";
import { useT } from "@/i18n/LanguageContext";

const Footer = () => {
  const t = useT();

  const links = [
    { label: t.footer.servicios, to: "/servicios" },
    { label: t.footer.casos, to: "/#casos" },
    { label: t.footer.agencias, to: "/agencias" },
    { label: t.footer.contacto, to: "/#contacto" },
  ];

  return (
    <footer className="px-6 py-10 border-t border-divider">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-subtle">
        <p className="tracking-wide">© 2026 Antton Gorrochategui</p>
        <nav className="flex flex-wrap justify-center gap-6 sm:gap-8">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="hover:text-foreground transition-colors duration-200 tracking-wide uppercase"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
