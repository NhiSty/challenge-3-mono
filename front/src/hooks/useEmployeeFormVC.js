import {useEmployeesVC} from "@/hooks/useEmployeesVC";
import {useNavigate} from "react-router-dom";

export default function useEmployeeFormVC(mode) {
    const methodsEmployee= useEmployeesVC();
    const navigate = useNavigate();

    const submitForm = async (employee) => {
        if (mode === "creation") {
            await methodsEmployee.createEmployee(employee);
        } else if (mode === "edition") {
            await methodsEmployee.updateEmployee(employee.id, employee);
        }
        else {
            throw new Error("Mode unknown");
        }
    }

    const cancelForm = () => {
        navigate("/manager/employees");
    }

    return {
        submitForm,
        cancelForm
    }
}
