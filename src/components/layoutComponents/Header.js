import React from 'react';

function Header(props){
    return (
        <header id="mainHeader">
            {props.msg !== undefined ? props.msg : "Welcome to the Artist Network"}
        </header>
    )
}

export default Header;