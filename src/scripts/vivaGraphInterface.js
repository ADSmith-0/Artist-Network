import Viva from 'vivagraphjs';

//Colours for genres
const colours = {
    "dance": "#ff8b8b", //red
    "rap": "#ffd380", //orange
    "latin": "#e1bfff", //purple
    "r&b": "#faf0af",  //"#f5ffa2", //yellow
    "hip hop": "#aaffa2", //green
    "rock": "#ffaef7", //pink
    "pop": "#9fd1ff" //blue
};

const makeGraph = async (timeout, nodes, relationships, fromNodes, isLoaded) => {

    removeGraph();

    initGraph();
    
    addNodesFromObj(nodes);

    if(fromNodes === true){
        addRelationshipsFromNodes(relationships);
    }else{
        addRelationshipsFromRecords(relationships);
    }
    
    styleNodes();
    
    isLoaded(true);

    initRenderer();

    run();

    pauseAfter(timeout);
}  

const prepareGraph = async (nodes, relationships, callback) => {

    removeGraph();

    initGraph();

    addNodesFromObj(nodes);

    addRelationshipsFromRecords(relationships);

    styleNodes();

    initRenderer();
}

const initGraph = () => {
    if(!window.graph){
        window.graph = Viva.Graph.graph();
    }
}

const addNodesFromRecords = (nodes) => {
    for (let node of nodes) {
        window.graph.addNode(
            node._fields['0'].properties.id,
            [node._fields['0'].properties.name,
            node._fields['0'].properties.genres,
            node._fields['0'].properties.popularity]
        );
    }
}

const addRelationshipsFromRecords = (relationships) => {
    for (let rel of relationships) {
        try {
            window.graph.addLink(
                rel._fields['0'].properties.id,
                rel._fields['1'].properties.id
            );
        } catch (error) {
            console.error(error);
        }
    }
}

const addNodesFromObj = (nodes) => {
    for(let node of nodes){
        try {
            window.graph.addNode(
                node.id,
                [node.name,
                node.genres,
                node.popularity]
            );
        }catch (error) {
            console.error(error);
        }
    }
}

const addRelationshipsFromNodes = (nodes) => {
    for(let i = 0; i < nodes.length; i++){
        // if(nodes[i].exists === true && nodes[i+1].exists === true){
            try{
                window.graph.addLink(
                    nodes[i].id,
                    nodes[(i+1)%nodes.length].id //wrap array around for final relationship
                );
            }catch (error){
                console.error(error);
            }
        // }
    }
}

const styleNodes = () => {
    window.graphics = Viva.Graph.View.svgGraphics();
    let nodeSize = 12;
    let node_colour = "white";

    window.graphics.node(node => {
        let ui = Viva.Graph.svg('g');

        for (let genre in colours) {
            try {
                if (node['data'][1].includes(genre)) {
                    node_colour = colours[genre];
                    break;
                }
            } catch (error) {
                console.error(error);
                node_colour = "white";
            }
        }

        let circle = Viva.Graph.svg('circle')
            .attr('width', nodeSize)
            .attr('height', nodeSize)
            .attr('fill', node_colour)
            .attr('r', nodeSize);

        let label = Viva.Graph.svg('text')
            .text(node['data'][0])
            .attr('fill', 'black')
            .attr('font-size', 5)
            .attr('letter-spacing', 0.1)
            .attr('x', -(node['data'][0].length / 2) * 2.6)
            .attr('y', 1);

        ui.append(circle);
        ui.append(label);
        return ui;
    }).placeNode((nodeUI, pos) => {
        nodeUI.attr('transform',
            `translate(${(pos.x - nodeSize / 2)}, ${(pos.y - nodeSize / 2)})`);
    });
}

const initRenderer = () => {
    window.renderer = Viva.Graph.View.renderer(window.graph, {
        container: document.getElementById('graphContainer'),
        graphics: window.graphics
    });
}

const run = () => {
    window.renderer.run();
}

const pauseAfter = (time) => {
    window.setTimeout(() => window.renderer.pause(), time * 30);
}

const removeGraph = () => {
    if (!window.renderer) {
        return;
    }

    window.graph = null;

    window.renderer.dispose(); // remove the graph
    window.renderer = null;
}

export default { makeGraph, removeGraph, initGraph, addNodesFromRecords, addRelationshipsFromRecords, addNodesFromObj, addRelationshipsFromNodes, styleNodes, initRenderer, run, pauseAfter, prepareGraph};

