import Seo from "@/components/Seo";
import HeroSection from "@/components/portfolio/HeroSection";
import ServicesSection from "@/components/portfolio/ServicesSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import ContactSection from "@/components/portfolio/ContactSection";

const Index = () => {
  return (
    <>
      <Seo
        title="Antton Gorrochategui · Automatización de procesos con IA"
        description="Automatizo los procesos que hoy haces a mano: pedidos, facturas, informes y asistentes con IA. Desarrollo full-stack a medida en Donostia. Valoración gratuita, sin compromiso."
        path="/"
      />
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
};

export default Index;
