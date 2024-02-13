import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useTranslation } from "@/translation/useTranslation";
import { FormProvider, useForm } from "react-hook-form";
import TextFieldControl from "@components/form/Controls/TextFieldControl";
import AddressControls from "@components/form/Controls/AddressControls";
import PropTypes from "prop-types";
import PhoneControl from "@components/form/Controls/PhoneControl";
import useFranchiseFormVC from "@/hooks/useFranchiseFormVC";

export default function FranchiseFormDialog({ opened, onClose }) {
  const { t } = useTranslation();
  const methods = useForm();
  const {} = useFranchiseFormVC();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Dialog open={opened} onClose={onClose} maxWidth={"sm"} fullWidth>
          <DialogTitle>
            <h1>Franchise Form</h1>
          </DialogTitle>
          <DialogContent>
            <TextFieldControl name={"name"} label={t("name")} required />
            <PhoneControl
              name={"phone"}
              label={"phone"}
              required
              placeholder={"01 02 03 04 05"}
            />
            <AddressControls />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>{t("cancel")}</Button>
            <Button type={"submit"}>{t("submit")}</Button>
          </DialogActions>
        </Dialog>
      </form>
    </FormProvider>
  );
}

FranchiseFormDialog.propTypes = {
  opened: PropTypes.bool,
  onClose: PropTypes.func,
};
