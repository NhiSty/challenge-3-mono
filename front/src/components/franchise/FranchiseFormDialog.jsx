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
import LoadingButton from "@components/shared/LoadingButton";
import { useCompanyContext } from "@components/company/useCompanyContext";

export default function FranchiseFormDialog({
  opened,
  onClose,
  franchise,
  mode,
}) {
  const { t } = useTranslation();
  console.log(franchise);
  const methods = useForm({
    defaultValues: {
      name: franchise?.franchise_name || "",
      address: {
        value: {
          name: franchise?.address || "",
          geometry: {
            coordinates: [franchise?.longitude || 0, franchise?.latitude || 0],
          },
        },
      },
    },
  });
  const { createFranchise, franchisesLoading, editFranchise } =
    useCompanyContext();

  const handleOnclose = () => {
    onClose();
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <form>
        <Dialog open={opened} onClose={onClose} maxWidth={"sm"} fullWidth>
          <DialogTitle>
            <h1>Franchise Form</h1>
          </DialogTitle>
          <DialogContent>
            <TextFieldControl name={"name"} label={t("name")} required />
            <AddressControls />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleOnclose}>{t("cancel")}</Button>
            <LoadingButton
              loading={franchisesLoading}
              onClick={methods.handleSubmit((data) => {
                if (mode === "create") {
                  createFranchise(data, handleOnclose);
                } else if (mode === "edit") {
                  editFranchise(
                    {
                      ...data,
                      id: franchise.id,
                    },
                    handleOnclose,
                  );
                }
              })}
            >
              {t("submit")}
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </form>
    </FormProvider>
  );
}

FranchiseFormDialog.propTypes = {
  opened: PropTypes.bool,
  onClose: PropTypes.func,
  franchise: PropTypes.object,
  mode: PropTypes.string,
};
