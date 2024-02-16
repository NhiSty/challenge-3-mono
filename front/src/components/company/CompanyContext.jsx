import { createContext, useEffect, useState } from "react";
import { getCompany } from "@/api/company";
import useToken from "@/hooks/useToken";
import PropTypes from "prop-types";
import {
  addFranchises,
  deleteFranchise,
  updateFranchise,
} from "@/api/franchise";

export const CompanyContext = createContext({
  company: {},
  franchises: [],
  owner: {},
  createFranchise: () => {},
  editFranchise: () => {},
  removeFranchise: () => {},
  loadingCompany: false,
});

export const CompanyContextProvider = ({ children }) => {
  const [company, setCompany] = useState({});
  const [franchises, setFranchises] = useState([]);
  const [owner, setOwner] = useState({});
  const [loadingCompany, setLoadingCompany] = useState(false);
  const [franchisesLoading, setFranchisesLoading] = useState(false);

  const createFranchise = async (franchise, onSuccess) => {
    try {
      setFranchisesLoading(true);
      const response = await addFranchises({
        franchiseName: franchise.name,
        companyId: company.id,
        address: franchise.address.value.name,
        longitude: franchise.address.value.geometry.coordinates[0],
        latitude: franchise.address.value.geometry.coordinates[1],
      });
      setFranchises([...franchises, response.data]);
      onSuccess && onSuccess();
    } catch (error) {
      console.error("Error while creating franchise", error);
      throw error;
    } finally {
      setFranchisesLoading(false);
    }
  };

  const editFranchise = async (franchise, onSuccess) => {
    try {
      setFranchisesLoading(true);
      const response = await updateFranchise({
        id: franchise.id,
        franchiseName: franchise.name,
        address: franchise.address.value.name,
        longitude: franchise.address.value.geometry.coordinates[0],
        latitude: franchise.address.value.geometry.coordinates[1],
      });
      setFranchises(
        franchises.map((f) => (f.id === response.data.id ? response.data : f)),
      );
      onSuccess && onSuccess();
    } catch (error) {
      console.error("Error while updating franchise", error);
      throw error;
    } finally {
      setFranchisesLoading(false);
    }
  };

  const removeFranchise = async (franchiseId, onSuccess) => {
    try {
      setFranchisesLoading(true);
      await deleteFranchise(franchiseId);
      setFranchises(
        franchises.filter((franchise) => franchise.id !== franchiseId),
      );
      onSuccess && onSuccess();
    } catch (error) {
      console.error("Error while removing franchise", error);
      throw error;
    } finally {
      setFranchisesLoading(false);
    }
  };

  useEffect(() => {
    try {
      setLoadingCompany(true);
      getCompany()
        .then((response) => {
          setCompany(response.company);
          setFranchises(response.franchises);
          setOwner(response.owner);
        })
        .finally(() => {
          setLoadingCompany(false);
        });
    } catch (error) {
      console.error("Error while fetching company", error);
    }
  }, []);

  if (loadingCompany || !company) {
    return <div>Loading...</div>;
  }

  return (
    <CompanyContext.Provider
      value={{
        company,
        franchises,
        createFranchise,
        loadingCompany,
        franchisesLoading,
        editFranchise,
        removeFranchise,
        owner,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

CompanyContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
