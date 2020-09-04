const getFragmentKeys = () => {
    let keys = {};
    let fragments = window.location.hash.substr(1).split("&");
    for (let frag of fragments) {
        let separate_frags = frag.split("=");
        keys[separate_frags[0]] = separate_frags[1];
    }
    return keys;
}

const returnTop10Artist = async () => {
let keys = getFragmentKeys();

    let options = {
        method: "GET",
        headers: {
            'content-type': 'application/json',
            'Authorization': keys['token_type'] + " " + keys['access_token']
        }
    };
    let results = await fetch("https://api.spotify.com/v1/me/top/artists?limit=10", options)
        .then(res => res.json())
        .catch(error => console.error(error));

    return results;
}

export default {returnTop10Artist};