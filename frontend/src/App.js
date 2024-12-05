import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Feedbacks from "./pages/Feedbacks";
import Submit from "./pages/Submit";
import Update from "./pages/Update";
import NotFound from "./pages/NotFound";

// components
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Feedbacks />} />
            <Route path="/submit" element={<Submit />} />
            <Route path="/update" element={<Update />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
