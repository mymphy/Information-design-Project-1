/*
Code based on the original slider map (http://bl.ocks.org/tomschulze/961d57bd1bbd2a9ef993f2e8645cb8d2) from Tom Schulze.
*/
// variables for the map 
var width = 1500;
var height = 700;
var colorMap = d3.rgb("#F3F1F1"); // grey color
var quantiles = [0, 0.2, 0.4, 0.6, 0.8, 1]; // Range for the legend sort.
var initialYear = 2014;
/* The kind of map that is showed, in this case Equirectangular (Plate Carrée).
Choosed the type of map through https://bl.ocks.org/alexmacy/6700d44240d2b6d3ec9767a5a5854e42
*/
var path = d3.geoPath(d3.geoEquirectangular()
    .scale(850)
    .translate([width / 4, height * 1.6]))

/*
Slider
The slider is here created to navigate through the years.
It contains a type of range with the minimum year of "2005" and maximum of "2016". The value attribute indicates where the slider begins. In this case it is linked to the variable "initialYear" which has a value of "2005".
*/
d3.select("nav").append("input")
.attr("type", "range")
.attr("min", "2014")
.attr("max", "2016")
.attr("value", initialYear)
.attr("id", "year");

/* 
Map container, projection
Selects the container(svg) from the HTML file for the map visualization.
The svgMap contains an id "map" with a specified height and width
*/
var svgMap = d3.select("svg")
.attr("id", "map")
.attr("height", height)
.attr("width", width)

/* 
Legend container
Selects a HTML element and creates a container(svg) for the legend. Inside de legend container it has another two container(g) for the title of the legend and the legend itself.
*/
var legend = d3.select("#js-legend")
.append("svg")
.attr("height", 200)
.attr("width", 200)

legend.append("g")
.attr("class", "legend");

legend.append("g")
.attr("class", "legendTitle")
.append("text")
.text("Depression rates (%)") // ??
.attr("x", 0)
.attr("y", 15);
  
var tooltipMap = d3.select("#js-tooltip-map")
.append("div")
.attr("class", "tooltip");

/*
Data is loaded
- Color is calculated by the data given.
*/ 
d3.json("./data/depression.json", function(error, d) { 
    if (error) throw error; 

    var data_all = d['depression'];

    var data = data_all[initialYear];

    var array = [];
    for( var key of Object.keys(data) ) {
        array.push({'id':key, 'value': data[key]});
    }


    // var dataTotal = data.d.country;
    var color = calcColorScale(data);

    /*
    World map is loaded
    Inside de svgMap a container(g) will be created for the countries in the europe map.  
    - The data used to create the path is added from the topoJson.
    - There is an id added and the id is linked to the country id from "europe/json".
    */
    d3.json("./data/europe.json", function(error, europemap) {
        if (error) throw error;

        /*
        Zoom code based on https://bl.ocks.org/iamkevinv/0a24e9126cd2fa6b283c6f2d774b69a2 by Kevin Vanderbeken.
        .call(zoom): Used for the mouse wheel zoom. 
        svgMap.append("rect"): Created an extra rect to allow the zoom out by clicking outside of the countries. 
        */
        var zoom = d3.zoom()
            .scaleExtent([1, 8])
            .on("zoom", zoomed);
        
        svgMap
        .call(zoom) 
        
        svgMap.append("rect")
        .attr("class", "background")
        .attr("width", width)
        .attr("height", height)
        .on("click", reset);

        var g = svgMap.append("g")
        .attr("class", "countries")
        .selectAll("path")
        .data(topojson.feature(europemap, europemap.objects.europe).features)
        .enter().append("path")
            .attr("d", path)
            .attr("id", function(d) { return d.id; })
            .call(fillMap, color, data)
            .on("click", clicked)
            // .on("mouseover", function(e){d3.select(this).style("fill", "#5522aa")})
            // .on("mouseout", function(e){d3.select(this).call(fillMap, color, data)})
            .on("mousemove", function(d){
                //tooltip
                tooltipMap
                    .style("left", d3.event.pageX + "px")     
                    .style("top",d3.event.pageY - 100  + "px") 
                    .style("display", "inline-block") 
                    .html((d.properties.name) + "<br>" + (data[d.id]) + "%" );  
            })
            .on("mouseout", function(d){ 
                tooltipMap
                    .style("display", "none");
                    /*
                        On mouseout the selected element will set it self back to the
                        original display: none.
                    */
            })
    
        /*
        Calls the function that creates the legend and the bars.
        */
        renderLegend(color, data);

        /*
        Functions for the zoom in and out.
        Function clicked(d): By clicking on one country it will zoom in the map. 
        Function reset(): Map goes back to the normal size.
        */
        function clicked(d) {
        var bounds = path.bounds(d),
            dx = bounds[1][0] - bounds[0][0],
            dy = bounds[1][1] - bounds[0][1],
            x = (bounds[0][0] + bounds[1][0]) / 2,
            y = (bounds[0][1] + bounds[1][1]) / 2,
            scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / width, dy / height))),
            translate = [width / 2 - scale * x, height / 2 - scale * y];
      
        svgMap.transition()
            .duration(750)
            .call( zoom.transform, d3.zoomIdentity.translate(translate[0],translate[1]).scale(scale) );
      }

      function zoomed() {
        g.style("stroke-width", 1.5 / d3.event.transform.k + "px");
        g.attr("transform", d3.event.transform);
      }

      function reset() {
        svgMap.transition()
            .duration(750)
            .call( zoom.transform, d3.zoomIdentity ); 
      }
    });  

    /*
    Function checks if slider is used
    - Updates the color
    - Update the map
    - Updates the legend
    - Updates the bars from the bar chart
    */
    d3.select("#year").on("input", function() {
        var updateColor = calcColorScale(data_all[this.value]);
        updateMap(updateColor, data_all[this.value]);
        renderLegend(updateColor, data_all[this.value]);
    });
});

// FUNCTIONS
/*
fillMap:
- Has three parameters: selection, color and data 
    - selection: The countries of the map
    - color: Which color each country has to have
    - data: The data from the file data.json
- If there is no data found of a country it will get the color gray.
- else it will turn to a specified color.
*/
function fillMap(selection, color, data) {
    selection
        .attr("fill", function(d) { 
            if(typeof data[d.id] === 'undefined'){
                return colorMap 
            }
            else{
                return d3.rgb(color(data[d.id]));
            }
        });
}

/*
updateMap:
- Has two parameters: color and data 
    - color: Which color each country has to have
    - data: The data from the file data.json
- In this function the map will be updated. So the map will be filled again with the new data of the specified year. 
- It also updates the year from the title to the correct one. 
*/
function updateMap(color, data) {
    // fill paths
    d3.selectAll("svg#map path").transition()
        .delay(100)
        .call(fillMap, color, data);

    // update headline
    d3.select(".js-year").text(d3.select("#year").node().value);
}

/*
renderLegend:
- Has two parameters: color and data 
    - color: Which color each country has to have
    - data: The data from the file data.json
-  Creates the legend squares and links it to the color.range().
- Gives the Legend and the bar the same color as the data in the map. The bigger the number how stronger the color will be.
- exit/remove(): Removes the legend when the data changes
- enter(): Adds rect/text for the number of data available.
- The data is determined by pairQuantiles(color.domain());
*/
function renderLegend(color, data) {

    var svgHeight = 160;
    var legendItems = pairQuantiles(color.domain());

    var legend = d3.select("g.legend").selectAll("rect")
        .data(color.range());

    legend.exit().remove();

    legend.enter()
        .append("rect")
        .merge(legend)
        .attr("width", "20")
        .attr("height", "20")
        .attr("y", function(d, i) { return (svgHeight-29) - 25*i; })
        .attr("x", 5)
        .attr("fill", function(d, i) { return d3.rgb(d); })
        .on("mouseover", function(d) { legendMouseOver(d, color, data); })
        .on("mouseout", function() { legendMouseOut(color, data); });

    var text = d3.select("g.legend").selectAll("text");

    text.data(legendItems)
        .enter().append("text").merge(text)
        .attr("y", function(d, i) { return (svgHeight-14) - 25*i; })
        .attr("x", 40)
        .text(function(d, i) { return d; });       
}

/*
calcColorScale:
- Has one parameter: data 
    - data: The data from the file data.json
- This function is used to calculate the color scale of the map.
*/
function calcColorScale(data) {
    // get values and sort
    var data_values = Object.values(data).sort( function(a, b){ return a-b; });

    quantiles_calc = quantiles.map( function(elem) {
        return Math.ceil(d3.quantile(data_values, elem));
    });

    var scale = d3.scaleQuantile()
                .domain(quantiles_calc)
                .range(["#C2BCBC", "#939393", "#696969", "#3f3f3f", "#000"]);
    return scale;
}

// event handlers
/*
legendMouseOver:
When you hover on the legend squares it shows on the map only the countries with the same color. The other countries turn gray. This happens with a transition and a delay of 250.
*/
function legendMouseOver(color_key, color, data) {

    // cancels ongoing transitions (e.g., for quick mouseovers)
    d3.selectAll("svg#map path").interrupt();


    // then we also need to refill the map
    d3.selectAll("svg#map path")
        .call(fillMap, color, data);

    // and fade all other regions
    d3.selectAll("svg#map path:not([fill = '"+ d3.rgb(color_key) +"'])")
        .transition()
        .ease(d3.easeCubic)    
        .delay(250)
        .attr("fill", colorMap);
}
/*
legendMouseOut:
On mouse out the map the countries turn into the normal colors again with a transition and a delay of 300.
*/
function legendMouseOut(color, data) {
    d3.selectAll("svg#map path")
        .transition()
        .ease(d3.easeCubic)    
        .delay(300)
        .call(fillMap, color, data);
}

/* helper functions 
pairs neighboring elements in array of quantile bins
Uses this function to pair the numbers of the legend.
*/
function pairQuantiles(arr) {

    new_arr = [];
    for (var i=0; i<arr.length-1; i++) {

        // allow for closed intervals (depends on d3.scaleQuantile)
        // assumes that neighboring elements are equal
        if(i == arr.length-2) {
        new_arr.push([arr[i],  arr[i+1]]);
        }
        else {
        new_arr.push([arr[i], arr[i+1]-1]);
        }
    }

    new_arr = new_arr.map(function(elem) { return elem[0] === elem[1] ?
        d3.format(",")(elem[0]) :
        d3.format(",")(elem[0]) + " - " + d3.format(",")(elem[1]);
    });

    return new_arr;
}