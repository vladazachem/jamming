import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import "../../style.css";

import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

/**
 * Home component that allows users to search for tracks, create playlists, and manage tracks.
 * It interacts with Spotify's API for fetching tracks based on search queries.
 *
 * @component
 * @returns {JSX.Element} The rendered Home component.
 */

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [searchFilter, setSearchFilter] = useState("all"); // Filter state kept
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [initialTracks, setInitialTracks] = useState([]);

  const navigate = useNavigate();

  /**
   * useEffect hook that fetches Spotify token from localStorage, and uses it to fetch initial tracks
   * based on a default search query. Also checks for token expiration and navigates to login if expired.
   */
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken); // Ensure token is updated
    if (!storedToken) return;

    /**
     * Fetches tracks based on the search query from Spotify API.
     *
     * @param {string} query - The search term to query the Spotify API.
     */
    const fetchItems = (query) => {
      fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data.tracks && data.tracks.items) {
            const fetchedTracks = data.tracks.items.map((track) => ({
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri,
            }));
            setInitialTracks(fetchedTracks); // Set the initial fetched tracks
            setSearchResults(fetchedTracks); // Initialize search results with fetched tracks
          } else {
            throw new Error("No tracks found in the response.");
          }
        })
        .catch((error) => console.error("Error fetching items:", error));
    };

    fetchItems("your default search query");
  }, [token]);

  /**
   * useEffect hook that checks for token expiration and redirects the user to login page if expired.
   */
  useEffect(() => {
    const expiryTime = localStorage.getItem("expiry_time");
    if (expiryTime && Date.now() > expiryTime) {
      localStorage.removeItem("token");
      localStorage.removeItem("expiry_time");
      alert("Session expired. Please log in again.");
      navigate("/");
    }
  }, [navigate]);

  /**
   * Handles search and filtering of tracks based on search term and filter type.
   *
   * @param {string} term - The search term to query.
   * @param {string} filter - The filter to apply ("all", "artist", "title").
   */
  const search = (term, filter = "all") => {
    setSearchFilter(filter); // Update the search filter

    if (!term) {
      setSearchResults(initialTracks); // Reset to initial list if term is empty
      return;
    }

    // Call fetchItems whenever the user searches
    fetch(`https://api.spotify.com/v1/search?q=${term}&type=track`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.tracks && data.tracks.items) {
          // Apply filter based on selected searchFilter
          const filteredResults = data.tracks.items
            .filter((track) => {
              if (searchFilter === "all") {
                return (
                  track.name.toLowerCase().includes(term.toLowerCase()) ||
                  track.artists[0].name
                    .toLowerCase()
                    .includes(term.toLowerCase())
                );
              } else if (searchFilter === "artist") {
                return track.artists[0].name
                  .toLowerCase()
                  .includes(term.toLowerCase());
              } else if (searchFilter === "title") {
                return track.name.toLowerCase().includes(term.toLowerCase());
              }
              return false;
            })
            .map((track) => ({
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri,
            }));
          setSearchResults(filteredResults);
        } else {
          throw new Error("No tracks found in the response.");
        }
      })
      .catch((error) => console.error("Error fetching search results:", error));
  };

  /**
   * Adds a track to the playlist and removes it from the search results.
   *
   * @param {Object} track - The track object to be added.
   */
  const addTrack = (track) => {
    const existingTrack = playlistTracks.find((t) => t.id === track.id);

    if (existingTrack) {
      console.log("This track was already added");
    } else {
      setPlaylistTracks((prevTracks) => [...prevTracks, track]);
      setSearchResults((prevResults) =>
        prevResults.filter((t) => t.id !== track.id)
      );
    }
  };

  /**
   * Removes a track from the playlist and adds it back to the search results.
   *
   * @param {Object} track - The track object to be removed.
   */
  const removeTrack = (track) => {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((t) => t.id !== track.id)
    );
    setSearchResults((prevResults) => [...prevResults, track]);
  };

  /**
   * Updates the playlist name.
   *
   * @param {string} name - The new playlist name.
   */
  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  /**
   * Saves the current playlist by sending the playlist name and tracks to the Playlist service.
   * Resets the playlist state after saving.
   */
  const savePlaylist = () => {
    const trackURIs = playlistTracks.map((t) => t.uri);
    if (!playlistName || trackURIs.length === 0) {
      alert("Please provide a playlist name and add tracks.");
      return;
    }

    Playlist.savePlaylist(playlistName, trackURIs)
      .then(() => {
        updatePlaylistName("");
        setPlaylistTracks([]);
      })
      .catch((error) => console.error("Error saving playlist:", error));
  };

  /**
   * Clears the playlist name and track list.
   */
  const clearPlaylist = () => {
    setPlaylistName("");
    setPlaylistTracks([]);
  };

  return (
    <div className={styles.main}>
      <Header />
      <SearchBar onSearch={search} />
      <div className={styles.card_container}>
        <SearchResults
          userSearchResults={searchResults}
          isRemoval={false}
          onAdd={addTrack}
        />
        <Playlist
          playlistName={playlistName}
          playlistTracks={playlistTracks}
          isRemoval={true}
          onRemove={removeTrack}
          onNameChange={updatePlaylistName}
          onSave={savePlaylist}
          onClear={clearPlaylist}
        />
      </div>
    </div>
  );
};

export default Home;
