import { useController, useFormContext } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";
import useFranchiseVC from "@/hooks/useFranchiseVC";
import { useTranslation } from "@/translation/useTranslation";

export default function FranchiseControl() {
  const { t } = useTranslation();
  const name = "franchise";
  const label = t("franchise");
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

  const { franchiseOptions, isLoading, getLabel } = useFranchiseVC();

  const handleChange = (event, newValue) => {
    onChange(newValue.value);
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
