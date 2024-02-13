import React, { createContext, useState, useEffect } from "react";
import {
  addService,
  fetchAllServices,
  removeService,
  updateService,
} from "@/api/service";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

export const ServiceContext = createContext({
  services: [],
  newService: () => {},
  deleteService: () => {},
  editService: () => {},
});

export const ServiceContextProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAllServices().then((services) => {
      console.log({ services }, "here");
      setData(services);
    });
  }, []);

  const newService = (serviceData, onSuccess) => {
    console.log({ serviceData });
    addService(serviceData)
      .then((service) => {
        console.log("service", service);
        setData([...data, service.data]);
        toast.success("serviceAddedSuccessfully");
        onSuccess && onSuccess();
      })
      .catch((error) => {
        console.error(error);
        toast.error("serviceAdditionFailed");
      });
  };
  const deleteService = (id) => {
    removeService(id).then(() =>
      setData(data.filter((item) => item.id !== id)),
    );
  };
  const editService = (editedData) => {
    updateService(editedData).then(() => {
      setData(
        data.map((item) => (item.id === editedData.id ? editedData : item)),
      );
    });
  };

  return (
    <ServiceContext.Provider
      value={{ services: data, newService, deleteService, editService }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

ServiceContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
