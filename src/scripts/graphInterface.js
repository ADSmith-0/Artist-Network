import authInterface from './spotifyAuthInterface';

async function getUserArtists() {
    let top10 = await authInterface.returnTop10Artist();
    let artists = top10.items.map(artist => {
        return {
            "id": artist.id,
            "name": artist.name,
            "genres": artist.genres,
            "popularity": artist.popularity,
            "exists": true
        }
    });

    let ids = artists.map(artist => `"${artist.id}"`);
    let result = await fetch(`https://personalwebserver.ddns.net/read/doesExist/${ids}`).then(response => response.json()).catch(error => console.error(error));

    let existing_ids = result.map(a => a._fields['0'].properties.id);
    let final_artists;
    if (!(existing_ids.length === ids.length)) {
        final_artists = artists.map(artist => {
            if (!(existing_ids.includes(artist.id))) {
                artist.exists = false;
                return artist;
            }
            return artist;
        });
    } else {
        final_artists = artists.map(artist => artist);
    }
    return final_artists;
}

const recordsToObj = (nodes, key) => {
    let result = [];
    nodes.forEach(artist => 
        result.push({
            "id": artist._fields['0'].properties.id,
            "name": artist._fields['0'].properties.name,
            "genres": artist._fields['0'].properties.genres,
            "popularity": artist._fields['0'].properties.popularity
        })
    );

    return result;
}

const count = (artists) => {
    let result = [];
    artists.forEach(artist => {
        Object.keys(result).includes(artist.id) ? result[artist.id] = result[artist.id] + 1 : result[artist.id] = 1
    });
    return result;
}

const sort = (artists) => {
    let result = {};
    for(let i = 16; i > 0; i--){
        for(let val of Object.keys(artists)){
            if(artists[val] === i){
                result[val] = i;
            }
        }
    }

    return result;
}

const cull = (artists, cutoff) => {
    let result = {};
    let counter = 1;

    for(let id of Object.keys(artists)){
        if(counter <= cutoff){
            result[id] = artists[id]
        }else{
            break;
        }  
        counter++;
    }
    return result;
}

const topRecommendedArtists = (artists, cutoff) => {
    let counted = count(artists);
    let sorted = sort(counted);
    let result = cull(sorted, cutoff);
    return result;
}

export default {getUserArtists, recordsToObj, count, sort, topRecommendedArtists};