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
    }
  ])

  const [playlistName, setPlaylistName] = useState();
  const [playlistTracks, setPlaylistTracks] = useState([
    {
      name: "Track Playlist Name 1",
      artist: "Track Playlist Artist 1",
      album: "Track Playlist Album 1",
      id: 1
    },
    {
      name: "Track Playlist Name 2",
      artist: "Track Playlist Artist 2",
      album: "Track Playlist Album 2",
      id: 2
    },
    {
      name: "Track Playlist Name 3",
      artist: "Track Playlist Artist 3",
      album: "Track Playlist Album 3",
      id: 3
    },
    {
      name: "Track Playlist Name 1",
      artist: "Track Playlist Artist 1",
      album: "Track Playlist Album 1",
      id: 4
    }
  ]);

  const addTrack = (track) => {
    const existingTrack = playlistTracks.find((t) => t.id === track.id);
    const newTrack = setPlaylistTracks.concat(track);

    if (existingTrack) {
      console.log('This track was already added');
    } else {
      playlistTracks(newTrack);
    }
  };

  // console.log('searchResults:', searchResults); // Check the initial data


  return (
    <div className={styles.main}>
      <Header />
      <SearchBar />
      <div className={styles.card_container}>
        <SearchResults 
        userSearchResults={searchResults}
         onAdd={addTrack}
         isRemoval={false}
         />

        <Playlist 
        playlistName={playlistName} 
        playlistTracks={playlistTracks}
        isRemoval={true}
        />
      </div>
    </div>
  );
};

export default Home;
