import React from 'react';
import Artist from './Artist.js';

function ArtistList(props) {
    let counter = 0;
    let list = props.artists.map(artist => {
        counter++;
        return <Artist 
            key={artist.id} 
            number={props.type ==="delete" ? counter : (artist.count/16)*100}
            name={artist.name} 
            exists={artist.exists} 
            type={props.type}
            handleClick={props.handleClick}
        />
    });

    return (
        <div className="artistList">
            <h2 id="artistListHeader">{props.type === "delete" ? "Remove artist" : "Add recommended"}</h2>
            {list}
        </div>
    )
}

export default ArtistList;
