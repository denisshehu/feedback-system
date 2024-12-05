import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getServices, postFeedback } from "../utils/api";

// contexts
import { useServiceContext } from "../hooks/useServiceContext";
import { useFeedbackContext } from "../hooks/useFeedbackContext";

// components
import RatingStars from "../components/RatingStars";

const Submit = () => {
  const { services, dispatch: servicesDispatch } = useServiceContext();
  const { dispatch: feedbacksDispatch } = useFeedbackContext();

  const navigate = useNavigate();

  const [service_id, setServiceID] = useState("");
  const [rating, setRating] = useState("");
  const [comments, setComments] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!services.length) {
      getServices(servicesDispatch);
    }
  }, [services.length, servicesDispatch]);

  const isFormFilled = () => {
    return service_id && rating && comments;
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const feedback = { user_id: "User 1", service_id, rating, comments };

    const response = await postFeedback(feedback, feedbacksDispatch);

    if (!response.ok) {
      const data = await response.json();
      setError(data.error);
    } else {
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="left" />
        <div className="right">
          <h1>Submit a new feedback</h1>
        </div>
      </div>

      <div className="form-row">
        <div className="left">
          <label>Select a service:</label>
        </div>
        <div className="right">
          <select
            onChange={(event) => setServiceID(event.target.value)}
            value={service_id}
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service._id} value={service._id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="left">
          <label>Rating:</label>
        </div>
        <div className="right">
          <RatingStars updateOnSelect={(_rating) => setRating(_rating)} />
        </div>
      </div>

      <div className="form-row">
        <div className="left">
          <label>Comments:</label>
        </div>
        <div className="right">
          <textarea
            rows="10"
            onChange={(event) => setComments(event.target.value)}
            value={comments}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="left" />
        <div className="right">
          <button
            className="cancel-button"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button type="submit" disabled={!isFormFilled()}>
            Submit feedback
          </button>
        </div>
      </div>

      {error && (
        <div className="form-row">
          <div className="left" />
          <div className="right">
            <div className="error">{error}</div>
          </div>
        </div>
      )}
    </form>
  );
};

export default Submit;
