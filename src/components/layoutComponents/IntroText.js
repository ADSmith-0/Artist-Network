import React from 'react';

function IntroText() {
    return (
        <div id="introText">
            <h3>Welcome to the Artist Network</h3>
            <p>
                This web app seeks to help you visualise Spotify artists and how they relate to one
                another. It can help you discover artists based on your music taste. To start: select
                a page from the navbar above.
            </p>
            <br/>
            <ul>
                <li><span className="listHeader">Home</span> - Current page, explanation of what the different pages do.</li>
                <li><span className="listHeader">Top Artists</span> - Display the top X amount of artists on Spotify and how 
                    they relate to each other</li>
                <li><span className="listHeader">Personal Graph</span> - After logging in to Spotify and giving the app permission
                    it will read your top 10 most listened to artists and create a graph based
                    on them. At the bottom of the page the left list will tell you your most 
                    listened to artists from 1 to 10. The X button will delete them if you
                    don't want them included in the recommendation algorithm. If they have 
                    a grey line through their name then they are not in the database. This is 
                    usually because their popularity score is too low, but sometimes it's because 
                    they were overlooked. The list on the right will let you add your recommended 
                    artists to the recommendation algorithm.
                </li>
                <li><span className="listHeader">About</span> - A description of how the app works and how it was made.</li>
            </ul>
            <br/>
            <p>Note - The graphs may be slow to load based on the data.</p>
            <br/>
            <p>Thank you for visiting Artist Network!</p>
        </div>
    )
}

export default IntroText;
