import { useNavigate } from "react-router-dom";

// contexts
import { useAuthenticationContext } from "../hooks/useAuthenticationContext";

const NotFound = () => {
  const { user } = useAuthenticationContext();

  const navigate = useNavigate();

  const isCustomer = user?.role === "customer";
  const text = !user
    ? "the sign in page"
    : isCustomer
    ? "your feedbacks"
    : "the dashboard";

  return (
    <div className="not-found-page">
      <div className="oops">Oops!</div>
      <p>That page cannot be found.</p>
      <div className="button-wrapper">
        <button onClick={() => navigate("/")}>Go back to {text}</button>
      </div>
    </div>
  );
};

export default NotFound;
