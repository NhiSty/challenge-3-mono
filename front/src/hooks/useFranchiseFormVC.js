import { apiClient } from "@/api";

export default function useFranchiseFormVC() {
  const submitFranchise = async (franchise) => {
    const response = await apiClient.post("/franchises", franchise);
    return response.data;
  };

  return {
    submitFranchise,
  };
}
