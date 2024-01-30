import { useController, useFormContext } from "react-hook-form";
import toTranslate from "@/utils/translate";
import { Autocomplete } from "@mui/material";

export default function FranchiseControl() {
  const name = "franchise";
  const label = toTranslate("Franchise");
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
    rules: { required: true },
    defaultValue: "",
  });


  return (
    <>
      <div className="mb-4">
        <Autocomplete
            onChange={onChange}
            value={value}
            size={'small'}
            fullWidth={true}
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
