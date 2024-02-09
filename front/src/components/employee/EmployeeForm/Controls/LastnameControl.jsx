import { useController, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";
import { useTranslation } from "@/translation/useTranslation";

export default function LastnameControl() {
  const { t } = useTranslation();
  const name = "lastname";
  const label = t("lastname");
  const {
    formState: { errors },
  } = useFormContext();
  const hasError = errors[name];
  const errorMessage = hasError ? `${label} ${t("isRequired")}` : "";

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
          size={"small"}
          fullWidth={true}
          id={name}
          name={name}
          label={label}
          placeholder="Larue"
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
