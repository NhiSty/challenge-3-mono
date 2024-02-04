import EmployeeForm from "@components/employee/EmployeeForm";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import toTranslate from "@/utils/translate";

export default function NewEmployeeFormPage() {
  return (
    <>
      <Card>
        <CardHeader
          title={
            <Typography variant={"h6"} sx={{ textAlign: "center" }}>
              {toTranslate("New Employee")}
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
