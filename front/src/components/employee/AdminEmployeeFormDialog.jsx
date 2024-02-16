import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import EmployeeForm from "@components/employee/EmployeeForm";
import PropTypes from "prop-types";
import { useTranslation } from "@/translation/useTranslation";

export default function AdminEmployeeFormDialog({
  opened,
  handleClose,
  franchiseIds,
  mode,
}) {
  const { t } = useTranslation();
  return (
    <Dialog open={opened} onClose={handleClose} maxWidth={"sm"} fullWidth>
      <DialogTitle>{t("addNewEmployee")}</DialogTitle>
      <DialogContent>
        <EmployeeForm
          franchiseIds={franchiseIds}
          handleClose={handleClose}
          mode={mode}
        />
      </DialogContent>
    </Dialog>
  );
}

AdminEmployeeFormDialog.propTypes = {
  opened: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  franchiseIds: PropTypes.array.isRequired,
  mode: PropTypes.string.isRequired,
};
