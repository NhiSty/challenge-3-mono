import { Input } from "@components/form/Input";
import { useController, useFormContext } from "react-hook-form";
import { useTranslation } from "@/translation/useTranslation";

export default function FranchiseAddress() {
  const { t } = useTranslation();
  // todo : bien adapter, là c'est juste pour la démo
  const {
    formState: { errors },
  } = useFormContext();
  const name = "franchise_address";
  const label = t("franchiseAddress");
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
