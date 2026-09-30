import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { translations, Lang } from "./translations";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "es",
  setLang: () => {},
  toggle: () => {},
});

const STORAGE_KEY = "lang";

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Arranca en "es" (igual que el prerender) para no romper la hidratación;
  // la preferencia guardada se aplica tras montar.
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "es") {
        setLangState(saved);
        document.documentElement.lang = saved;
      }
    } catch {
      /* localStorage no disponible */
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
    try {
      document.documentElement.lang = l;
    } catch {
      /* ignore */
    }
  };

  const toggle = () => setLang(lang === "es" ? "en" : "es");

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLang = () => useContext(LanguageContext);

// eslint-disable-next-line react-refresh/only-export-components
export const useT = () => translations[useContext(LanguageContext).lang];
