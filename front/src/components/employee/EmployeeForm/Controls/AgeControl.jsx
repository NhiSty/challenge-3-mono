import { useController, useFormContext } from "react-hook-form";
import toTranslate from "@/utils/translate";
import {TextField} from "@mui/material";

export default function AgeControl() {
  const name = "age";
  const label = toTranslate("Age");
  const {
    formState: { errors },
  } = useFormContext();
  const hasError = errors[name];
  const errorMessage = hasError
    ? `${label} ${toTranslate("est obligatoire")}`
    : "";

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
            size={'small'}
            fullWidth={true}
            id={name}
            name={name}
            label={label}
            placeholder={label}
            value={value}
            onChange={onChange}
            error={!!errorMessage}
            type={'number'}
        />
        {
            !!errorMessage && (
                <div className="text-red-500 text-xs mt-1">{errorMessage}</div>
            )
        }
      </div>
    </>
  );
}
