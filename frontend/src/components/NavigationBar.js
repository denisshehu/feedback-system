import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <header>
      <div className="navigation-bar">
        <Link to="/">
          <h1>Feedback system</h1>
        </Link>
      </div>
    </header>
  );
};

export default NavigationBar;
