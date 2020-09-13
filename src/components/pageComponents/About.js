import React from 'react';
// import Header from '../layoutComponents/Header';
// import Navbar from '../functionalComponents/Navbar';
import HeaderAndNavbar from '../layoutComponents/HeaderAndNavbar';
import AboutBody from '../layoutComponents/AboutBody.js';

function About() {
    return (
        <div>
            <HeaderAndNavbar msg="About"/>
            <AboutBody />
        </div>
    )
}

export default About;
