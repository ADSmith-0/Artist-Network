import React from 'react';
import {Link} from 'react-router-dom';

function Navbar(){
    return (
        <div>
            <nav id="navbar">
                <ul>
                    <li><Link className="navigation" exact="true" to="/">Home</Link></li>
                    <li><Link className="navigation" to="/TopArtists">Top Artists</Link></li>
                    <li><Link className="navigation" to="/PersonalGraph">Personal Graph</Link></li>
                    <li><Link className="navigation" to="/About">About</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;