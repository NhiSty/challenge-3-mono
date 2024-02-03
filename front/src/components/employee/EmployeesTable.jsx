import toTranslate from "@/utils/translate";
import {XCircle, Pencil} from 'lucide-react'
import {useNavigate} from "react-router-dom";
import Table from "@components/base/Table";
import {Avatar, Chip, IconButton, Stack} from "@mui/material";
import {useEmployeesVC} from "@/hooks/useEmployeesVC";

export default function EmployeesTable() {
    const navigate = useNavigate();
    const employeeMethods = useEmployeesVC();

    if (employeeMethods.isLoading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <Table
                thead={[
                    toTranslate("Name"),
                    toTranslate("Email"),
                    toTranslate("Role"),
                    toTranslate("Actions"),
                ]}
            >
                {employeeMethods.employees.map((employee) => (
                    <tr key={employee['@id']}>
                        <td>
                            <Stack
                                direction={'row'}
                                alignItems={'center'}
                                spacing={2}
                            >
                                <Avatar src={'https://reqres.in/img/faces/1-image.jpg'} />
                                <div className="font-bold">
                                    {
                                        employee['user_id'].firstName
                                        + ' '
                                        + employee['user_id'].lastName
                                    }
                                </div>
                            </Stack>
                        </td>
                        <td>{employee['user_id'].email}</td>
                        <td>
                            <Chip
                                color={'info'}
                                variant={'outlined'}
                                label={employee.role}
                            />
                        </td>
                        <td>
                            <Stack direction={'row'} spacing={1}>
                                <IconButton
                                    onClick={() => navigate(`/manager/employees/edit/${employee.id}`, {state: { ...employee }})}
                                >
                                    <Pencil color={'#3b82f6'} />
                                </IconButton>
                                <IconButton
                                    onClick={() => employeeMethods.deleteEmployee(employee.id)}
                                >
                                    <XCircle color={'#f94f4ffa'} />
                                </IconButton>
                            </Stack>
                        </td>
                    </tr>
                ))}
            </Table>
        </>
    );
}
