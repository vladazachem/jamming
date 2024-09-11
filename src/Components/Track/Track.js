import React from "react";

import styles from "./Track.module.css";
import "../../style.css";

import minus from "./minus.svg";
import plus from "./plus.svg";

/**
 * Track component that displays a track's details and provides the option to add or remove the track.
 * The displayed action (add or remove) is determined by the `isRemoval` prop.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.track - The track object containing details like `name`, `artist`, `album`, and `uri`.
 * @param {boolean} props.isRemoval - A flag that determines whether the action button should allow track removal or addition.
 * @param {function} props.onAdd - Function to handle adding the track to a playlist.
 * @param {function} props.onRemove - Function to handle removing the track from a playlist.
 *
 * @returns {JSX.Element} The rendered Track component.
 */
const Track = (props) => {
  /**
   * Renders the appropriate action button based on the `isRemoval` prop.
   * If `isRemoval` is true, a remove button is shown; otherwise, an add button is shown.
   *
   * @returns {JSX.Element} The action button for adding or removing the track.
   */
  const renderAction = () => {
    if (props.isRemoval) {
      return (
        <button className={styles.btn} onClick={passTrackRemove}>
          <img src={minus} alt="Delete" />
        </button>
      );
    } else {
      return (
        <button className={styles.btn} onClick={passTrack}>
          <img src={plus} alt="Add" />
        </button>
      );
    }
  };

  /**
   * Calls the `onAdd` function passed via props to add the track to the playlist.
   */
  const passTrack = () => {
    props.onAdd(props.track);
  };

  /**
   * Calls the `onRemove` function passed via props to remove the track from the playlist.
   */
  const passTrackRemove = () => {
    props.onRemove(props.track);
  };

  return (
    <div className={styles.main}>
      <div className={styles.track_wrap}>
        <h3 className={styles.h3}>{props.track.name}</h3>
        <p>
          {props.track.artist} | {props.track.album}
        </p>
      </div>
      {renderAction()}
    </div>
  );
};

export default Track;
