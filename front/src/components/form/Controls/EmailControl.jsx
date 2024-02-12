import { useController, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";
import { useTranslation } from "@/translation/useTranslation";

export default function EmailControl() {
  const { t } = useTranslation();
  const name = "email";
  const label = t("email");
  const {
    formState: { errors },
  } = useFormContext();
  const error = errors[name];
  const requiredErrorMessage =
    error?.type === "required" ? `${label} ${t("isRequired")}` : "";
  const patternErrorMessage =
    error?.type === "pattern" ? `${label} ${t("isInvalid")}` : "";
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
