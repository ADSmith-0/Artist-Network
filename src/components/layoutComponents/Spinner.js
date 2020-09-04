import React from 'react';
import spinner from './tail-spin.svg';

function Spinner(props) {
    return (
        <div className="spinner">
            <p>Loading Graph</p>
            <img src={spinner} alt="Loading spinner"/>
        </div>
    )
}

export default Spinner;
