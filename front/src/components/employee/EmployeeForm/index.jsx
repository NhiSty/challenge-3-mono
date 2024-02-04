import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import FirstnameControl from "@components/employee/EmployeeForm/Controls/FirstnameControl";
import LastnameControl from "@components/employee/EmployeeForm/Controls/LastnameControl";
import EmailControl from "@components/employee/EmployeeForm/Controls/EmailControl";
import toTranslate from "@/utils/translate";
import { Button, Stack } from "@mui/material";
import useEmployeeFormVC from "@/hooks/useEmployeeFormVC";
import AgeControl from "@components/employee/EmployeeForm/Controls/AgeControl";
import UsernameControl from "@components/employee/EmployeeForm/Controls/UsernameControl";
import FranchiseControl from "@components/employee/EmployeeForm/Controls/FranchiseControl";

export default function EmployeeForm(props) {
  const methods = useForm({
    defaultValues: props.defaultValues,
  });

  const { submitForm, cancelForm } = useEmployeeFormVC(props.mode);

  return (
    <Stack px={1}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submitForm)}>
          <FirstnameControl />
          <LastnameControl />
          <EmailControl />
          <UsernameControl />
          <AgeControl />
          <FranchiseControl />

          <Stack direction={"row"} justifyContent={"flex-end"} spacing={2}>
            <Button
              onClick={cancelForm}
              variant={"outlined"}
              color={"inherit"}
            >
              {toTranslate("Cancel")}
            </Button>

            <Button type={"submit"} variant={"contained"} color={"primary"}>
              {toTranslate("Submit")}
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
};
