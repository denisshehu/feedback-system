import { createContext, useReducer } from "react";

export const FeedbackContext = createContext();

export const feedbackReducer = (state, action) => {
  switch (action.type) {
    case "GET_FEEDBACKS":
      return {
        feedbacks: action.payload,
      };
    case "POST_FEEDBACK":
      return {
        feedbacks: [action.payload, ...state.feedbacks],
      };
    case "DELETE_FEEDBACK":
      return {
        feedbacks: state.feedbacks.filter(
          (feedback) => feedback._id !== action.payload._id
        ),
      };
    case "PATCH_FEEDBACK":
      return {
        feedbacks: state.feedbacks.map((feedback) =>
          feedback._id === action.payload._id
            ? { ...feedback, ...action.payload }
            : feedback
        ),
      };
    default:
      return state;
  }
};

export const FeedbackContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(feedbackReducer, {
    feedbacks: [],
  });

  return (
    <FeedbackContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FeedbackContext.Provider>
  );
};
