import React from "react";
import { ServiceContext } from "@components/service/ServiceContext";

export const useServiceContext = () => {
  const context = React.useContext(ServiceContext);
  if (!context) {
    throw new Error(
      "useServiceContext must be used within a ServiceContextProvider",
    );
  }
  return context;
};
