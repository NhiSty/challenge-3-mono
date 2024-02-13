import { FormProvider, useForm } from "react-hook-form";
import useCompanyFormVC from "@/hooks/useCompanyFormVC";
import TextFieldControl from "@components/form/Controls/TextFieldControl";
import EmailControl from "@components/form/Controls/EmailControl";
import InputFileControl from "@components/form/Controls/InputFileControl";
import { Card, CardActions, CardContent, Stack } from "@mui/material";
import { useTranslation } from "@/translation/useTranslation";
import LoadingButton from "@components/base/LoadingButton";
import AddressControls from "@components/form/Controls/AddressControls";

export default function NewCompanyForm() {
  const methods = useForm();
  const { submitRequestForm, submitting } = useCompanyFormVC();
  const { t } = useTranslation();

  return (
    <Stack width={500}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submitRequestForm)}>
          <Card>
            <CardContent>
              <TextFieldControl
                name={"firstname"}
                label={t("firstname")}
                required={true}
              />
              <TextFieldControl
                name={"lastname"}
                label={t("lastname")}
                required={true}
              />
              <EmailControl />
              <TextFieldControl
                name={"companyName"}
                label={t("companyName")}
                required={true}
              />
              <AddressControls />
              <InputFileControl
                name={"kbis"}
                label={t("Kbis")}
                required={true}
              />
            </CardContent>
            <CardActions sx={{ justifyContent: "end" }}>
              <LoadingButton
                type={"submit"}
                variant={"contained"}
                color={"primary"}
                loading={submitting}
              >
                {t("submit")}
              </LoadingButton>
            </CardActions>
          </Card>
        </form>
      </FormProvider>
    </Stack>
  );
}
