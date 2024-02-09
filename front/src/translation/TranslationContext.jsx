import { createContext, useEffect, useState } from "react";
import { apiPublicClient } from "@/api";
import PropTypes from "prop-types";
import { useStorage } from "@/hooks/useStorage";

export const TranslationContext = createContext({
  locale: "fr",
  setLocale: () => void 0,
  translations: {
    fr: {},
    en: {},
  },
});

const TranslationProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [translations, setTranslations] = useState(null);
  const [locale, setLocale] = useStorage(
    "locale",
    navigator.language ?? "fr",
    "localStorage",
  );

  useEffect(() => {
    setLoading(true);
    apiPublicClient
      .get("/translations")
      .then((response) => {
        const translations = response.data;
        setTranslations(translations);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <TranslationContext.Provider value={{ translations, locale, setLocale }}>
      {children}
    </TranslationContext.Provider>
  );
};

TranslationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TranslationProvider;
