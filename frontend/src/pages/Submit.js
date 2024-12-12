import { useNavigate } from "react-router-dom";

import { postFeedback } from "../utils/api";

// contexts
import { useAuthenticationContext } from "../hooks/useAuthenticationContext";
import { useFeedbackContext } from "../hooks/useFeedbackContext";

// components
import FeedbackForm from "../components/FeedbackForm";

const Submit = () => {
  const { user } = useAuthenticationContext();
  const { dispatch } = useFeedbackContext();

  const navigate = useNavigate();

  const isButtonDisabled = ({ service_id, rating, comments }) => {
    return !service_id || !rating || !comments;
  };

  const handleSubmit = async ({ service_id, rating, comments }) => {
    const feedback = { user_id: user.id, service_id, rating, comments };

    const { isResponseOkay, data } = await postFeedback(
      user.token,
      feedback,
      dispatch
    );

    if (!isResponseOkay) {
      throw new Error(data.error);
    } else {
      navigate("/feedbacks");
    }
  };

  return (
    <FeedbackForm
      isInsideSubmit={true}
      feedback={{}}
      isButtonDisabled={isButtonDisabled}
      onSubmit={handleSubmit}
    />
  );
};

export default Submit;
