import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "../Log in/Welcome";
import Home from "../Home/Home";
import "../../style.css";


/**
 * App component that sets up routing for the application.
 * It uses React Router to navigate between the Welcome page and Home page.
 *
 * @component
 * @returns {JSX.Element} The rendered App component with routing.
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;