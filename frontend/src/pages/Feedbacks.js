import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getServices, getFeedbacks } from "../utils/api";

// contexts
import { useAuthenticationContext } from "../hooks/useAuthenticationContext";
import { useServiceContext } from "../hooks/useServiceContext";
import { useFeedbackContext } from "../hooks/useFeedbackContext";

// components
import FeedbackCard from "../components/FeedbackCard";

const Feedbacks = () => {
  const { user } = useAuthenticationContext();
  const { dispatch: servicesDispatch } = useServiceContext();
  const { feedbacks, dispatch: feedbacksDispatch } = useFeedbackContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getServices(user.token, servicesDispatch);
    }
  }, [user, servicesDispatch]);

  useEffect(() => {
    if (user) {
      getFeedbacks(user.token, feedbacksDispatch);
    }

    localStorage.removeItem("feedbackToUpdate");
  }, [user, feedbacksDispatch]);

  return (
    <div className="feedbacks-page">
      <div className="button-wrapper">
        <button onClick={() => navigate("/submit")}>
          Submit a new feedback
        </button>
      </div>

      <div className="feedback-cards">
        {feedbacks &&
          feedbacks.map((feedback) => (
            <FeedbackCard key={feedback._id} feedback={feedback} />
          ))}
      </div>
    </div>
  );
};

export default Feedbacks;
