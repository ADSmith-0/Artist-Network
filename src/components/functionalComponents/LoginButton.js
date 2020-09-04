import React from 'react';
import spotify_logo from '../../images/spotify_logo.png';

function LoginButton() {

    function handleClick(){
        let auth_url = new URL("https://accounts.spotify.com/authorize");
        let auth_params = {
            "client_id": process.env.REACT_APP_CLIENT_ID,
            "response_type": "token",
            "redirect_uri": "http://localhost:3000/PersonalGraph/",
            "scope": "user-top-read"
        };
        auth_url.search = new URLSearchParams(auth_params).toString();
        window.location.replace(auth_url);
    }

    return (
        <div id="loginForm">
            <span id="label">Log in to spotify to continue</span>
            <button 
                id="loginBtn" 
                className="button"
                onClick={handleClick}
            >
                <img
                    src={spotify_logo}
                    alt="Spotify logo"
                    height="25px"
                    width="25px"
                />
                <span>Login</span>
            </button>
            
        </div>
    )
}

export default LoginButton;
