import { Plus } from "lucide-react";
import EmployeesTable from "@components/employee/EmployeesTable";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/translation/useTranslation";
import { useEmployeesVC } from "@/hooks/useEmployeesVC";
import useFranchiseVC from "@/hooks/useFranchiseVC";
import { useState } from "react";

export default function EmployeesPage() {
  const navigate = useNavigate();
  const employeeMethods = useEmployeesVC();
  const { franchiseOptions } = useFranchiseVC();
  const { t } = useTranslation();
  const [selectedFranchise, setSelectedFranchise] = useState(null);
  const [employeesFiltered, setEmployeesFiltered] = useState(null);

  const handleChange = (event) => {
    if (event.target.value === null) {
      setEmployeesFiltered(null);
      setSelectedFranchise(null);
      return;
    }
    setSelectedFranchise(event.target.value);
    setEmployeesFiltered(
      employeeMethods.employees.filter(
        (employee) => employee.franchise_id.id === event.target.value,
      ),
    );
  };

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
              <Stack direction={"row"} spacing={2} alignItems={"center"}>
                <FormControl>
                  <InputLabel id={"select-label"}>
                    {t("filterByFranchise")}
                  </InputLabel>
                  <Select
                    sx={{ minWidth: 200 }}
                    labelId="select-label"
                    value={selectedFranchise}
                    label={t("filterByFranchise")}
                    onChange={handleChange}
                    size={"small"}
                  >
                    <MenuItem value={null}>{t("allFranchises")}</MenuItem>
                    {franchiseOptions.map((franchise) => (
                      <MenuItem key={franchise.value} value={franchise.value}>
                        {franchise.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  variant={"contained"}
                  color={"primary"}
                  onClick={() => navigate("/manage/employees/new")}
                >
                  <Plus size={20} />
                  {t("newEmployee")}
                </Button>
              </Stack>
            </Stack>
          }
        />
        <CardContent>
          <EmployeesTable
            employees={employeesFiltered || employeeMethods.employees}
            isLoading={employeeMethods.isLoading}
            deleteEmployee={employeeMethods.deleteEmployee}
          />
        </CardContent>
      </Card>
    </Stack>
  );
}
