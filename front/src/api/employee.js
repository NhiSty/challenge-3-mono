import {apiClient} from "@/api/index";

export async function fetchAllEmployees() {
  return await fetch(`${import.meta.env.VITE_API_BASE_URL}/employees`, {
    method: "GET",
    headers: {
      "Content-Type": "application/ld+json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
}

export async function fetchEmployeeById(id) {
    return await apiClient.get(`/employees/${id}`);
}

/**
 * @param {Employee} employee
 */
export async function addEmployee(employee) {
    return await apiClient.post("employee", {
      firstname: employee.firstname,
      lastname: employee.lastname,
      franchise: employee.franchise,
      username: employee.username,
      email: employee.email,
      age:
          typeof employee.age === "number" ? employee.age : parseInt(employee.age),
  });
}

export async function removeEmployee(id) {
    return await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/employees/${id}`,
      {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
          },
      },
  );
}

export async function updateEmployee(id, employee) {
    return await apiClient.patch(`/employees/${id}`, {
      ...employee,
  });
}
