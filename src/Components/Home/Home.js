import React from "react";

import styles from './Home.module.css';
import '../../style.css';

import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";


const Home = () => {
  return (
    <div className={styles.main}>
      <Header />
      <SearchBar />
    </div>
  );
};

export default Home;
