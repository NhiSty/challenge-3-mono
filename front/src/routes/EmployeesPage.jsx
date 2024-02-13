import { Plus } from "lucide-react";
import EmployeesTable from "@components/employee/EmployeesTable";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/translation/useTranslation";

export default function EmployeesPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Stack direction={"column"} spacing={2}>
      <Card>
        <CardHeader
          title={
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography>{t("employees")}</Typography>
              <Button
                variant={"contained"}
                color={"primary"}
                onClick={() => navigate("/manager/employees/new")}
              >
                <Plus size={20} />
                {t("newEmployee")}
              </Button>
            </Stack>
          }
        />
        <CardContent>
          <EmployeesTable />
        </CardContent>
      </Card>
    </Stack>
  );
}
