import {useEffect, useState} from "react";
import {addEmployee, fetchAllEmployees, removeEmployee} from "@/api/employee";

export function useEmployeesVC() {
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
                return response;
            })
            .catch((error) => {
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
        updateEmployee(id, employee)
            .then((response) => {
                setEmployees(employees.map((employee) => {
                    if (employee.id === id) {
                        return response.data;
                    }

                    return employee;
                }));
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

