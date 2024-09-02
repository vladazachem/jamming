import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // Redirect to the welcome page after logout
  };

  return (
    <div className="Home">
      <h1>Home Page</h1>
      <p>You are logged in with Spotify!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
