import { useController, useFormContext } from "react-hook-form";
import toTranslate from "@/utils/translate";
import { TextField } from "@mui/material";

export default function EmailControl() {
  const name = "email";
  const label = toTranslate("Email");
  const {
    formState: { errors },
  } = useFormContext();
  const error = errors[name];
  const requiredErrorMessage =
    error?.type === "required"
      ? `${label} ${toTranslate("est obligatoire")}`
      : "";
  const patternErrorMessage =
    error?.type === "pattern" ? `${label} ${toTranslate("est invalide")}` : "";
  const errorMessage = requiredErrorMessage || patternErrorMessage;

  const {
    field: { value, onChange },
  } = useController({
    name,
    rules: {
      required: true,
      pattern: {
        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
      },
    },
    defaultValue: "",
  });

  return (
    <>
      <div className="mb-4">
        <TextField
          size={"small"}
          fullWidth={true}
          id={name}
          name={name}
          label={label}
          placeholder="exemple@gmail.com"
          value={value}
          onChange={onChange}
          error={!!errorMessage}
        />
        {!!errorMessage && (
          <div className="text-red-500 text-xs mt-1">{errorMessage}</div>
        )}
      </div>
    </>
  );
}
