import { useContext } from "react";

import { AnalyticsContext } from "../contexts/AnalyticsContext";

export const useAnalyticsContext = () => {
  const context = useContext(AnalyticsContext);

  if (!context) {
    throw Error(
      "useAnalyticsContext must only be used inside an AnalyticsContextProvider."
    );
  }

  return context;
};
