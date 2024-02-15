import { useContext } from "react";
import { TranslationContext } from "@/translation/TranslationContext";

export const useTranslation = () => {
  const { translations, locale, setLocale } = useContext(TranslationContext);
  const realLocale = locale in translations ? locale : "en";
  const t = (key) => translations?.[realLocale]?.[key] ?? key;
  return { locale, setLocale, t };
};
