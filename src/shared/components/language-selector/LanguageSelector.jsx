import { useState, useRef, useEffect, useMemo } from "react";
import "./LanguageSelector.css";
import { useTranslation } from "react-i18next";
import { setLanguage } from "../../../i18n"; // adjust path if needed

// Optional: map language codes to the translation keys used for display names.
// (Keeps labels fully sourced from translation.json via t('newLetter.language.*'))
const LABEL_KEYS = {
  en: "newLetter.language.english",
  nl: "newLetter.language.dutch",
  fr: "newLetter.language.french",
};

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const containerRef = useRef(null);

  // Derive supported languages from i18n config (no hardcoding)
  const supportedLngs = useMemo(() => {
    const res = i18n?.options?.resources ?? {};
    return Object.keys(res); // ['en','nl','fr']
  }, [i18n?.options?.resources]);

  // Selected label is derived from current i18n.language
  const [open, setOpen] = useState(false);
  const selectedLng = i18n.language?.split("-")[0] || "en"; // normalize en-US -> en

  // Close when clicking outside
  useEffect(() => {
    const onDocClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const handleToggle = () => setOpen((prev) => !prev);

  const handleSelect = (lng) => {
    setLanguage(lng); // persists and updates <html lang="">
    setOpen(false);
  };

  // Helper: get the localized label for a language code from translation.json
  const getLabelForLng = (lng) => {
    const key = LABEL_KEYS[lng];
    if (!key) return lng; // fallback if a code has no label key
    // Use defaultValue so UI doesn't break if the key is missing in a locale
    return t(key, { defaultValue: lng });
  };

  // The visible selected label
  const selectedLabel = getLabelForLng(selectedLng);

  return (
    <div className="language-selector" ref={containerRef}>
      <button
        type="button"
        className="language-trigger"
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("language.select", {
          defaultValue: `Selected language: ${selectedLabel}. Open language list.`,
        })}
      >
        <span className="selected-language">{selectedLabel}</span>
        <i
          className={`fa-solid fa-angle-${open ? "up" : "down"}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          className="language-flyout"
          role="listbox"
          aria-label={t("language.select", {
            defaultValue: "Choose a language",
          })}
        >
          {supportedLngs.map((lng) => {
            const label = getLabelForLng(lng);
            const isActive = selectedLng === lng;
            return (
              <li key={lng}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  className={`language-option ${isActive ? "is-active" : ""}`}
                  onClick={() => handleSelect(lng)}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
