import { apiClient } from "@/api/index";

export async function fetchAllEmployees() {
  const employeesResult = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/employees`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/ld+json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    },
  );

  return employeesResult;
}

export async function fetchEmployeeById(id) {
  const employee = await apiClient.get(`/employees/${id}`);

  return employee;
}

/**
 * @param {Employee} employee
 */
export async function addEmployee(employee) {
  const response = await apiClient.post("employee", {
    firstname: employee.firstname,
    lastname: employee.lastname,
    franchise: employee.franchise,
    username: employee.username,
    email: employee.email,
    age:
      typeof employee.age === "number" ? employee.age : parseInt(employee.age),
  });

  return response;
}

export async function removeEmployee(id) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/employees/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    },
  );

  return response;
}

export async function updateEmployee(id, employee) {
  const response = await apiClient.patch(`/employees/${id}`, {
    ...employee,
  });

  return response;
}
