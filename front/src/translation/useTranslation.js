import { useContext } from "react";
import { TranslationContext } from "@/translation/TranslationContext";

export const useTranslation = () => {
  const { translations, locale, setLocale } = useContext(TranslationContext);
  const t = (key) => translations?.[locale]?.[key] ?? key;
  return { locale, setLocale, t };
};
