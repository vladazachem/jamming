import React from 'react';

import styles from './Track.module.css';
import '../../style.css';

import minus from './minus.svg';
import plus from './plus.svg';

const Track = (props) => {
    // console.log('isRemoval:', props.isRemoval);
    const renderAction = () => {
        if (props.isRemoval) {
            return (
                <button className={styles.btn}>
                    <img src={minus} alt="Delete" />  
                </button>
            );
        } else {
            return (
                <button className={styles.btn}>
                    <img src={plus} alt="Add"  onClick={passTrack} /> 
                </button>
            );
        }
    };

    const passTrack = () => {
        props.onAdd(props.track);
    };


    return (
        <div className={styles.main}>
            <div className={styles.track_wrap}>
                <h3 className={styles.h3}>{props.track.name}</h3>
                <p>{props.track.artist} | {props.track.album}</p>
            </div>
            {renderAction()}
        </div>
    )
};

export default Track;