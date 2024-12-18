import { useNavigate } from "react-router-dom";

import { patchFeedback } from "../utils/api";

// contexts
import { useAuthenticationContext } from "../hooks/useAuthenticationContext";
import { useFeedbackContext } from "../hooks/useFeedbackContext";

// components
import FeedbackForm from "../components/FeedbackForm";

const Update = () => {
  const { user } = useAuthenticationContext();
  const { dispatch } = useFeedbackContext();

  const navigate = useNavigate();

  const feedback = JSON.parse(localStorage.getItem("feedbackToUpdate"));

  const isButtonDisabled = ({ rating, comments }) => {
    const { rating: initRating, comments: initComments } = feedback;

    const isFormFilled = rating && comments;
    const hasDataChanged = rating !== initRating || comments !== initComments;
    return !(isFormFilled && hasDataChanged);
  };

  const handleSubmit = async ({ rating, comments }) => {
    const updatedFeedback = { ...feedback, rating, comments };

    const { isResponseOkay, data } = await patchFeedback(
      feedback._id,
      user.token,
      updatedFeedback,
      dispatch
    );

    if (!isResponseOkay) {
      throw new Error(data.error);
    } else {
      navigate("/feedbacks");
    }
  };

  return !feedback ? null : (
    <FeedbackForm
      isInsideSubmit={false}
      feedback={feedback}
      isButtonDisabled={isButtonDisabled}
      onSubmit={handleSubmit}
    />
  );
};

export default Update;
