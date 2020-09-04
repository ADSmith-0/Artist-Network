import React from 'react';
import HeaderAndNavbar from '../layoutComponents/HeaderAndNavbar';
import Graph from '../functionalComponents/Graph';

function TopArtists() {
    return (
        <div>
            <HeaderAndNavbar msg="Top Artists"/>
            <Graph type="TopArtists"/>
        </div>
    )
}

export default TopArtists;