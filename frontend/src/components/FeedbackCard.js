import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import { deleteFeedback } from "../utils/api";

// contexts
import { useServiceContext } from "../hooks/useServiceContext";
import { useFeedbackContext } from "../hooks/useFeedbackContext";

// components
import RatingStars from "./RatingStars";

const FeedbackCard = ({ feedback }) => {
  const { services } = useServiceContext();
  const { dispatch } = useFeedbackContext();

  const navigate = useNavigate();

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${format(date, "dd MMM yyyy")} at ${format(date, "HH:mm")}`;
  };

  const handleUpdate = () => {
    localStorage.setItem("feedbackToUpdate", JSON.stringify(feedback));
    navigate("/update");
  };

  const handleDelete = () => {
    deleteFeedback(feedback._id, dispatch);
  };

  return (
    <div className="feedback-card">
      <h3>
        Feedback to{" "}
        {services.length &&
          services.find((service) => service._id === feedback.service_id).name}
      </h3>

      <RatingStars defaultRating={feedback.rating} isStatic={true} />

      <p className="comments">{feedback.comments}</p>

      {feedback.updatedAt !== feedback.createdAt && (
        <p className="updated-at">
          Last updated on {formatDate(feedback.updatedAt)}
        </p>
      )}

      <p className="created-at">
        Submitted on {formatDate(feedback.createdAt)}
      </p>

      <div className="card-buttons">
        <span className="material-symbols-rounded" onClick={handleUpdate}>
          edit
        </span>
        <span className="material-symbols-rounded" onClick={handleDelete}>
          delete
        </span>
      </div>
    </div>
  );
};

export default FeedbackCard;
