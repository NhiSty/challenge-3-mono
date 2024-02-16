import { useEffect, useState } from "react";
import fetchAllCompanies from "@/api/company";

export default function useCompany() {
  const [companies, setCompanies] = useState([]);
  const [loadingFetchCompanies, setLoadingFetchCompanies] = useState(true);

  useEffect(() => {
    try {
      fetchAllCompanies().then((response) => {
        setCompanies(response);
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingFetchCompanies(false);
    }
  }, []);

  return {
    companies,
    loadingFetchCompanies,
  };
}
