/*
Code based on Force directed graph for D3.js v4 with labelled edges and arrows (http://bl.ocks.org/fancellu/2c782394602a93921faff74e594d1bb1) from Dino Fancellu.
*/
var svg = d3.select("#relation-svg");
var width = +svg.attr("width");
var height = +svg.attr("height");
var node;
var link;

/*
https://roshansanthosh.wordpress.com/2016/09/25/forces-in-d3-js-v4/
*/
var attractForce = d3.forceManyBody().strength(80).distanceMax(350)
.distanceMin(200);
var collisionForce = d3.forceCollide(15).strength(15).iterations(100);

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function (d) {return d.id;}).distance(250).strength(1))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2.5, height / 2))
    .force("attractForce",attractForce)
    .force("collisionForce",collisionForce);

d3.json("./data/relation.json", function (error, relation) {
        if (error) throw error;
        update(relation.links, relation.nodes);

    function update(links, nodes) {
    link = svg.selectAll(".link")
        .data(links)
        .enter()
        .append("line")
        .attr("class", "link")

    edgepaths = svg.selectAll(".edgepath")
        .data(links)
        .enter()
        .append('path')
        .attrs({
            'class': 'edgepath',
            'fill-opacity': 0,
            'stroke-opacity': 0,
            'id': function (d, i) {return 'edgepath' + i}
        })
        .style("pointer-events", "none");

    edgelabels = svg.selectAll(".edgelabel")
        .data(links)
        .enter()
        .append('text')
        .style("pointer-events", "none")
        .attrs({
            'class': 'edgelabel',
            'id': function (d, i) {return 'edgelabel' + i},
            'font-size': 10,
            'fill': '#aaa'
        });

    edgelabels.append('textPath')
        .attr('xlink:href', function (d, i) {return '#edgepath' + i})
        .style("text-anchor", "middle")
        .style("pointer-events", "none")
        .attr("startOffset", "50%")
        .text(function (d) {return d.type});

    node = svg.selectAll(".node")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "node")
        .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
        );

    node.append("circle")
        //size depends on the size data.
        .attr("r", function(d) { return (d.size) })
        .style("fill", circleColour)
        
    /* 
    will change the color of depending on the `d.type` of the data.
    https://bl.ocks.org/puzzler10/4438752bb93f45dc5ad5214efaa12e4a
    */
    function circleColour(d){
        if(d.type == "circle"){
            return "white"
        } 
        else {
            return "red";
        }
    }   
    /* 
    on hover on the node's it will show the d.label name
    */    
    node.append("title")
        .text(function (d) {return d.label;});

    var extraInfo = d3.select("#word-fact")
    /* 
    Depending on which type the node is it will show a different text.
    */
    node.append("text")
        .attr("dy", -3)
        .text(function typeText(d){
                if(d.type == "circle"){
                    return d.name;
                } else {
                    return d.label;
                }
                })
        .on("mouseenter", function(d){
            if(d.type == "circle"){
                extraInfo
                .append("text")
                .text( d.extra )
                
                extraInfo
                .select("ul").style("display", "none")
            } 
            else{
                return
            }
            
        })
        .on("mouseleave", function(){
            extraInfo
            .select("text")
            .remove();

            extraInfo
            .select("ul").style("display", "inline-block")
        })

    simulation
        .nodes(nodes)
        .on("tick", ticked);
        

    simulation.force("link")
        .links(links)
        }

    function ticked() {
        link
            .attr("x1", function (d) {return d.source.x;})
            .attr("y1", function (d) {return d.source.y;})
            .attr("x2", function (d) {return d.target.x;})
            .attr("y2", function (d) {return d.target.y;});

        node
            .attr("transform", function (d) {return "translate(" + d.x + ", " + d.y + ")";});


        edgepaths.attr('d', function (d) {
            return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
        });

        edgelabels.attr('transform', function (d) {
            if (d.target.x < d.source.x) {
        var bbox = this.getBBox();

        rx = bbox.x + bbox.width / 2;
        ry = bbox.y + bbox.height / 2;
        return 'rotate(180 ' + rx + ' ' + ry + ')';
            }
            else {
        return 'rotate(0)';
            }
        });
    }

    /* 
    Functions to make the dragging possible
    * dragstarted: Assigns teh position of teh object on start dragging
    * dragged(d): Set new position depending on the mouse position on the screen
    * dragended(d): If is not dragging the position set to null 
    */
    function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart()
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(.03);
           d.fx = null;
           d.fy = null;
       }
})