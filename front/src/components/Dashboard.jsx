import useToken, { ROLES } from "@/hooks/useToken";
import ManagerDashboardPage from "@routes/ManagerDashboardPage";
import AdminDashboardPage from "@routes/AdminDashboardPage";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
  const { roles } = useToken();

  if (roles.includes(ROLES.MANAGER)) {
    return <ManagerDashboardPage />;
  }

  if (roles.includes(ROLES.ADMIN)) {
    return <AdminDashboardPage />;
  }

  return <Navigate to="/" />;
}
