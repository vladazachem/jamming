import React from "react";

import styles from "./Playlist.module.css";
import "../../style.css";

import Tracklist from "../Tracklist/Tracklist";

/**
 * Playlist component that allows users to create and save playlists by providing a playlist name and adding tracks.
 * It renders a list of tracks and handles saving the playlist to Spotify.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.playlistTracks - Array of track objects added to the playlist.
 * @param {boolean} props.isRemoval - Flag to determine if tracks should be removable from the playlist.
 * @param {function} props.onRemove - Function to handle track removal from the playlist.
 * @param {string} props.playlistName - Name of the playlist entered by the user.
 * @param {function} props.onNameChange - Function to handle updates to the playlist name.
 * @param {function} props.onClear - Function to clear the current playlist.
 *
 * @returns {JSX.Element} The rendered Playlist component.
 */
const Playlist = (props) => {
  /**
   * Handles changes to the playlist name input field.
   *
   * @param {Object} event - The input event object.
   */
  const hendleNameChange = ({ target }) => {
    props.onNameChange(target.value);
  };

  /**
   * Saves the playlist to Spotify by creating a new playlist and adding tracks to it.
   *
   * @async
   * @param {string} name - The name of the playlist.
   * @param {Array} trackUris - Array of Spotify track URIs to be added to the playlist.
   */
  const savePlaylist = async (name, trackUris) => {
    if (!name || !trackUris || trackUris.length === 0) {
      alert("Please provide a playlist name and add tracks.");
      return;
    }

    const storedToken = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${storedToken}` };

    try {
      const userResponse = await fetch(`https://api.spotify.com/v1/me`, {
        headers,
      });
      const userData = await userResponse.json();
      const userId = userData.id;

      const playlistResponse = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          method: "POST",
          headers: {
            ...headers,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: name }),
        }
      );

      const playlistData = await playlistResponse.json();
      const playlistId = playlistData.id;

      await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: "POST",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uris: trackUris }),
      });

      alert("Playlist saved successfully!");
    } catch (error) {
      console.error("Error saving playlist:", error);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h3>Your playlist</h3>
        <h4>Here, you can create a new playlist.</h4>
      </div>
      <div className={styles.tracklist_playlist}>
        <Tracklist
          userSearchResults={props.playlistTracks}
          isRemoval={props.isRemoval}
          onRemove={props.onRemove}
        />
      </div>
      <div className={styles.inputSection}>
        <div className={`inputWrap ${styles.inputWrap}`}>
          <input
            className={`input ${styles.input}`}
            type="text"
            aria-label="playlistname"
            placeholder="Add a name..."
            value={props.playlistName}
            onChange={hendleNameChange}
          />
        </div>
        <div className={styles.btn_wrap}>
          <button
            className={`S_button`}
            onClick={() =>
              savePlaylist(
                props.playlistName,
                props.playlistTracks.map((track) => track.uri)
              )
            }
          >
            Save
          </button>
          <button
            className={`S_button ${styles.S_button}`}
            onClick={props.onClear}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
