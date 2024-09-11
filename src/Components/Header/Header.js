import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Header.module.css";
import "../../style.css";

import logo from "./jamm_logo.svg";

/**
 * Header component that displays the application logo and a logout button.
 * Handles user logout by removing the authentication token from localStorage and navigating to the login page.
 *
 * @component
 * @returns {JSX.Element} The rendered Header component.
 */
const Header = () => {
  const navigate = useNavigate();

  /**
   * Handles user logout by removing the token from localStorage and navigating to the login page.
   */
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header>
      <div className={styles.wrap}>
        <img className={styles.logo} src={logo} alt="Jamm logo" />
        <button
          className={`M_button ${styles.M_button}`}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className={styles.divider_line}></div>
    </header>
  );
};

export default Header;
