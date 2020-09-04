import React from 'react';
import ArtistList from '../functionalComponents/ArtistList';

function ArtistDisplay(props) {
    return (
        <div id="artistDisplay">
            <ArtistList artists={props.artists} type="delete" handleClick={props.handleClick}/>
            <ArtistList artists={props.recommended} type="add" handleClick={props.handleClick}/>
        </div>
    )
}

export default ArtistDisplay;
