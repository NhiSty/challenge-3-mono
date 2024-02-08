import { Input } from "@components/form/Input";
import toTranslate from "@/utils/translate";
import { useController, useFormContext } from "react-hook-form";
import { useTranslation } from "@/translation/useTranslation";

export default function FranchiseManager() {
  const { t } = useTranslation();
  // todo : faire en sorte de récupérer tous les utilisateurs de type franchise_manager pour les mettre dans un select et pourvoir les assigner à une franchise
  const {
    formState: { errors },
  } = useFormContext();
  const name = "franchise_manager";
  const label = toTranslate("Manager de la franchise");
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
