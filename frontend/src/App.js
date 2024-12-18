import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// contexts
import { useAuthenticationContext } from "./hooks/useAuthenticationContext";

// pages
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Feedbacks from "./pages/Feedbacks";
import Submit from "./pages/Submit";
import Update from "./pages/Update";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

// components
import NavigationBar from "./components/NavigationBar";

function App() {
  const { user } = useAuthenticationContext();

  const isCustomer = user?.role === "customer";

  const navigate = (pageWhenNotSigned, pageWhenCustomer, pageWhenAdmin) => {
    return !user
      ? pageWhenNotSigned
      : isCustomer
      ? pageWhenCustomer
      : pageWhenAdmin;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={navigate(
                <SignIn />,
                <Navigate to={"/feedbacks"} />,
                <Navigate to={"/admin"} />
              )}
            />

            <Route
              path="/signup"
              element={navigate(
                <SignUp />,
                <Navigate to={"/feedbacks"} />,
                <Navigate to={"/admin"} />
              )}
            />

            <Route
              path="/feedbacks"
              element={navigate(
                <Navigate to={"/"} />,
                <Feedbacks />,
                <Navigate to={"/admin"} />
              )}
            />

            <Route
              path="/submit"
              element={navigate(
                <Navigate to={"/"} />,
                <Submit />,
                <Navigate to={"/admin"} />
              )}
            />

            <Route
              path="/update"
              element={navigate(
                <Navigate to={"/"} />,
                <Update />,
                <Navigate to={"/admin"} />
              )}
            />

            <Route
              path="/admin"
              element={navigate(
                <Navigate to={"/"} />,
                <Navigate to={"/feedbacks"} />,
                <Admin />
              )}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
