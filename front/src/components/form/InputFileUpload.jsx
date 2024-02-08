import {Input} from "@mui/material";
import * as blobUtil from 'blob-util'
import PropTypes from "prop-types";

/**
 * Input pour upload un fichier, il retourne un blob
 * @param onChange
 * @returns {JSX.Element}
 * @constructor
 */
export default function InputFileUpload({ onChange }) {
    const handleFileChange = (e) => {
        const blobFile = blobUtil.createBlob([e.target.files[0]], {type: e.target.files[0].type});
        onChange(blobFile);
    }

    return (
        <Input
            inputProps={{ accept: ["application/pdf", "image/jpeg", "image/jpg", "image/png"] }}
            type="file"
            onChange={handleFileChange}
        />
    )
}

InputFileUpload.propTypes = {
    onChange: PropTypes.func.isRequired,
}

