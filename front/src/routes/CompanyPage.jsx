import FranchiseTableCard from "@components/franchise/FranchiseTableCard";
import { CompanyContextProvider } from "@components/company/CompanyContext";
import CompanyInfo from "@components/company/CompanyInfo";

export default function CompanyPage() {
  return (
    <CompanyContextProvider>
      <CompanyInfo />
      <FranchiseTableCard />
    </CompanyContextProvider>
  );
}
