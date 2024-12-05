const fetchData = async (endpoint, id, method, body, dispatch, actionType) => {
  const url = `http://localhost:4000/api/${endpoint}/${id ? id : ""}`;

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : body,
  });

  if (response.ok) {
    if (actionType.split("_")[0] !== "PATCH") {
      const data = await response.json();
      dispatch({ type: actionType, payload: data });
    } else {
      dispatch({ type: actionType, payload: body });
    }
  }

  return response;
};

// GET all services
export const getServices = (dispatch) => {
  return fetchData("services", null, "GET", null, dispatch, "GET_SERVICES");
};

// GET all feedbacks
export const getFeedbacks = (dispatch) => {
  return fetchData("feedbacks", null, "GET", null, dispatch, "GET_FEEDBACKS");
};

// POST a new feedback
export const postFeedback = (feedback, dispatch) => {
  return fetchData(
    "feedbacks",
    null,
    "POST",
    feedback,
    dispatch,
    "POST_FEEDBACK"
  );
};

// DELETE a feedback
export const deleteFeedback = (id, dispatch) => {
  return fetchData(
    "feedbacks",
    id,
    "DELETE",
    null,
    dispatch,
    "DELETE_FEEDBACK"
  );
};

// PATCH a feedback
export const patchFeedback = (id, updatedFeedback, dispatch) => {
  return fetchData(
    "feedbacks",
    id,
    "PATCH",
    updatedFeedback,
    dispatch,
    "PATCH_FEEDBACK"
  );
};
