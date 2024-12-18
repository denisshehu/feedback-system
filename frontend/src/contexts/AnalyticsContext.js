import { createContext, useReducer } from "react";

export const AnalyticsContext = createContext();

export const analyticsReducer = (state, action) => {
  switch (action.type) {
    case "GET_ANALYTICS":
      return {
        ...state,
        average_ratings: action.payload?.average_ratings || [],
        submission_trend: action.payload?.submission_trend || [],
      };
    default:
      return state;
  }
};

export const AnalyticsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(analyticsReducer, {
    average_ratings: [],
    submission_trend: [],
  });

  return (
    <AnalyticsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AnalyticsContext.Provider>
  );
};
