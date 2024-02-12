import NewCompanyForm from "@components/company/NewCompanyForm";
import { Stack } from "@mui/material";
import { useTranslation } from "@/translation/useTranslation";

export default function NewCompanyFormPage() {
  const { t } = useTranslation();
  return (
    <Stack mt={10}>
      <h1 className="text-3xl font-bold text-center">
        {t("becomeServiceProvider")}
      </h1>

      <Stack
        width={"100%"}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <NewCompanyForm />
      </Stack>
    </Stack>
  );
}
