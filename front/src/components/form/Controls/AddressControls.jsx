import { Autocomplete, TextField } from "@mui/material";
import { getAddress } from "@/api/address";
import { useTranslation } from "@/translation/useTranslation";
import { useController, useFormContext } from "react-hook-form";
import { useState } from "react";
import debounce from "@/utils/debounce";

export default function AddressControls() {
  const { t } = useTranslation();
  const name = "address";
  const label = t("address");
  const { addressOptions, handleInputOnChange } = useAddressControls();
  const {
    formState: { errors },
  } = useFormContext();
  const error = errors[name];
  const errored = !!error;

  const {
    field: { value, onChange },
  } = useController({
    name,
    defaultValue: "",
    rules: { required: true },
  });

  const handleOnChange = (event, value) => {
    onChange(value);
  };

  return (
    <>
      <Autocomplete
        sx={{ mb: 2 }}
        size={"small"}
        value={value}
        options={addressOptions}
        getOptionLabel={(option) => option.label || value?.value?.name || ""}
        isOptionEqualToValue={(option, value) => option.value?.id === value?.id}
        onChange={handleOnChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            onChange={handleInputOnChange}
            error={errored}
          />
        )}
      />

      {errored && error.type === "required" && (
        <div className="text-red-500 text-xs mt-1">
          {label} {t("isRequired")}
        </div>
      )}
    </>
  );
}

function useAddressControls() {
  const [addressOptions, setAddressOptions] = useState([]);

  const getAddressByValue = async (value) => {
    const addresses = await getAddress(value);
    setAddressOptions(
      addresses.map((address) => ({
        label: address.name,
        value: {
          id: address.id,
          name: address.name,
          geometry: {
            coordinates: [
              address.geometry.coordinates[0],
              address.geometry.coordinates[1],
            ],
          },
        },
      })),
    );
  };

  const handleInputOnChange = debounce(async (event) => {
    await getAddressByValue(event.target.value);
  }, 600);

  return {
    addressOptions,
    getAddressByValue,
    handleInputOnChange,
  };
}
