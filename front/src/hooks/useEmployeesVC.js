import {useEffect, useState} from "react";
import {addEmployee, fetchAllEmployees, removeEmployee, updateEmployee as updateEmployeeCall} from "@/api/employee";
import {useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';
import toTranslate from "@/utils/translate";

export function useEmployeesVC() {
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        fetchAllEmployees()
            .then((response => response.json()))
            .then((data) => {
                setEmployees(data['hydra:member'] || []);
            })
            .finally(
                () => {
                    setIsLoading(false);
                }
            );
    }, []);

    /**
     * @param {Employee} employee
     */
    const createEmployee = (employee) => {
        return addEmployee(employee)
            .then((response) => {
                setEmployees([
                    ...employees,
                    response.data
                ]);
                navigate("/manager/employees");
                toast.success(toTranslate('Employé créé avec succès.'));
                return response;
            })
            .catch((error) => {
                toast.error(toTranslate('Erreur lors de la création de l\'employé.'));
                console.log(error);
            });
    }

    const deleteEmployee = (id) => {
        removeEmployee(id)
            .then((data) => {
                console.log({data})
                if (data.status !== 204) {
                    return;
                }
                setEmployees(employees.filter((employee) => employee.id !== id));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const updateEmployee = (id, employee) => {
        return updateEmployeeCall(id, employee)
            .then((response) => {
                setEmployees(employees.map((employee) => {
                    if (employee.id === id) {
                        return response.data;
                    }
                    return employee;
                }));
                toast.success(toTranslate('Employé modifié avec succès.'));
                navigate("/manager/employees")
            })
            .catch((error) => {
                toast.error(toTranslate('Erreur lors de la modification de l\'employé.'));
                console.log(error);
            });
    }

    const getOneEmployeeById = (id) => {
        return employees.find((employee) => employee.id === id);
    }


    return {
        employees,
        createEmployee,
        deleteEmployee,
        getOneEmployeeById,
        updateEmployee,
        isLoading,
    };
}

