import React, { useState } from "react";

import styles from './Home.module.css';
import '../../style.css';

import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
// import Tracklist from "../Tracklist/Tracklist";


const Home = () => {
  const [searchResults, setSearchResults] = useState([
    {
      name: "Track Name 1",
      artist: "Track Artist 1",
      album: "Track Album 1",
      id: 1
    },
    {
      name: "Track Name 2",
      artist: "Track Artist 2",
      album: "Track Album 2",
      id: 2
    },
    {
      name: "Track Name 3",
      artist: "Track Artist 3",
      album: "Track Album 3",
      id: 3
    },
    {
      name: "Track Name 4",
      artist: "Track Artist 4",
      album: "Track Album 4",
      id: 4
    }
  ])

  const [playlistName, setPlaylistName] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState([
    {
      name: "Track Playlist Name 1",
      artist: "Track Playlist Artist 1",
      album: "Track Playlist Album 1",
      id: 1
    }
  ]);

  const addTrack = (track) => {
    const existingTrack = playlistTracks.find((t) => t.id === track.id);

    if (existingTrack) {
      console.log('This track was already added');
    } else {
      setPlaylistTracks(prevTracks => [...prevTracks, track]);
      setSearchResults(prevResults => 
        prevResults.filter((t) => t.id !== track.id)
      );
    }
  };


  const removeTrack = (track) => {
    setPlaylistTracks(prevTracks =>
      prevTracks.filter((t) => t.id !== track.id)
    );
    setSearchResults(prevResults => [...prevResults, track]);
  };
  

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  // console.log('searchResults:', searchResults); // Check the initial data


  return (
    <div className={styles.main}>
      <Header />
      <SearchBar />
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
        />
      </div>
    </div>
  );
};

export default Home;
