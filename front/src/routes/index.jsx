import { createBrowserRouter } from "react-router-dom";
import HomePage from "@routes/HomePage.jsx";
import ErrorPage from "@routes/ErrorPage.jsx";
import Layout from "@components/partials/Layout.jsx";
import RegisterPage from "@routes/RegisterPage.jsx";
import LoginPage from "@routes/LoginPage.jsx";
import ProtectedRoute from "@components/ProtectedRoute";
import DashboardPage from "@routes/DashboardPage";
import BackOfficeLayout from "@components/backOffice/BackOfficeLayout";
import CompanyPage from "@routes/CompanyPage";
import EmployeesPage from "@routes/EmployeesPage";
import ServicesPage from "@routes/ServicesPage";
import NewEmployeeFormPage from "@routes/NewEmployeeFormPage";
import EditEmployeeFormPage from "@routes/EditEmployeeFormPage";
import AccountPage from "@routes/AccountPage";
import EditAccountPage from "@routes/EditAccountPage";
import SearchPage from "@routes/SearchPage";
import UserPage from "@routes/UserPage";
import PlanningPage from "@routes/PlanningPage";
import { ROLES } from "@/hooks/useToken";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "user/:userId",
        element: <UserPage />,
      },
      {
        path: "planning",
        element: <PlanningPage />,
      },
    ],
  },
  {
    path: "/account",
    element: <Layout />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute roleAllowed={[ROLES.USER]}>
            <AccountPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "edit",
        element: (
          <ProtectedRoute roleAllowed={[ROLES.USER]}>
            <EditAccountPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/manager",
    element: <BackOfficeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectedRoute roleAllowed={[ROLES.MANAGER, ROLES.ADMIN]}>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "company",
        element: (
          <ProtectedRoute roleAllowed={[ROLES.ADMIN]}>
            <CompanyPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "employees",
        children: [
          {
            path: "",
            element: (
              <ProtectedRoute roleAllowed={[ROLES.MANAGER, ROLES.ADMIN]}>
                <EmployeesPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "new",
            element: (
              <ProtectedRoute roleAllowed={[ROLES.MANAGER, ROLES.ADMIN]}>
                <NewEmployeeFormPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "edit/:id",
            element: (
              <ProtectedRoute roleAllowed={[ROLES.MANAGER, ROLES.ADMIN]}>
                <EditEmployeeFormPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "services",
        element: (
          <ProtectedRoute roleAllowed={[ROLES.MANAGER, ROLES.ADMIN]}>
            <ServicesPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
