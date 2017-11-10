// Original Grounped Bar Chart https://bl.ocks.org/mbostock/3887051 made with d3js by Mike Bostock

var svg = d3.select("#gender-svg"), //select the svg used for the chart
margin = {top: 60, right: 500, bottom: 150, left: 50}, 
width = +svg.attr("width") - margin.left - margin.right,
height = +svg.attr("height") - margin.top - margin.bottom,
g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
// append = used to create, append and select new elements https://github.com/d3/d3-selection/blob/master/README.md#selection_append

// scaleBand = used to create an ordinal band scale https://github.com/d3/d3-scale/blob/master/README.md#scaleBand
// Constructs a new band scale with the empty domain, the unit range [0, 1], no padding, no rounding and center alignment.
var x0 = d3.scaleBand()
.rangeRound([0, width])
.paddingInner(0.1);

var x1 = d3.scaleBand()
.padding(0.05);

//  scaleLinear = used to create a quantitative linear scale https://github.com/d3/d3-scale/blob/master/README.md#scaleLinear
var y = d3.scaleLinear()
.rangeRound([height, 0]);

// scaleOrdinal = used to create an ordinal scale https://github.com/d3/d3-scale/blob/master/README.md#scaleOrdinal
// In this situation the ordinal scale makes use of colors.
var z = d3.scaleOrdinal()
.range(["#636363", "#bdbdbd"]);

//Tooltip 
var tooltip = d3.select("#js-tooltip-gender")
.append("div")
.attr("class", "tooltip");

// function to get the data out of the csv
d3.csv("./data/gender.csv", function(d, i, columns) {
for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
return d;
}, function(error, data) {
if (error) throw error;

var keys = data.columns.slice(1);
// divides the area specified by x0, y0, x1, y1 vertically according the value of each of the specified children
x0.domain(data.map(function(d) { return d.country; }));
x1.domain(keys).rangeRound([0, x0.bandwidth()]);
y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

g.append("g")
.selectAll("g")
.data(data)
.enter().append("g")
  .attr("transform", function(d) { return "translate(" + x0(d.country) + ",0)"; })
.selectAll("rect")
.data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
.enter().append("rect")
  .attr("x", function(d) { return x1(d.key); })
  .attr("y", function(d) { return y(d.value); })
  .attr("width", x1.bandwidth())
  .attr("height", function(d) { return 340 - y(d.value); })
  .attr("fill", function(d) { return z(d.key); })
  .style("stroke", "white") 
  .on("mousemove", function(d){
    g.style("fill", "white")
    //tooltip
    tooltip
    // /http://bl.ocks.org/juan-cb/ac731adaeadd3e855d26  d3.event.pageX/d3.event.pageY
        .style("left", d3.event.pageX + "px")       
        .style("top",d3.event.pageY - 50  + "px")  
        .style("display", "inline-block") 
        .html(( d.value + "%"))
        
})
.on("mouseout", function(d){ 
    tooltip
        .style("display", "none");
})
  
var xAxis = g.append("g")
  .attr("class", "x-axis")
  .attr("transform", "translate(0," + 340 + ")")
  .call(d3.axisBottom(x0))
  
xAxis.selectAll("text")
    .attr("y", 6)
    .attr("x", -10)
    .attr("dy", ".35em")
    .attr("transform", "rotate(300)")
    .style("text-anchor", "end")
  
xAxis.append("text") // Add text 
.attr("class", "label") // Add class element with the name of "label".
.attr("transform", "rotate(0)") // rotates element -90grades
.attr("x", width + 10 + "px")// Set y position
.attr("y", 15)
.style("text-anchor", "start") 
.text("Countries") // The text that will be shown. 

// title position and layout
g.append("g")
  .attr("class", "y-axis")
  .call(d3.axisLeft(y).ticks(null, "s"))
.append("text") // Add text 
    .attr("class", "label") // Add class element with the name of "label".
    .attr("x", 0) // Set y position
    .attr("y", -15)
    .text("%"); // The text that will be shown.
  
// legend text layout
var legend = g.append("g")
  .attr("font-family", "sans-serif")
  .attr("font-size", 10)
  .attr("text-anchor", "end")
.selectAll("g")
.data(keys.slice())
.enter().append("g")
  .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

// legend squares
legend.append("rect")
  .attr("x", width + 60)
  .attr("width", 19)
  .attr("height", 19)
  .attr("fill", z)
  .style("stroke", "white")

// legend text position
legend.append("text")
  .attr("x", width + 55)
  .attr("y", 9.5)
  .attr("dy", "0.32em")
  .text(function(d) { return d; });
});

