import { useController, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";
import { useTranslation } from "@/translation/useTranslation";

export default function PriceControl() {
  const { t } = useTranslation();
  const label = t("price");
  const name = "price";
  const {
    formState: { errors },
  } = useFormContext();
  const error = errors[name];
  const {
    field: { value, onChange },
  } = useController({
    name,
    rules: {
      required: false,
      validate: {
        positive: (value) => value >= 0,
      },
    },
    defaultValue: "0",
  });

  return (
    <>
      <div className="mb-4">
        <TextField
          size={"small"}
          fullWidth={true}
          id={name}
          name={name}
          type={"number"}
          label={label}
          value={value}
          onChange={onChange}
          error={!!error}
        />
        {!!error && error.type === "positive" && (
          <div className="text-red-500 text-xs mt-1">{`${label} ${t("mustBePositive")}`}</div>
        )}
      </div>
    </>
  );
}
