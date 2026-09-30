import { Link } from "react-router-dom";
import profilePhoto from "@/assets/profile-antton.jpg";
import { useT } from "@/i18n/LanguageContext";

const HeroSection = () => {
  const t = useT();

  return (
    <header className="min-h-[80vh] flex items-center justify-center px-6 py-20 md:py-28">
      <div className="max-w-4xl w-full">
        <div className="grid md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-center animate-fade-in-up">
          {/* Text Content */}
          <div className="space-y-7">
            <span className="inline-block text-xs font-medium text-year-accent tracking-[0.2em] uppercase">
              {t.hero.kicker}
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.02] tracking-[-0.03em]">
              {t.hero.title}
            </h1>

            <p className="text-base md:text-lg text-subtle leading-relaxed max-w-2xl font-light">
              {t.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                to="/#contacto"
                className="inline-flex items-center justify-center text-sm font-medium bg-foreground text-background px-5 py-2.5 rounded-sm hover:opacity-90 transition-opacity duration-200"
              >
                {t.hero.ctaPrimary}
              </Link>
              <Link
                to="/servicios"
                className="inline-flex items-center justify-center text-sm font-medium border border-foreground px-5 py-2.5 rounded-sm hover:bg-foreground hover:text-background transition-colors duration-200"
              >
                {t.hero.ctaSecondary}
              </Link>
            </div>

            <p className="text-sm text-subtle leading-relaxed max-w-2xl font-light pt-2">
              {t.hero.about}
            </p>
          </div>

          {/* Profile Photo */}
          <div className="hidden md:block">
            <div className="w-44 h-44 lg:w-52 lg:h-52 rounded-sm overflow-hidden">
              <img
                src={profilePhoto}
                alt={t.hero.photoAlt}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
