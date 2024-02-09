import { useController, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";
import { useTranslation } from "@/translation/useTranslation";

export default function AgeControl() {
  const { t } = useTranslation();
  const name = "age";
  const label = t("age");
  const {
    formState: { errors },
  } = useFormContext();
  const error = errors[name];
  const errored = !!error;

  const {
    field: { value, onChange },
  } = useController({
    name,
    rules: {
      required: true,
      validate: {
        positiveNumber: (value) => parseFloat(value) > 0,
        majorNumber: (value) => parseFloat(value) >= 18,
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
          placeholder={label}
          value={value}
          onChange={onChange}
          error={!!errored}
          type={"number"}
        />
        {errored && error.type === "required" && (
          <div className="text-red-500 text-xs mt-1">{`${label} ${t("isRequired")}`}</div>
        )}
        {errored && error.type === "positiveNumber" && (
          <div className="text-red-500 text-xs mt-1">{`${label} ${t("mustBePositive")}`}</div>
        )}
        {errored && error.type === "majorNumber" && (
          <div className="text-red-500 text-xs mt-1">{`${label} ${t("mustBeGreaterThan")} 18`}</div>
        )}
      </div>
    </>
  );
}
