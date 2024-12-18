import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// context providers
import { AuthenticationContextProvider } from "./contexts/AuthenticationContext";
import { ServiceContextProvider } from "./contexts/ServiceContext";
import { FeedbackContextProvider } from "./contexts/FeedbackContext";
import { AnalyticsContextProvider } from "./contexts/AnalyticsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthenticationContextProvider>
      <ServiceContextProvider>
        <FeedbackContextProvider>
          <AnalyticsContextProvider>
            <App />
          </AnalyticsContextProvider>
        </FeedbackContextProvider>
      </ServiceContextProvider>
    </AuthenticationContextProvider>
  </React.StrictMode>
);
