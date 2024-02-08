import { useController, useFormContext } from "react-hook-form";
import toTranslate from "@/utils/translate";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";

/**
 * Pour être utiliser, il faut qu'il soit wrapper dans un <FormProvider> avec useForm()
 * @param name
 * @param label
 * @param placeholder
 * @param required
 * @returns {JSX.Element}
 * @constructor
 */
export default function TextFieldControl({ name, label, placeholder, required }) {
    const {
        formState: { errors },
    } = useFormContext();
    const hasError = errors[name];
    const errorMessage = hasError
        ? `${label} ${toTranslate("Ce champ est obligatoire")}`
        : "";
    const {
        field: { value, onChange },
    } = useController({
        name,
        rules: { required, },
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
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    error={!!errorMessage}
                />
                {!!errorMessage && (
                    <div className="text-red-500 text-xs mt-1">{errorMessage}</div>
                )}
            </div>
        </>
    );
}

TextFieldControl.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
};
