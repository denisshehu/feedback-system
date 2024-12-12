import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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

  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={
                !user ? (
                  <SignIn />
                ) : isCustomer ? (
                  <Navigate to="/feedbacks" />
                ) : (
                  <Navigate to="/admin" />
                )
              }
            />

            <Route
              path="/signup"
              element={
                !user ? (
                  <SignUp />
                ) : isCustomer ? (
                  <Navigate to="/feedbacks" />
                ) : (
                  <Navigate to="/admin" />
                )
              }
            />

            <Route path="/feedbacks" element={<Feedbacks />} />
            <Route path="/submit" element={<Submit />} />
            <Route path="/update" element={<Update />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
