import React from 'react';

import styles from './SearchBar.module.css';
import '../../style.css';

import search_btn from './search.svg';

const SearchBar = () => {
    return (
        <div className={styles.main}>
            <div className={styles.wrap}>
                <form className={styles.searchInput}>
                    <button className={styles.search_btn}>
                        <img src={search_btn} alt="Search"/>                        
                    </button>
                    <input className={`input ${styles.input}`} type="search" aria-label="searchinput" placeholder="What do you want to find?" />
                </form>
                <div className={styles.btns_section}>
                    <button className={`S_button ${styles.S_button}`}>All</button>
                    <button className={`S_button ${styles.S_button}`}>Artist</button>
                    <button className={`S_button ${styles.S_button}`}>Title</button>
                </div>
            </div>
        </div>
    )
};

export default SearchBar;