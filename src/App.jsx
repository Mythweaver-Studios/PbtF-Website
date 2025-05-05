// src/App.jsx
import "./components/Default.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
function App() {
  return (
    <BrowserRouter>
      {/* Routes manage which component renders based on the URL */}
      <Routes>
        {/* Define routes for each page */}
        <Route path="/" element={<Home />} />

        {/* Optional: Add other top-level routes or a 404 Not Found route later */}
        {/* <Route path="*" element={<div>404 Not Found</div>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
