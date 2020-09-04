import React from 'react';
import Header from './Header';
import Navbar from '../functionalComponents/Navbar';

function HeaderAndNavbar(props) {
    return (
        <div id="headerAndNavbar">
            <Header msg={props.msg}/>
            <Navbar />
        </div>
    )
}

export default HeaderAndNavbar;
