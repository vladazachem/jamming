import React from 'react';
import { useNavigate } from "react-router-dom";

import styles from './Header.module.css';
import '../../style.css';

import logo from './jamm_logo.svg';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header>
        <div className={styles.wrap}>
            <img className={styles.logo} src={logo} alt="Jamm logo" />
            <button onClick={handleLogout}>Logout</button>
        </div>
        <div className={styles.divider_line}></div>
    </header>
  );
};

export default Header;