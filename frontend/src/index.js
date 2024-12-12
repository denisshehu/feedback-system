import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// context providers
import { AuthenticationContextProvider } from "./contexts/AuthenticationContext";
import { ServiceContextProvider } from "./contexts/ServiceContext";
import { FeedbackContextProvider } from "./contexts/FeedbackContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthenticationContextProvider>
      <ServiceContextProvider>
        <FeedbackContextProvider>
          <App />
        </FeedbackContextProvider>
      </ServiceContextProvider>
    </AuthenticationContextProvider>
  </React.StrictMode>
);
