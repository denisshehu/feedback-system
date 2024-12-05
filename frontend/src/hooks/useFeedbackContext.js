import { useContext } from "react";

import { FeedbackContext } from "../contexts/FeedbackContext";

export const useFeedbackContext = () => {
  const context = useContext(FeedbackContext);

  if (!context) {
    throw Error(
      "useFeedbackContext must only be used inside a FeedbackContextProvider."
    );
  }

  return context;
};
