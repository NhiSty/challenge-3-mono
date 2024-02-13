import { apiClient } from "@/api";
import useToken from "@/hooks/useToken";
import { useState } from "react";

export default function useCompanyVC() {
  const { userId } = useToken();
  const [company, setCompany] = useState(null);

  const getCompany = async () => {
    const response = await apiClient.get(`/companies?owner.id=${userId()}`);
    setCompany(response.data["hydra:member"][0]);
    return response.data;
  };

  const getCompanies = async () => {
    const response = await apiClient.get(`/companies`);
    return response.data;
  };

  return {
    getCompany,
    getCompanies,
    company,
  };
}
