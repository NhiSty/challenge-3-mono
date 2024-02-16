import { useParams } from "react-router-dom";
import CompanyInfo from "@components/company/CompanyInfo";
import FranchiseTableCard from "@components/franchise/FranchiseTableCard";
import { CompanyContextProvider } from "@components/company/CompanyContext";
import AdminEmployeeBlock from "@components/employee/AdminEmployeeBlock";

export default function AdminCompanyPage() {
  const { companyId } = useParams();

  return (
    <CompanyContextProvider companyId={companyId}>
      <CompanyInfo />
      <FranchiseTableCard />
      <AdminEmployeeBlock />
    </CompanyContextProvider>
  );
}
