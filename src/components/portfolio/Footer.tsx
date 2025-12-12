const Footer = () => {
  return (
    <footer className="px-6 py-8 border-t border-border">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-subtle">
        <p>© 2025 Antton G. Aguirre. Todos los derechos reservados.</p>
        <nav className="flex gap-6">
          <a href="#proyectos" className="hover:text-foreground transition-colors">
            Proyectos
          </a>
          <a href="#contacto" className="hover:text-foreground transition-colors">
            Contacto
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
