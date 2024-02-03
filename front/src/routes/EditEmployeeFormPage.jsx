import EmployeeForm from "@components/employee/EmployeeForm";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import toTranslate from "@/utils/translate";

export default function EditEmployeeFormPage() {
  const { state } = useLocation();

  return (
    <>
      <Card>
        <CardHeader
          title={
            <Typography variant={"h6"} sx={{ textAlign: "center" }}>
              {toTranslate("Edit Employee")}
            </Typography>
          }
        />
        <CardContent>
          <EmployeeForm
            mode={"edition"}
            defaultValues={{
              firstname: state.firstname,
              lastname: state.lastname,
              email: state.email,
            }}
          />
        </CardContent>
      </Card>
    </>
  );
}
