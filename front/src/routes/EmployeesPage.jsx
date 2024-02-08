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
      <Stack direction={"row"} justifyContent={"flex-end"}>
        <Button
          variant={"contained"}
          color={"primary"}
          onClick={() => navigate("/manager/employees/new")}
        >
          <Plus size={20} />
          {t("newEmployee")}
        </Button>
      </Stack>
      <Card>
        <CardHeader title={<Typography>{t("employees")}</Typography>} />
        <CardContent>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"100%"}
            mb={4}
          >
            <Typography variant={"h5"}>{t("employees")}</Typography>
          </Stack>
          <EmployeesTable />
        </CardContent>
      </Card>
    </Stack>
  );
}
