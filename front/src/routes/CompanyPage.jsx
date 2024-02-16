import CompanyInfo from "@components/company/CompanyInfo";
import FranchiseTableCard from "@components/franchise/FranchiseTableCard";
import { CompanyContextProvider } from "@components/company/CompanyContext";

export default function CompanyPage() {
  return (
    <CompanyContextProvider>
      <CompanyInfo />
      <FranchiseTableCard />
    </CompanyContextProvider>
  );
}
