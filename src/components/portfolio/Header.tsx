import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Servicios", href: "/servicios" },
  { label: "Casos", href: "/#proyectos" },
  { label: "Agencias", href: "/agencias" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-divider bg-background/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="font-semibold tracking-tight text-base sm:text-lg"
        >
          Antton Gorrochategui
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-sm text-subtle hover:text-foreground transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/#contacto"
            className="text-sm font-medium bg-foreground text-background px-4 py-2 rounded-sm hover:opacity-90 transition-opacity duration-200"
          >
            Valoración gratuita
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden p-2 -mr-2 text-foreground"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav
          id="mobile-nav"
          className="md:hidden border-t border-divider bg-background px-6 py-4 flex flex-col gap-4"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setOpen(false)}
              className="text-sm text-subtle hover:text-foreground transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/#contacto"
            onClick={() => setOpen(false)}
            className="text-sm font-medium bg-foreground text-background px-4 py-2 rounded-sm text-center hover:opacity-90 transition-opacity duration-200"
          >
            Valoración gratuita
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
