import Seo from "@/components/Seo";
import { useT } from "@/i18n/LanguageContext";
import HeroSection from "@/components/portfolio/HeroSection";
import ServicesSection from "@/components/portfolio/ServicesSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import ContactSection from "@/components/portfolio/ContactSection";

const Index = () => {
  const t = useT();

  return (
    <>
      <Seo title={t.seo.home.title} description={t.seo.home.description} path="/" />
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
};

export default Index;
