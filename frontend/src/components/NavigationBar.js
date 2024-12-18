import { Link, useNavigate } from "react-router-dom";

// contexts
import { useAuthenticationContext } from "../hooks/useAuthenticationContext";
import { useFeedbackContext } from "../hooks/useFeedbackContext";

const NavigationBar = () => {
  const { user, dispatch: dispatchAuthentication } = useAuthenticationContext();
  const { dispatch: dispatchFeedback } = useFeedbackContext();

  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem("user");
    dispatchAuthentication({ type: "SIGN_OUT" });
    dispatchFeedback({ type: "GET_FEEDBACKS", payload: [] });
    navigate("/");
  };

  return (
    <header>
      <div className="navigation-bar">
        <Link to={"/"}>
          <h1>Feedback system</h1>
        </Link>
        {user && (
          <div>
            <span>{user.email}</span>
            <button className="cancel-button" onClick={handleClick}>
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavigationBar;
