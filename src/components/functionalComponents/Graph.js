import React, {useState, useEffect} from 'react';
import Badges from '../layoutComponents/Badges';
import Slider from '../functionalComponents/Slider';
import Spinner from '../layoutComponents/Spinner';
import ArtistDisplay from '../layoutComponents/ArtistDisplay';
import vivaGraphInterface from '../../scripts/vivaGraphInterface';
import graphInterface from '../../scripts/graphInterface';

function Graph(props){
    const [artists, setArtists] = useState("");
    const [recommendedArtists, setRecommendedArtists] = useState("");
    const [loaded, setLoaded] = useState(false);

    async function drawTopArtists(limit){
        let nodes = await fetch(`https://personalwebserver.ddns.net:8080/read/topNodes/${limit}`).then(response => response.json()).catch(error => console.error(error));
        let relationships = await fetch(`https://personalwebserver.ddns.net:8080/read/topRelationships/${limit}`).then(response => response.json()).catch(error => console.error(error));
        if (nodes === undefined) {
            return console.error("Could not contact database");
        }

        let artists = graphInterface.recordsToObj(nodes, 'a');
        //Make graph
        vivaGraphInterface.makeGraph(limit*3/5, artists, relationships, false, value => setLoaded(value));
    }
    
    async function initUserGraph(){
        //setState for artists so that the artistsList components
        //render correctly 
        let artists = await graphInterface.getUserArtists();
        setArtists(artists);
    }

    async function drawUserGraph(vals = artists){
        let ids = vals.map(artist => {
            return `"${artist.id}"`;
        });
        let path = await fetch(`https://personalwebserver.ddns.net:8080/read/getPath/${ids}`).then(response => response.json()).catch(error => console.error(error));
        let nodes = graphInterface.recordsToObj(path, 'name');

        //Get highest recommended artists
        let new_artists_id = nodes.filter(artist => !ids.includes(`"${artist.id}"`));
        let sorted = graphInterface.topRecommendedArtists(new_artists_id, 10);
        let recommendedArtists = [];
        for (let key of Object.keys(sorted)) {
            for (let node of nodes) {
                if (node.id === key) {
                    node.count = sorted[key];
                    node.exists = true;
                    recommendedArtists.push(node);
                    break;
                }
            }
        }
        // console.log(recommendedArtists);
        setRecommendedArtists(recommendedArtists);
        //Make graph
        // console.log(nodes);
        vivaGraphInterface.makeGraph(100, nodes, nodes, true, value => setLoaded(value));
    }

    function handleClick(event){
        if(event.target.textContent === "x"){
            //Delete function
            const {id} = event.target;
            setArtists(prevState => prevState.filter(artist => !(artist.name === id)));
        }else if(event.target.textContent === "+"){
            //Add function
            const {id} = event.target;
            let new_artist = {};
            recommendedArtists.forEach(artist => {
                if(artist.name === id){
                    new_artist = artist;
                }
            });

            setRecommendedArtists(prevState => prevState.filter(artist => !(artist.name === id)));
            setArtists(prevState => [...prevState, new_artist]);
        }
    }

    function handleSlider(value){
        drawTopArtists(value);
    }

    //init
    useEffect(() => {
        if(props.type === "TopArtists"){
            drawTopArtists(100);
        }else if(props.type === "PersonalGraph"){
            if(artists !== ""){
                drawUserGraph();
            }else{
                initUserGraph();
            }
        }
    }, [props.type, artists]);

    return (  
        <div>
            {loaded===false ?
                <Spinner />
                :
                <div className="container">
                    <Badges />
                    <main id="graphContainer"></main>
                    {props.type === "TopArtists" && <Slider handler={handleSlider} /> }
                    {recommendedArtists !== "" && 
                        <ArtistDisplay 
                            artists={artists} 
                            recommended={recommendedArtists} 
                            handleClick={handleClick} 
                        />
                    }            
                </div>
            }
        </div> 
    )
}

export default Graph;

