import { Input } from "@components/form/Input";
import toTranslate from "@/utils/translate";
import { useController, useFormContext } from "react-hook-form";
import { useTranslation } from "@/translation/useTranslation";

export default function FranchisePhone() {
  const { t } = useTranslation();
  // todo : Bien adapter, là c'est juste pour la démo
  const {
    formState: { errors },
  } = useFormContext();
  const name = "franchise_phone";
  const label = toTranslate("Téléphone de la franchise");
  const error = errors[name];
  const requiredErrorMessage =
    error?.type === "required" ? `${label} ${t("isRequired")}` : "";

  const {
    field: { value, onChange },
  } = useController({
    name,
    rules: {
      required: true,
    },
  });

  return (
    <Input
      id={name}
      label={label}
      error={requiredErrorMessage}
      value={value}
      onChange={onChange}
    />
  );
}
