import { useEmployeesVC } from "@/hooks/useEmployeesVC";
import { useNavigate } from "react-router-dom";

export default function useEmployeeFormVC(mode) {
  const methodsEmployee = useEmployeesVC();
  const navigate = useNavigate();

  const submitForm = (employee) => {
    if (mode === "creation") {
      methodsEmployee.createEmployee(employee);
    } else if (mode === "edition") {
      methodsEmployee.updateEmployee(employee.id, employee);
    } else {
      throw new Error("Mode unknown");
    }

    navigate("/manager/employees");
  };

  const cancelForm = () => {
    navigate("/manager/employees");
  };

  return {
    submitForm,
    cancelForm,
  };
}
