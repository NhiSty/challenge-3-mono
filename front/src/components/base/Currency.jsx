import { useTranslation } from "@/translation/useTranslation";
import PropTypes from "prop-types";

export function Currency({ amount }) {
  const { locale } = useTranslation();
  const currency = locale === "en" ? "USD" : "EUR";

  const formatted = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);

  return <>{formatted}</>;
}

Currency.propTypes = {
  amount: PropTypes.number.isRequired,
};
