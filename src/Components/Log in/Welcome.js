import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from './Welcome.module.css';

import spotify_logo from './spotify_logo.svg';
import codecademy_logo from './codecademy_logo.svg';

const CLIENT_ID = "549b533061924e4c81509ccd9025d8a6"; // Replace with your Spotify Client ID
const REDIRECT_URI = "http://localhost:3000/"; // Replace with your Redirect URI
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("Window hash: ", window.location.hash);

    const hash = window.location.hash;
    let token = localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      // console.log("Token: ", token);

      localStorage.setItem("token", token);
      window.location.hash = "";
      navigate("/home");

      // Delay the navigation to check if navigate is working
      //   setTimeout(() => {
      //   console.log("Navigating to /home");
      //   navigate("/home");
      // }, 1000); // 3-second delay to see if it's working
    }
  }, [navigate]);

  const handleLogin = () => {
    window.location = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;
  };

  return (
     <div className={styles.mainframe}>
       <div className={styles.title}>
         <h1>Welcome to Jamm</h1>
         <button className={styles.loginButton} onClick={handleLogin}>Log in</button>
       </div>
       <div>
        <img className={styles.logos} src={spotify_logo} alt="Spotify logo"/>
         <img className={styles.logos} src={codecademy_logo} alt="Codecademy logo"/>
      </div>
   </div>
 );
};

export default Welcome;