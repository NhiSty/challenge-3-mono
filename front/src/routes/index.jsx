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
import AccountPage from "@routes/AccountPage";
import EditAccountPage from "@routes/EditAccountPage";
import SearchPage from "@routes/SearchPage";
import UserPage from "@routes/UserPage";

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
    ],
  },
  {
    path: "/account",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <AccountPage />,
      },
      {
        path: "edit",
        element: <EditAccountPage />,
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
          <ProtectedRoute roleAllowed={["manager"]}>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "company",
        element: (
          <ProtectedRoute roleAllowed={["manager"]}>
            <CompanyPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "employees",
        element: (
          <ProtectedRoute roleAllowed={["manager"]}>
            <EmployeesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "services",
        element: (
          <ProtectedRoute roleAllowed={["manager"]}>
            <ServicesPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
