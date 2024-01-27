import { useController, useFormContext } from "react-hook-form";
import { Input } from "@components/form/Input";
import toTranslate from "@/utils/translate";
import {TextField} from "@mui/material";

export default function FirstnameControl() {
  const name = "firstname";
  const label = toTranslate("Firstname");
  const {
    formState: { errors },
  } = useFormContext();
  const hasError = errors[name];
  const errorMessage = hasError
    ? `${label} ${toTranslate("Ce champ est obligatoire")}`
    : "";
  const {
    field: { value, onChange },
  } = useController({
    name,
    rules: { required: true },
    defaultValue: "",
  });

  return (
    <>
      <div className="mb-4">
        <TextField
            size={'small'}
            fullWidth={true}
            id={name}
            name={name}
            label={label}
            placeholder="Firstname"
            value={value}
            onChange={onChange}
            error={!!errorMessage}
        />
      </div>
    </>
  );
}
