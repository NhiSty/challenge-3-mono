import {Chip} from "@mui/material";
import {useTranslation} from "@/translation/useTranslation";
import PropTypes from "prop-types";

export default function CompanyDemandStatusChip({ status }) {
    const { t } = useTranslation();
    return (
        <Chip label={t(status)} color={statusColors[status]} />
    )
}

const statusColors = {
    "pending": "primary",
    "accepted": "success",
    "refused": "error"
}

CompanyDemandStatusChip.propTypes = {
    status: PropTypes.string.isRequired
}
