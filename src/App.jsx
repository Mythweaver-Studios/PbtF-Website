// src/App.jsx
// Default.css is imported by components that need it (like NavBar via Home & Showcase)
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Showcase from "./pages/Showcase/Showcase";

function App() {
  return (
    <BrowserRouter>
      {/* Routes manage which component renders based on the URL */}
      <Routes>
        {/* Define routes for each page */}
        <Route path="/" element={<Home />} />
        <Route path="/showcase" element={<Showcase />} />{" "}
        {/* Optional: Add other top-level routes or a 404 Not Found route later */}
        {/* <Route path="*" element={<div>404 Not Found</div>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
