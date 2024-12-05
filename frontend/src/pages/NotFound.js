import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <div className="oops">Oops!</div>
      <p>That page cannot be found.</p>
      <div className="button-wrapper">
        <button onClick={() => navigate("/")}>Go back to your feedbacks</button>
      </div>
    </div>
  );
};

export default NotFound;
