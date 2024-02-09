import { getFranchises } from "@/api/franchise";
import { useEffect, useState } from "react";

export default function useFranchiseVC() {
  const [franchises, setFranchises] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getFranchises()
      .then((response) => {
        setFranchises(response.data["hydra:member"] || []);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const franchiseOptions = franchises.map((franchise) => ({
    value: franchise.id,
    label: franchise.franchiseName,
  }));

  const getLabel = (value) => {
    const franchise = franchiseOptions.find(
      (franchise) => franchise.value === value,
    );
    return franchise ? franchise.label : "";
  };

  return {
    franchises,
    franchiseOptions,
    isLoading,
    getLabel,
  };
}
