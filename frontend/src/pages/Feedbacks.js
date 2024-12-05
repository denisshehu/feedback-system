import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getServices, getFeedbacks } from "../utils/api";

// contexts
import { useServiceContext } from "../hooks/useServiceContext";
import { useFeedbackContext } from "../hooks/useFeedbackContext";

// components
import FeedbackCard from "../components/FeedbackCard";

const Feedbacks = () => {
  const { dispatch: servicesDispatch } = useServiceContext();
  const { feedbacks, dispatch: feedbacksDispatch } = useFeedbackContext();

  const navigate = useNavigate();

  useEffect(() => {
    getServices(servicesDispatch);
  }, [servicesDispatch]);

  useEffect(() => {
    getFeedbacks(feedbacksDispatch);
  }, [feedbacksDispatch]);

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
