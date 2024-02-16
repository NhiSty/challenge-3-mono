import React from "react";
import { CompanyContext } from "@components/company/CompanyContext";

export const useCompanyContext = () => {
  const context = React.useContext(CompanyContext);
  if (!context) {
    throw new Error(
      "useCompanyContext must be used within a CompanyContextProvider",
    );
  }
  return context;
};
