import React, { useState } from "react";

import styles from "./SearchBar.module.css";
import "../../style.css";

import search_img from "./search.svg";

const SearchBar = (props) => {
  const [term, setTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const passTerm = (e) => {
    e.preventDefault();
    props.onSearch(term, filter);
  };

  const handleTermChange = ({ target }) => {
    setTerm(target.value);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    props.onSearch(term, newFilter); // Trigger search with updated filter
  };

  return (
    <div className={styles.main}>
      <div className={styles.wrap}>
        <form className={`inputWrap ${styles.inputWrap}`}>
          <button className={styles.search_btn} onClick={passTerm}>
            <img src={search_img} alt="Search" />
          </button>
          <input
            className={`input ${styles.input}`}
            type="search"
            aria-label="searchinput"
            placeholder="What do you want to find?"
            onChange={handleTermChange}
          />
        </form>
        <div className={styles.btns_section}>
          <button
            className={`S_button ${styles.S_button} ${filter === "all" ? styles.active : ""}`}
            onClick={() => handleFilterChange("all")}
          >
            All
          </button>
          <button
            className={`S_button ${styles.S_button} ${filter === "artist" ? styles.active : ""}`}
            onClick={() => handleFilterChange("artist")}
          >
            Artist
          </button>
          <button
            className={`S_button ${styles.S_button} ${filter === "title" ? styles.active : ""}`}
            onClick={() => handleFilterChange("title")}
          >
            Title
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;