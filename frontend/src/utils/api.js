import axios from "axios";

const fetchData = async (
  endpoint,
  id,
  method,
  token,
  body,
  dispatch,
  actionType
) => {
  const backendPort = process.env.REACT_APP_BACKEND_PORT;

  const url = `http://localhost:${backendPort}/api/${endpoint}/${id ? id : ""}`;

  try {
    const response = await axios({
      url,
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: body || undefined,
    });

    const data =
      actionType === "GET_ANALYTICS" ? response.data[0] : response.data;

    dispatch({ type: actionType, payload: data });

    return { isResponseOkay: true, data };
  } catch (error) {
    const data = error.response?.data || error.message;

    return { isResponseOkay: false, data };
  }
};

// SIGN UP a new user
export const signUpUser = async (name, email, password, role, dispatch) => {
  return await fetchData(
    "users/signup",
    null,
    "POST",
    null,
    { name, email, password, role },
    dispatch,
    "SIGN_IN"
  );
};

// SIGN IN a user
export const signInUser = async (email, password, dispatch) => {
  return await fetchData(
    "users/signin",
    null,
    "POST",
    null,
    { email, password },
    dispatch,
    "SIGN_IN"
  );
};

// GET all services
export const getServices = async (token, dispatch) => {
  return await fetchData(
    "services",
    null,
    "GET",
    token,
    null,
    dispatch,
    "GET_SERVICES"
  );
};

// GET all feedbacks
export const getFeedbacks = async (token, dispatch) => {
  return await fetchData(
    "feedbacks",
    null,
    "GET",
    token,
    null,
    dispatch,
    "GET_FEEDBACKS"
  );
};

// POST a new feedback
export const postFeedback = async (token, feedback, dispatch) => {
  return await fetchData(
    "feedbacks",
    null,
    "POST",
    token,
    feedback,
    dispatch,
    "POST_FEEDBACK"
  );
};

// DELETE a feedback
export const deleteFeedback = async (id, token, dispatch) => {
  return await fetchData(
    "feedbacks",
    id,
    "DELETE",
    token,
    null,
    dispatch,
    "DELETE_FEEDBACK"
  );
};

// PATCH a feedback
export const patchFeedback = async (id, token, updatedFeedback, dispatch) => {
  return await fetchData(
    "feedbacks",
    id,
    "PATCH",
    token,
    updatedFeedback,
    dispatch,
    "PATCH_FEEDBACK"
  );
};

// GET analytics
export const getAnalytics = async (token, dispatch) => {
  return await fetchData(
    "analytics",
    null,
    "GET",
    token,
    null,
    dispatch,
    "GET_ANALYTICS"
  );
};
