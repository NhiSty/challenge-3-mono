import { useController, useFormContext } from "react-hook-form";
import toTranslate from "@/utils/translate";
import { Autocomplete, TextField } from "@mui/material";
import useFranchiseVC from "@/hooks/useFranchiseVC";

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

  const { franchiseOptions, isLoading } = useFranchiseVC();

  const handleChange = (event, newValue) => {
    onChange(newValue.value);
  };

  const getLabel = (value) => {
    const franchise = franchiseOptions.find(
      (franchise) => franchise.value === value,
    );
    return franchise ? franchise.label : "";
  };

  return (
    <>
      <div className="mb-4">
        <Autocomplete
          onChange={handleChange}
          value={getLabel(value)}
          size={"small"}
          fullWidth={true}
          options={franchiseOptions}
          loading={isLoading}
          disableClearable={true}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant={"outlined"}
              error={hasError}
              helperText={errorMessage}
            />
          )}
        />
        {!!errorMessage && (
          <div className="text-red-500 text-xs mt-1">{errorMessage}</div>
        )}
      </div>
    </>
  );
}
