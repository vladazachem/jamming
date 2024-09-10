import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import "../../style.css";

import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [searchFilter, setSearchFilter] = useState("all");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [initialTracks, setInitialTracks] = useState([]);

  const navigate = useNavigate();

  // console.log("Token:", token);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken); // Ensure token is updated

    if (!storedToken) return;

    // Function to fetch items based on search term
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

  useEffect(() => {
    const expiryTime = localStorage.getItem("expiry_time");
    if (expiryTime && Date.now() > expiryTime) {
      localStorage.removeItem("token");
      localStorage.removeItem("expiry_time");
      alert("Session expired. Please log in again.");
      navigate("/");
    }
  }, [navigate]);

  // Search and filter function
  const search = (term, filter) => {
    setSearchFilter(filter);

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
          const filteredResults = data.tracks.items
            .filter((track) => {
              if (filter === "all") {
                return (
                  track.name.toLowerCase().includes(term.toLowerCase()) ||
                  track.artists[0].name.toLowerCase().includes(term.toLowerCase())
                );
              } else if (filter === "artist") {
                return track.artists[0].name.toLowerCase().includes(term.toLowerCase());
              } else if (filter === "title") {
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

  // Playlist functions
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

  const removeTrack = (track) => {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((t) => t.id !== track.id)
    );
    setSearchResults((prevResults) => [...prevResults, track]);
  };

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  const savePlaylist = () => {
    const trackURIs = playlistTracks.map((t) => t.uri);
    console.log("Saved playlist with URIs:", trackURIs);
  };

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
