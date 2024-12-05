import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getServices, patchFeedback } from "../utils/api";

// contexts
import { useServiceContext } from "../hooks/useServiceContext";
import { useFeedbackContext } from "../hooks/useFeedbackContext";

// components
import RatingStars from "../components/RatingStars";

const Update = () => {
  const { services, dispatch } = useServiceContext();
  const { dispatch: feedbacksDispatch } = useFeedbackContext();

  const navigate = useNavigate();

  const feedback = JSON.parse(localStorage.getItem("feedbackToUpdate"));
  const originalRating = feedback.rating;
  const originalComments = feedback.comments;

  const [rating, setRating] = useState(originalRating);
  const [comments, setComments] = useState(originalComments);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!services.length) {
      getServices(dispatch);
    }
  }, [services.length, dispatch]);

  const hasDataChanged = () => {
    return rating !== originalRating || comments !== originalComments;
  };

  const isFormFilled = () => {
    return rating && comments;
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedFeedback = { ...feedback, rating: rating, comments: comments };

    const response = await patchFeedback(
      feedback._id,
      updatedFeedback,
      feedbacksDispatch
    );

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
          <h1>Update your feedback</h1>
        </div>
      </div>

      <div className="form-row">
        <div className="left">
          <label>Service:</label>
        </div>
        <div className="right">
          <select disabled={true}>
            {!services.length && <option />}
            <option>
              {services.length &&
                services.find((service) => service._id === feedback.service_id)
                  .name}
            </option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="left">
          <label>Rating:</label>
        </div>
        <div className="right">
          <RatingStars
            defaultRating={feedback.rating}
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
          <button type="submit" disabled={!hasDataChanged() || !isFormFilled()}>
            Update feedback
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

export default Update;
