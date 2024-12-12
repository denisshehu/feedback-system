import { useState } from "react";
import { Link } from "react-router-dom";

const SignForm = ({ isSigningUp, isButtonDisabled, onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const title = isSigningUp ? "Sign up" : "Sign in";

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await onSubmit({ name, email, password });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="sign-form">
      <div className="form-row">
        <div className="top" />
        <div className="bottom">
          <h1>{title}</h1>

          {!isSigningUp && (
            <p>
              No account?{" "}
              <Link to="/signup" className={"create-account"}>
                Create one!
              </Link>
            </p>
          )}
        </div>
      </div>

      {isSigningUp && (
        <div className="form-row">
          <div className="top">
            <label>Name:</label>
          </div>
          <div className="bottom">
            <input
              type="text"
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
          </div>
        </div>
      )}

      <div className="form-row">
        <div className="top">
          <label>Email:</label>
        </div>
        <div className="bottom">
          <input
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="top">
          <label>Password:</label>
        </div>
        <div className="bottom">
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="top" />
        <div className="bottom">
          <button disabled={isButtonDisabled({ name, email, password })}>
            {title}
          </button>
        </div>
      </div>

      {error && (
        <div className="form-row">
          <div className="top" />
          <div className="bottom">
            <div className="error">{error}</div>
          </div>
        </div>
      )}
    </form>
  );
};

export default SignForm;
