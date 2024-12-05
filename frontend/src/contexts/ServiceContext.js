import { createContext, useReducer } from "react";

export const ServiceContext = createContext();

export const serviceReducer = (state, action) => {
  switch (action.type) {
    case "GET_SERVICES":
      return {
        services: action.payload,
      };
    default:
      return state;
  }
};

export const ServiceContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(serviceReducer, {
    services: [],
  });

  return (
    <ServiceContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ServiceContext.Provider>
  );
};
