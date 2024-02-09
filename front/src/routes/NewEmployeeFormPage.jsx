import EmployeeForm from "@components/employee/EmployeeForm";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useTranslation } from "@/translation/useTranslation";

export default function NewEmployeeFormPage() {
  const { t } = useTranslation();
  return (
    <>
      <Card>
        <CardHeader
          title={
            <Typography variant={"h6"} sx={{ textAlign: "center" }}>
              {t("newEmployee")}
            </Typography>
          }
        />
        <CardContent>
          <EmployeeForm mode={"creation"} />
        </CardContent>
      </Card>
    </>
  );
}
