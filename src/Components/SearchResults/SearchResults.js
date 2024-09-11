import React from "react";

import styles from "./SearchResults.module.css";
import "../../style.css";

import Tracklist from "../Tracklist/Tracklist";

/**
 * SearchResults component that displays the search results in the form of a tracklist.
 * It displays a header with a brief description and passes the search results to the Tracklist component to display.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.userSearchResults - Array of track objects representing the search results.
 * @param {boolean} props.isRemoval - A flag that indicates whether the tracklist should display removal options.
 * @param {function} props.onAdd - Function to handle adding a track to the playlist.
 *
 * @returns {JSX.Element} The rendered SearchResults component.
 */
const SearchResults = (props) => {
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h3>Results</h3>
        <h4>Here, you can find all the music you're looking for.</h4>
      </div>
      <div className={styles.tracklist_results}>
        <Tracklist
          userSearchResults={props.userSearchResults}
          isRemoval={props.isRemoval}
          onAdd={props.onAdd}
        />
      </div>
    </div>
  );
};

export default SearchResults;
