import { useContext } from "react";

import { AuthenticationContext } from "../contexts/AuthenticationContext";

export const useAuthenticationContext = () => {
  const context = useContext(AuthenticationContext);

  if (!context) {
    throw Error(
      "useAuthenticationContext must only be used inside a AuthenticationContextProvider."
    );
  }

  return context;
};
