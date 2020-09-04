import React from 'react';

function Artist(props) {

    const isDisabled = {
        textDecoration: "line-through",
        fontStyle: "italic",
        color: "#555" 
    }


    return (
        <div className="artist">
            <span style={!props.exists ? isDisabled : null}>{props.number}{props.type === "delete" ? "." : "%"} {props.name}</span>
            {props.exists &&
                <button
                    id={props.name} 
                    className="functionalButton"
                    style={{ backgroundColor: props.type === "delete" ? "#f33" : "#33f"}}
                    onClick={props.handleClick}
                >{props.type === "delete" ? "x" : "+"}</button>
            }         
        </div>
    )
}

export default Artist;
