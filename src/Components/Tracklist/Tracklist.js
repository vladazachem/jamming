import React from "react";

import styles from "./Tracklist.module.css";
import "../../style.css";

import Track from "../Track/Track";

/**
 * Tracklist component that displays a list of tracks.
 * Each track is rendered using the Track component. If no tracks are found, a message about it is displayed.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.userSearchResults - Array of track objects representing the search results or playlist tracks.
 * @param {function} props.onAdd - Function to handle adding a track to the playlist (passed to each Track component).
 * @param {function} props.onRemove - Function to handle removing a track from the playlist (passed to each Track component).
 * @param {boolean} props.isRemoval - A flag that determines if the Track component should show removal options.
 *
 * @returns {JSX.Element} The rendered Tracklist component.
 */
const Tracklist = (props) => {
  return (
    <div className={styles.main}>
      {props.userSearchResults && props.userSearchResults.length > 0 ? (
        props.userSearchResults.map((track) => (
          <Track
            track={track}
            key={track.id}
            onAdd={props.onAdd}
            isRemoval={props.isRemoval}
            onRemove={props.onRemove}
          />
        ))
      ) : (
        <p>No tracks found</p>
      )}
    </div>
  );
};

export default Tracklist;
