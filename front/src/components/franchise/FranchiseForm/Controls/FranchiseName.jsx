import { Input } from "@components/form/Input";
import toTranslate from "@/utils/translate";
import { useController, useFormContext } from "react-hook-form";

export default function FranchiseName() {
  const {
    formState: { errors },
  } = useFormContext();
  const name = "franchise_name";
  const label = toTranslate("Nom de la franchise");
  const error = errors[name];
  const requiredErrorMessage =
    error?.type === "required"
      ? `${label} ${toTranslate("est obligatoire")}`
      : "";

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
