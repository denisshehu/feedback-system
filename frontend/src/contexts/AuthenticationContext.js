import { createContext, useReducer, useEffect } from "react";

export const AuthenticationContext = createContext();

export const authenticationReducer = (state, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return { user: action.payload };
    case "SIGN_OUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthenticationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authenticationReducer, {
    user: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "SIGN_IN", payload: user });
    }
  }, []);

  return (
    <AuthenticationContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
