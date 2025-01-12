import { createHashRouter } from "react-router-dom";
import HomePage from "@routes/HomePage.jsx";
import ErrorPage from "@routes/ErrorPage.jsx";
import Layout from "@components/shared/Layout.jsx";
import RegisterPage from "@routes/RegisterPage.jsx";
import LoginPage from "@routes/LoginPage.jsx";
import ProtectedRoute from "@components/ProtectedRoute";
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
import NewCompanyFormPage from "@routes/NewCompanyFormPage";
import PublicRoute from "@components/PublicRoute";
import DemandsPages from "@routes/DemandsPages";
import DemandDetails from "@routes/DemandDetails";
import Dashboard from "@components/Dashboard";
import BookingPage from "@routes/BookingPage";
import AdminCompaniesPage from "@routes/AdminCompaniesPage";
import AdminCompanyPage from "@routes/AdminCompanyPage";
import EmployeeDetails from "@routes/EmployeeDetails";

const router = createHashRouter([
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
        element: (
          <ProtectedRoute roleAllowed={[ROLES.EMPLOYEE]}>
            <PlanningPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "new-company",
        element: (
          <PublicRoute>
            <NewCompanyFormPage />
          </PublicRoute>
        ),
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
      {
        path: "bookings",
        element: (
          <ProtectedRoute roleAllowed={[ROLES.USER]}>
            <BookingPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "manage",
    element: <BackOfficeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute roleAllowed={[ROLES.MANAGER, ROLES.ADMIN]}>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "companies",
        element: (
          <ProtectedRoute roleAllowed={[ROLES.ADMIN]}>
            <AdminCompaniesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "companies/:companyId",
        element: (
          <ProtectedRoute roleAllowed={[ROLES.ADMIN]}>
            <AdminCompanyPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "company",
        element: (
          <ProtectedRoute roleAllowed={[ROLES.MANAGER]}>
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
              <ProtectedRoute roleAllowed={[ROLES.MANAGER]}>
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
          {
            path: ":id",
            element: (
              <ProtectedRoute roleAllowed={[ROLES.MANAGER, ROLES.ADMIN]}>
                <EmployeeDetails />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "demands",
        element: (
          <ProtectedRoute roleAllowed={[ROLES.ADMIN]}>
            <DemandsPages />
          </ProtectedRoute>
        ),
      },
      {
        path: "demands/:id",
        element: (
          <ProtectedRoute roleAllowed={[ROLES.ADMIN]}>
            <DemandDetails />
          </ProtectedRoute>
        ),
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
