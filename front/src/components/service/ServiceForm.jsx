import { FormProvider, useForm } from "react-hook-form";
import TextFieldControl from "@components/form/Controls/TextFieldControl";
import { useTranslation } from "@/translation/useTranslation";
import PriceControl from "@components/service/Controls/PriceControl";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "@mui/material";
import { useServiceContext } from "@components/service/useServiceContext";

export default function ServiceForm() {
  const { t } = useTranslation();
  const methods = useForm();
  const { newService } = useServiceContext();

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) =>
          newService(data, () => methods.reset()),
        )}
      >
        <Card>
          <CardHeader title={t("addService")} />
          <CardContent>
            <TextFieldControl name={"name"} label={t("name")} />
            <PriceControl />
          </CardContent>
          <CardActions sx={{ justifyContent: "end" }}>
            <Button
              variant={"text"}
              color={"error"}
              onClick={() => methods.reset()}
            >
              {t("cancel")}
            </Button>
            <Button type="submit" variant={"contained"} color={"primary"}>
              {t("add")}
            </Button>
          </CardActions>
        </Card>
      </form>
    </FormProvider>
  );
}
