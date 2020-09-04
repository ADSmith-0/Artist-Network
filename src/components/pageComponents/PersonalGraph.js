import React from 'react';
import HeaderAndNavbar from '../layoutComponents/HeaderAndNavbar';
import Graph from '../functionalComponents/Graph';
import Login from '../functionalComponents/LoginButton';

function PersonalGraph() {
    return (
        <div>
            <HeaderAndNavbar msg="Personal Graph"/>
            {window.location.hash.substr(1) !== "" ? <Graph type="PersonalGraph"/> : <Login />}
        </div>
    )
}

export default PersonalGraph;
