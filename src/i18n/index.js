import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import JSON translations
import en from "./locales/en/tranlsations.json";
import nl from "./locales/nl/tranlsations.json";
import fr from "./locales/fr/tranlsations.json";

// Optional: read saved language from localStorage
const savedLang =
  typeof window !== "undefined" ? localStorage.getItem("lng") : null;
const initialLang = savedLang || "en";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    nl: { translation: nl },
    fr: { translation: fr },
  },
  lng: initialLang, // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already escapes
  },
});

// Helper to change language and persist
export const setLanguage = (lng) => {
  i18n.changeLanguage(lng);
  if (typeof window !== "undefined") {
    localStorage.setItem("lng", lng);
    document.documentElement.lang = lng; // accessibility/SEO hint
  }
};

export default i18n;
