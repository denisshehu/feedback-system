import { useContext } from "react";

import { ServiceContext } from "../contexts/ServiceContext";

export const useServiceContext = () => {
  const context = useContext(ServiceContext);

  if (!context) {
    throw Error(
      "useServiceContext must only be used inside a ServiceContextProvider."
    );
  }

  return context;
};
