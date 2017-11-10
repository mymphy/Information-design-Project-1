var backgroundDiv = document.getElementById("background");
var mapGraph = document.getElementById("map-graph");
var genderGraph = document.getElementById("gender-graph");
var relationGraph = document.getElementById("relation-graph");
var startBut = document.getElementById("start");
var previousBut = document.getElementById("previous");
var nextBut = document.getElementById("next");

d3.select("#start").on("click", startGraph);
d3.select("#previous").on("click", previous);
d3.select("#next").on("click", next);

//Start section
function startGraph(){
    if((mapGraph.classList = "hidden") && (genderGraph.classList = "hidden")){
        startBut.classList.add("hidden");
        backgroundDiv.classList.add("opacity")
        mapGraph.classList.add("show");
        nextBut.classList.remove("hidden");
    }
}

//Button to go to previous graph
function previous(){
    if(genderGraph.classList == "hidden show"){
        mapGraph.classList.add("show");
        genderGraph.classList.remove("show");
        previousBut.classList.add("hidden");
    }
    else if(relationGraph.classList == "hidden show"){
        console.log(genderGraph.classList)
        genderGraph.classList.add("show");
        relationGraph.classList.remove("show");
    }
    else{
        return
    }
}

//Button to go to the next graph
function next(){
    if(mapGraph.classList == "hidden show"){
        mapGraph.classList.remove("show");
        previousBut.classList.remove("hidden");
        genderGraph.classList.add("show");
    }
    else if(genderGraph.classList == "hidden show"){
        genderGraph.classList.remove("show");
        relationGraph.classList.add("show");    
    }
    else{
        relationGraph.classList.remove("show");
        startBut.classList.remove("hidden");
        nextBut.classList.add("hidden");
        previousBut.classList.add("hidden");
    }
}