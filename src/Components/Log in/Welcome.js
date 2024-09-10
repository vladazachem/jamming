import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from './Welcome.module.css';
import '../../style.css';


import spotify_logo from './spotify_logo.svg';
import codecademy_logo from './codecademy_logo.svg';

const CLIENT_ID = "549b533061924e4c81509ccd9025d8a6";
const REDIRECT_URI = "http://localhost:3000/";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    let token = localStorage.getItem("token");
    let expiryTime = localStorage.getItem("expiry_time");


  
    if (!token && hash) {
      try {
        const hashParams = hash
          .substring(1)
          .split("&")
          .reduce((result, param) => {
            const [key, value] = param.split("=");
            result[key] = value;
            return result;
          }, {});
  
        token = hashParams.access_token;
        const expiresIn = hashParams.expires_in; // Get expiration time from Spotify
        expiryTime = Date.now() + expiresIn * 1000; // Calculate expiry time
  
        localStorage.setItem("token", token);
        localStorage.setItem("expiry_time", expiryTime);
  
        window.location.hash = ""; // Clear hash
  
        navigate("/home");
      } catch (error) {
        console.error("Error processing the token from URL:", error);
      }
    }
  
    if (expiryTime && Date.now() > expiryTime) {
      localStorage.removeItem("token");
      localStorage.removeItem("expiry_time");
      alert("Your session has expired. Please log in again.");
    }
  }, [navigate]);
  

  const handleLogin = () => {
    const scopes = 'user-top-read';  // Request the necessary scope
    window.location = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scopes}`;
  };
  

  return (
    <div className={styles.mainframe}>
     <div className={styles.wrap}>
       <div className={styles.title}>
         <h1>Welcome to Jamm</h1>
         <button className="login_button" onClick={handleLogin}>Log in</button>
       </div>
       <div className={styles.logo_wrap}>
          <img className={styles.logos} src={spotify_logo} alt="Spotify logo"/>
          <div className={styles.divider_line}></div>
          <img className={styles.logos} src={codecademy_logo} alt="Codecademy logo"/>
        </div>
      </div>
    </div>
 );
};

export default Welcome;