import EmployeeForm from "@components/employee/EmployeeForm";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useTranslation } from "@/translation/useTranslation";

export default function EditEmployeeFormPage() {
  const { state } = useLocation();
  const franchiseId = state["franchise_id"].split("franchises/")[1];
  const { t } = useTranslation();

  return (
    <>
      <Card>
        <CardHeader
          title={
            <Typography variant={"h6"} sx={{ textAlign: "center" }}>
              {t("editEmployee")}
            </Typography>
          }
        />
        <CardContent>
          <EmployeeForm
            mode={"edition"}
            defaultValues={{
              id: state.id,
              firstname: state["user_id"].firstName,
              lastname: state["user_id"].lastName,
              email: state["user_id"].email,
              username: state["user_id"].username,
              age: state["user_id"].age,
              franchise: parseInt(franchiseId),
            }}
          />
        </CardContent>
      </Card>
    </>
  );
}
