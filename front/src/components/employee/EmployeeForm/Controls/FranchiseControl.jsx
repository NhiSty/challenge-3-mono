import { useController, useFormContext } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";
import useFranchiseVC from "@/hooks/useFranchiseVC";
import { useTranslation } from "@/translation/useTranslation";
import PropTypes from "prop-types";

export default function FranchiseControl({ franchiseIds }) {
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
  const franchiseOptionsFiltered = franchiseOptions.filter((franchise) =>
    franchiseIds?.includes(franchise?.value),
  );

  const options = franchiseIds ? franchiseOptionsFiltered : franchiseOptions;

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
          options={options}
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

FranchiseControl.propTypes = {
  franchiseIds: PropTypes.array,
};
