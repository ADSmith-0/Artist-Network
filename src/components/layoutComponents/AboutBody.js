import React from 'react';

function AboutBody() {
    return (
        <div id="aboutPage">
            <h3 id="about-title">About this app</h3>
            <br/>
            <h4 className="aboutSubheading">What was the purpose of this app?</h4>
            <p className="aboutParagraph">
                This app was mainly designed as a proof of concept. The original idea came 
                as part of a previous project, which required us to mathematically represent 
                how similar two artists were. With seemingly no solutions already available, 
                I decided to build it into a standalone application. Searching on Google for 
                “finding similar artists” gives you solutions that will mostly provide either 
                the related artists that Spotify provides and/or will only allow you to search 
                for one artist. With this in mind I thought that it would be a good project to 
                further develop.
            </p>
            <br/>
            <h4 className="aboutSubheading">What is it made with?</h4>
            <p className="aboutParagraph">
                <ul>
                    <li><a href="https://developer.spotify.com/documentation/web-api/" target="_blank" rel="noopener noreferrer">Spotify API</a> - which provides the artists’ data.</li>
                    <li><a href="https://neo4j.com/" target="_blank" rel="noopener noreferrer">Neo4j</a> - which holds the data and performs mathematical operations on it</li>
                    <li><a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React.js</a> - which is what the website is designed and run using (React DOM handles navigation).</li>
                    <li><a href="https://github.com/anvaka/VivaGraphJS" target="_blank" rel="noopener noreferrer">VivaGraph.js</a> - which handles the drawing and rendering of the graphs that you see in Top Artists and Personal Graphs.</li>
                </ul>
            </p>
            <br/>
            <h4 className="aboutSubheading">How does it work?</h4>
            <p className="aboutParagraph"> 
                The spotify API is what the entire app hinges on. This is an endpoint that 
                Spotify provides that you can call to retrieve all sorts of information, for 
                example: information about an artist, which artists are similar to a certain 
                artist, an album, a specific track, and much more. I wrote a script that would 
                recursively find related artists, starting at any artist I choose. This is how 
                the database was built.
            </p>
            <p className="aboutParagraph">
                How do I have a database that stores every single artist on Spotify? I don’t. 
                I use a mathematical trick to greatly reduce the number of artists that I need to 
                have in my database. If I had to store every artist this would be millions of records, 
                and would be a lot of data to store. Thanks to the <a href="https://en.wikipedia.org/wiki/Pareto_distribution" target="_blank" rel="noopener noreferrer">pareto distribution</a> I can 
                cut the number of records I store by a lot.
            </p>
            <p className="aboutParagraph">
                The pareto distribution, which is more colloquially referred to as the 80-20 rule, 
                states that with a lot of events that involve humans 80% of the effects come from 
                20% of the causes. For example: if there were a charity auction it wouldn’t be 
                surprising for 80% of the funds raised to come from 20% of the donors, or if you 
                have a team to work with 20% of the team members are likely to do 80% of the workload. 
                This is widely applicable and therefore it can be applied to Spotify artists. So we 
                only need roughly 20% of the artists to get 80% of the streams. 80% of the streams 
                mean that they’re likely to be on many users' top listened to artists’ list. The 
                database currently holds 18,300 artists.
            </p>
            <p className="aboutParagraph">
                The reason that the database holds such a small number of artists is because an 
                artist is only added to the database if they have a popularity above, or equal to, 
                50. The popularity score is something that Spotify assigns each artist and therefore 
                I’m not exactly sure what the formula is. Handling the database this way helps to 
                keep it small, but effective.
            </p>
            <p className="aboutParagraph">
                The Top Artists are pulled with a simple database query getting the highest popularity 
                scores and how they are related. The personal graph is built by taking the users’ top 10 
                artists and using <a href="https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm" target="_blank" rel="noopener noreferrer">Dijkstra’s Shortest Path</a> on them. 
                The recommended artists are the artists which make up the paths in between them. 
                The recommended artists are then counted for how many times they appear. This number 
                is then taken as a percentage out of how many times the top 10 artists appear. For 
                example, if your top 10 artists appear 10 times during the algorithm, and a recommended 
                artist appears 8 times, then the match percentage would be 80%.
            </p>
            <br/>
            <h4 className="aboutSubheading">Will this be expanded upon in the future?</h4>
            <p className="aboutParagraph">
                Possibly. I would like to have <a href="https://en.wikipedia.org/wiki/Create,_read,_update_and_delete" target="_blank" rel="noopener noreferrer">CRUD operations</a> for the database. I would 
                also like to have a way to build a graph from scratch, so it doesn’t have to 
                rely on your Spotify history. It would also be nice to extend this into an API 
                so that any other programs that may want to use artist similarity or artist shortest paths 
                would have an easy way to do so. That being said this would likely be very niche.
            </p>

        </div>
    )
}

export default AboutBody;
