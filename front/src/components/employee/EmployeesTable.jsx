import { Pencil, Trash2, ArrowUpRightSquareIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Table from "@components/shared/Table";
import { Avatar, Chip, IconButton, Stack } from "@mui/material";
import { useTranslation } from "@/translation/useTranslation";
import PropTypes from "prop-types";

export default function EmployeesTable({
  employees,
  isLoading,
  deleteEmployee,
}) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(employees);

  return (
    <>
      <Table thead={[t("name"), t("email"), t("role"), ""]}>
        {employees.length === 0 ? (
          <tr>
            <td colSpan={5} className="text-center">
              {t("noEmployees")}
            </td>
          </tr>
        ) : (
          employees.map((employee) => (
            <tr key={employee["@id"]}>
              <td>
                <Stack direction={"row"} alignItems={"center"} spacing={2}>
                  <Avatar src={"https://reqres.in/img/faces/1-image.jpg"} />
                  <div className="font-bold">
                    {employee["user_id"].firstName +
                      " " +
                      employee["user_id"].lastName}
                  </div>
                </Stack>
              </td>
              <td>{employee["user_id"].email}</td>
              <td>
                <Chip
                  color={"info"}
                  variant={"outlined"}
                  label={employee.role}
                />
              </td>
              <td>
                <Stack direction={"row"} spacing={1} justifyContent={"end"}>
                  <IconButton
                    onClick={() =>
                      navigate(`/manage/employees/edit/${employee.id}`, {
                        state: { ...employee },
                      })
                    }
                  >
                    <Pencil color={"#3b82f6"} />
                  </IconButton>
                  <IconButton onClick={() => deleteEmployee(employee.id)}>
                    <Trash2 color={"#f94f4ffa"} />
                  </IconButton>
                  <IconButton
                    onClick={() => navigate(`${employee.user_id.id}`)}
                  >
                    <ArrowUpRightSquareIcon color={"#3b82f6"} />
                  </IconButton>
                </Stack>
              </td>
            </tr>
          ))
        )}
      </Table>
    </>
  );
}

EmployeesTable.propTypes = {
  employees: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  deleteEmployee: PropTypes.func.isRequired,
};
