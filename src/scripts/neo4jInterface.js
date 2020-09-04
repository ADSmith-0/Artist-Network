const neo4j = require('neo4j-driver');

const dbQuery = async (query) => {
    let driver = neo4j.driver(process.env.REACT_APP_NEO4J_URL, neo4j.auth.basic(process.env.REACT_APP_NEO4J_USERNAME, process.env.REACT_APP_NEO4J_PASSWORD));
    let session = driver.session();

    let results = await session.run(
        query
    );

    session.close()
    driver.close();

    return results.records;
}

const returnTopNodes = async (limit) => {
    return await dbQuery(`MATCH (a:artist) return a order by a.popularity DESC LIMIT ${limit}`);
}

const returnTopRelationships = async (limit) => {
    return await dbQuery(
        `call{
            match (a) return a order by a.popularity desc limit ${limit}
        }
        call {
            match (b) return b order by b.popularity desc limit ${limit}
        }
        with a,b
        match (a)--(b)
        return distinct a,b`
    );
}

const doesExist = async (artists) => {
    return await dbQuery(
        `unwind [${artists}] as x
        match (a:artist {id: x})
        return a`
    );
}

const getPath = async (artists) => {
    return await dbQuery(
        `unwind [${artists}] as x //ids
        call {
            with x
            unwind [${artists}] as y //ids
            match(a:artist {id: x})
            match(b:artist {id: y})
            call gds.alpha.shortestPath.stream({
                nodeProjection: 'artist',
                relationshipProjection: {
                            SIMILAR: {
                            type: 'similar',
                            orientation: 'UNDIRECTED'
                            }
                    },
                startNode: a,
                endNode: b
            })
            yield nodeId, cost
            return gds.util.asNode(nodeId) as name, cost
        }
        return name, cost`
    );
}

export default { returnTopNodes, returnTopRelationships, doesExist, getPath};
