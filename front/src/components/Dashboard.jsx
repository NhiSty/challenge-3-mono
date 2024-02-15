import useToken from "../hooks/useToken";
import ManagerDashboardPage from "../routes/ManagerDashboardPage";
import AdminDashboardPage from "../routes/AdminDashboardPage";
import {Navigate} from "react-router-dom";

export default function Dashboard() {
    const { roles } = useToken();

    if (roles.includes("ROLE_MANAGER")) {
        return <ManagerDashboardPage />;
    }

    if (roles.includes("ROLE_ADMIN")) {
        return <AdminDashboardPage />;
    }

    return <Navigate to="/" />;
};
