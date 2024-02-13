import { useController, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";
import { useTranslation } from "@/translation/useTranslation";

/**
 * Pour être utiliser, il faut qu'il soit wrapper dans un <FormProvider> avec useForm()
 * @param name
 * @param label
 * @param placeholder
 * @param required
 * @returns {JSX.Element}
 * @constructor
 */
export default function PhoneControl({ name, label, placeholder, required }) {
  const {
    formState: { errors },
  } = useFormContext();
  const error = errors[name];
  const {
    field: { value, onChange },
  } = useController({
    name,
    rules: {
      required,
      validate: {
        isPhoneNumber: (value) => {
          return value.length === 10;
        },
      },
    },
    defaultValue: "",
  });
  const { t } = useTranslation();

  return (
    <>
      <div className="mb-4">
        <TextField
          size={"small"}
          fullWidth={true}
          id={name}
          name={name}
          label={label}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          error={!!error}
        />
        {!!error && error.type === "required" && (
          <div className="text-red-500 text-xs mt-1">{`${label} ${t("isRequired")}`}</div>
        )}

        {!!error && error.type === "isPhoneNumber" && (
          <div className="text-red-500 text-xs mt-1">{`${label} ${t("mustBe10Digits")}`}</div>
        )}
      </div>
    </>
  );
}

PhoneControl.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};
