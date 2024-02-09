import {useController} from "react-hook-form";
import InputFileUpload from "@components/form/InputFileUpload";
import {FormControl, FormLabel} from "@mui/material";
import PropTypes from "prop-types";

export default function InputFileControl({ name, label, required }) {
    const {
        field: { onChange },
    } = useController({
        name,
        rules: { required, },
        defaultValue: "",
    });

    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <InputFileUpload onChange={onChange} />
        </FormControl>
    )
}

InputFileControl.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
}
