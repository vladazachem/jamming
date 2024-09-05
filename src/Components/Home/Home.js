import React from "react";

import styles from './Home.module.css';
import '../../style.css';

import Header from "../Header/Header";


const Home = () => {
  return (
    <div className={styles.main}>
      <Header />
    </div>
  );
};

export default Home;
