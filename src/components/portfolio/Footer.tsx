const Footer = () => {
  return (
    <footer className="px-6 py-10 border-t border-divider">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-subtle">
        <p className="tracking-wide">© 2025 Antton G. Aguirre</p>
        <nav className="flex gap-8">
          <a 
            href="#proyectos" 
            className="hover:text-foreground transition-colors duration-200 tracking-wide uppercase"
          >
            Proyectos
          </a>
          <a 
            href="#contacto" 
            className="hover:text-foreground transition-colors duration-200 tracking-wide uppercase"
          >
            Contacto
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
