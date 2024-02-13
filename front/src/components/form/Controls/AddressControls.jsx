import { Autocomplete, TextField } from "@mui/material";
import { getAddress } from "@/api/address";
import { useTranslation } from "@/translation/useTranslation";
import { useController } from "react-hook-form";
import { useState } from "react";
import debounce from "@/utils/debounce";

export default function AddressControls() {
  const { t } = useTranslation();
  const name = "address";
  const label = t("address");
  const { addressOptions, handleInputOnChange } = useAddressControls();

  const {
    field: { value, onChange },
  } = useController({
    name,
    defaultValue: "",
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
        getOptionLabel={(option) => option.label || ""}
        isOptionEqualToValue={(option, value) => option.value?.id === value?.id}
        onChange={handleOnChange}
        renderInput={(params) => (
          <TextField {...params} label={label} onChange={handleInputOnChange} />
        )}
      />
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
        value: address,
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
