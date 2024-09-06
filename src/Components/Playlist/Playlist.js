import React from 'react';

import styles from './Playlist.module.css';
import '../../style.css';

import Tracklist from '../Tracklist/Tracklist';

const Playlist = (props) => {
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
                 />
            </div>
            <div className={styles.inputSection}>
                <div className={`inputWrap ${styles.inputWrap}`}>
                    <input className={`input ${styles.input}`} type="text" aria-label="playlistname" placeholder="Add a name..." />
                </div>
                <div className={styles.btn_wrap}>
                    <button className={`S_button`}>Add</button>
                    <button className={`S_button ${styles.S_button}`}>Clear</button>
                </div>
            </div>
        </div>
    )
};

export default Playlist;