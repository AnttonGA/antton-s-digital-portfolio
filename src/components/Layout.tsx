import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ClientOnly } from "vite-react-ssg";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Header from "@/components/portfolio/Header";
import Footer from "@/components/portfolio/Footer";

// Scrolls to the hash target on navigation, or to the top on a plain route change.
const ScrollManager = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [hash, pathname]);

  return null;
};

const Layout = () => (
  <LanguageProvider>
    <TooltipProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <ScrollManager />
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      {/* Feedback UI: solo en cliente para no romper el prerender */}
      <ClientOnly>
        {() => (
          <>
            <Toaster />
            <Sonner />
          </>
        )}
      </ClientOnly>
    </TooltipProvider>
  </LanguageProvider>
);

export default Layout;
