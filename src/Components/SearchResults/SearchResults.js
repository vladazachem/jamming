import React from 'react';

import styles from './SearchResults.module.css';
import '../../style.css';

import Tracklist from '../Tracklist/Tracklist';

const SearchResults = () => {
    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <h3>Results</h3>
                <h4>Here, you can find all the music you're looking for.</h4>
            </div>
            <div className={styles.tracklist_results}>
                <Tracklist />
            </div>
        </div>
    )
};

export default SearchResults;