import React, { useState } from "react";

import styles from "./SearchBar.module.css";
import "../../style.css";

import search_img from "./search.svg";

/**
 * SearchBar component that allows users to input search terms and filter search results.
 * It provides buttons to filter search by "All", "Artist", or "Title".
 *
 * @component
 * @param {Object} props - The component props.
 * @param {function} props.onSearch - Function to handle the search operation, triggered with the search term and filter.
 *
 * @returns {JSX.Element} The rendered SearchBar component.
 */
const SearchBar = (props) => {
  const [term, setTerm] = useState("");
  const [filter, setFilter] = useState("all");

  /**
   * Handles form submission to pass the search term and filter to the parent component.
   *
   * @param {Object} e - The event object from the form submission.
   */
  const passTerm = (e) => {
    e.preventDefault();
    props.onSearch(term, filter);
  };

  /**
   * Handles the input change event for the search term.
   *
   * @param {Object} event - The input event object.
   */
  const handleTermChange = ({ target }) => {
    setTerm(target.value);
  };

  /**
   * Handles the filter change event and triggers a search with the new filter.
   *
   * @param {string} newFilter - The selected filter for the search ("all", "artist", or "title").
   */
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
            className={`S_button ${styles.S_button} ${
              filter === "all" ? styles.active : ""
            }`}
            onClick={() => handleFilterChange("all")}
          >
            All
          </button>
          <button
            className={`S_button ${styles.S_button} ${
              filter === "artist" ? styles.active : ""
            }`}
            onClick={() => handleFilterChange("artist")}
          >
            Artist
          </button>
          <button
            className={`S_button ${styles.S_button} ${
              filter === "title" ? styles.active : ""
            }`}
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
