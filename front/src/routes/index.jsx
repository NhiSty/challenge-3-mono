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
import PersonsToRentPage from "@routes/PersonsToRentPage";
import PersonToRentPage from "@routes/PersonToRentPage";

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
        path: "persons-to-rent",
        element: <PersonsToRentPage />,
      },
      {
        path: "persons-to-rent/:id",
        element: <PersonToRentPage />,
      }
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
        children: [
          {
            path: "",
            element: (
              <ProtectedRoute roleAllowed={["manager"]}>
                <EmployeesPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "new",
            element: (
              <ProtectedRoute roleAllowed={["manager"]}>
                <NewEmployeeFormPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "edit/:id",
            element: (
              <ProtectedRoute roleAllowed={["manager"]}>
                <EditEmployeeFormPage />
              </ProtectedRoute>
            ),
          },
        ],
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
