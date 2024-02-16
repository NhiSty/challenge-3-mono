import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import EmailControl from "@components/form/Controls/EmailControl";
import { Button, Stack } from "@mui/material";
import useEmployeeFormVC from "@/hooks/useEmployeeFormVC";
import AgeControl from "@components/employee/EmployeeForm/Controls/AgeControl";
import FranchiseControl from "@components/employee/EmployeeForm/Controls/FranchiseControl";
import TextFieldControl from "@components/form/Controls/TextFieldControl";
import { useTranslation } from "@/translation/useTranslation";

export default function EmployeeForm(props) {
  const { t } = useTranslation();
  const methods = useForm({
    defaultValues: props.defaultValues,
  });

  const { submitForm, cancelForm } = useEmployeeFormVC(props.mode);

  const handleCancel = () => {
    if (props.handleClose) {
      props.handleClose();
    } else {
      cancelForm();
    }
  };

  return (
    <Stack px={1}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submitForm)}>
          <TextFieldControl
            name={"firstname"}
            label={t("firstname")}
            placeholder={t("firstname")}
            required={true}
          />
          <TextFieldControl
            name={"lastname"}
            label={t("lastname")}
            placeholder={t("lastname")}
            required={true}
          />
          <EmailControl />
          <TextFieldControl
            name={"username"}
            label={t("username")}
            placeholder={t("username")}
            required={true}
          />
          <AgeControl />
          <FranchiseControl franchiseIds={props.franchiseIds} />

          <Stack direction={"row"} justifyContent={"flex-end"} spacing={2}>
            <Button
              onClick={handleCancel}
              variant={"outlined"}
              color={"inherit"}
            >
              {t("cancel")}
            </Button>

            <Button type={"submit"} variant={"contained"} color={"primary"}>
              {t("submit")}
            </Button>
          </Stack>
        </form>
      </FormProvider>
    </Stack>
  );
}

EmployeeForm.propTypes = {
  defaultValues: PropTypes.object,
  mode: PropTypes.string,
  franchiseIds: PropTypes.array,
  handleClose: PropTypes.func,
};
