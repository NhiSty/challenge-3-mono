import EmployeesTable from "@components/employee/EmployeesTable";
import { useCompanyContext } from "@components/company/useCompanyContext";
import { useEmployeesVC } from "@/hooks/useEmployeesVC";
import { Button, Card, CardContent, CardHeader, Stack } from "@mui/material";
import { useTranslation } from "@/translation/useTranslation";
import { useMemo, useState } from "react";
import AdminEmployeeFormDialog from "@components/employee/AdminEmployeeFormDialog";

export default function AdminEmployeeBlock() {
  const { t } = useTranslation();
  const { franchises } = useCompanyContext();
  const { deleteEmployee, employees, isLoading } = useEmployeesVC();
  const [opened, setOpened] = useState(false);
  const franchiseIds = franchises.map((franchise) => franchise.id);
  const employeeFiltered = useMemo(
    () =>
      employees.filter((employee) =>
        franchises.some(
          (franchise) => franchise.id === employee.franchise_id.id,
        ),
      ),
    [employees, franchises],
  );

  return (
    <>
      <Card sx={{ mt: 3 }}>
        <CardHeader
          title={
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <h1 className={"text-xl font-bold"}>{t("employees")}</h1>
              <Button
                variant={"contained"}
                color={"primary"}
                onClick={() => setOpened(true)}
              >
                {t("newEmployee")}
              </Button>
            </Stack>
          }
        />
        <CardContent sx={{ maxHeight: 300, overflow: "auto" }}>
          <EmployeesTable
            isLoading={isLoading}
            employees={employeeFiltered}
            deleteEmployee={deleteEmployee}
          />
        </CardContent>
      </Card>
      <AdminEmployeeFormDialog
        opened={opened}
        handleClose={() => setOpened(false)}
        franchiseIds={franchiseIds}
        mode={"creation"}
      />
    </>
  );
}
