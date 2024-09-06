import React from 'react';

import styles from './Tracklist.module.css';
import '../../style.css';

import Track from '../Track/Track';

const Tracklist = (props) => {
    // console.log('userSearchResults in Tracklist:', props.userSearchResults);

    // useEffect(() => {
    //     console.log('props.userSearchResults inside useEffect:', props.userSearchResults);
    // }, [props.userSearchResults]);

    // console.log('isRemoval in Tracklist:', props.isRemoval);

    return (
        <div className={styles.main}>
            {props.userSearchResults && props.userSearchResults.length > 0 ? (
                props.userSearchResults.map((track) => (
                    <Track
                        track={track}
                        key={track.id}
                        onAdd={props.onAdd}
                        isRemoval={props.isRemoval}
                    />
                ))
            ) : (
                <p>No tracks found</p>
            )}
        </div>
    );
};

export default Tracklist;
