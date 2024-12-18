import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getServices } from "../utils/api";

// contexts
import { useAuthenticationContext } from "../hooks/useAuthenticationContext";
import { useServiceContext } from "../hooks/useServiceContext";

// components
import RatingStars from "./RatingStars";

const FeedbackForm = ({
  isInsideSubmit,
  feedback,
  isButtonDisabled,
  onSubmit,
}) => {
  const { user } = useAuthenticationContext();
  const { services, dispatch } = useServiceContext();

  const navigate = useNavigate();

  const [service_id, setServiceId] = useState(feedback?.service_id || "");
  const [rating, setRating] = useState(feedback?.rating || "");
  const [comments, setComments] = useState(feedback?.comments || "");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && !services.length) {
      getServices(user.token, dispatch);
    }
  }, [user, services.length, dispatch]);

  const handleCancel = () => {
    navigate("/feedbacks");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await onSubmit({
        feedback,
        service_id,
        rating,
        comments,
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      <div className="form-row">
        <div className="left" />
        <div className="right">
          <h1>
            {isInsideSubmit ? "Submit a new feedback" : "Update your feedback"}
          </h1>
        </div>
      </div>

      {isInsideSubmit && (
        <div className="form-row">
          <div className="left">
            <label>Select a service:</label>
          </div>
          <div className="right">
            <select
              onChange={(event) => setServiceId(event.target.value)}
              value={service_id}
            >
              <option value="">Select a service</option>
              {services
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((service) => (
                  <option key={service._id} value={service._id}>
                    {service.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
      )}

      {!isInsideSubmit && (
        <div className="form-row">
          <div className="left">
            <label>Service:</label>
          </div>
          <div className="right">
            <select disabled>
              <option>
                {services.find((service) => service._id === service_id)?.name}
              </option>
            </select>
          </div>
        </div>
      )}

      <div className="form-row">
        <div className="left">
          <label>Rating:</label>
        </div>
        <div className="right">
          <RatingStars
            defaultRating={rating}
            updateOnSelect={(_rating) => setRating(_rating)}
          />
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
          <button
            type="submit"
            disabled={isButtonDisabled({
              service_id,
              rating,
              comments,
            })}
          >
            {isInsideSubmit ? "Submit feedback" : "Update feedback"}
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

export default FeedbackForm;
