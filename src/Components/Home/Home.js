import React from "react";

import styles from './Home.module.css';
import '../../style.css';

import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
// import Tracklist from "../Tracklist/Tracklist";


const Home = () => {
  return (
    <div className={styles.main}>
      <Header />
      <SearchBar />
      <div className={styles.card_container}>
        <SearchResults />
        <Playlist />
      </div>
    </div>
  );
};

export default Home;
