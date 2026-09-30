import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
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
  <div className="min-h-screen bg-background flex flex-col">
    <ScrollManager />
    <Header />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
