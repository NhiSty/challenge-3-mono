import { Switch } from "@mui/material";

import { useTranslation } from "@/translation/useTranslation";

export default function SwitchLanguage() {
  const { setLocale, locale, t } = useTranslation();

  return (
    <div className="flex items-center">
      <span>EN</span>
      <Switch
        checked={locale === "fr"}
        onClick={() => {
          return setLocale(locale === "fr" ? "en" : "fr");
        }}
      />
      <span>FR</span>
    </div>
  );
}
