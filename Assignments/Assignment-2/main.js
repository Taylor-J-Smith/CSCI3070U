var width = 1880,
    height = 940;

var nodeRadius = 2.5,
    nodeGap = 2.5;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var button = svg.append("rect")
              .attr("width", 100)
              .attr("height", 50)
              .attr("rx",10)
              .attr("ry",10)
              .attr("fill", "blue")
              .on("click", function()
                {
                  if(d3.selectAll("circle")[0].length == 0)
                  {
                    queueArray = ["Ken Pu"];
                    graphLinks = [];
                    queueCounter = 0;

                    objArray = [{"name":"Ken Pu","d":0,"p":""}];
                  }

                  if(!(queueCounter >= queueArray.length))
                    _BFS(queueArray[queueCounter], objArray[queueCounter],1);
                })

var buttonText = svg.append("text")
                  .attr("x",10)
                  .attr("y",30)
                  .attr("font-size", 20)
                  .style("pointer-events", "none")
                  .text("BFS Step")

var button2 = svg.append("rect")
              .attr("width", 100)
              .attr("height", 50)
              .attr("rx",10)
              .attr("ry",10)
              .attr("x", 110)
              .attr("fill", "green")
              .on("click", function()
                {
                  while(!(queueCounter >= queueArray.length))
                  {
                    _BFS(queueArray[queueCounter], objArray[queueCounter], 1);
                  }

                  d3.selectAll("circle").attr("fill", "black")
                  d3.selectAll("path").attr("stroke", "black")
                })

var buttonText = svg.append("text")
                  .attr("x",135)
                  .attr("y",30)
                  .attr("font-size", 20)
                  .style("pointer-events", "none")
                  .text("Finish")

var g = svg.append("g")
          .attr("transform", "translate(0," + height/2 + ")")

d3.text("instructor-pairs-csv.txt",function (d){

  array = d.split("\n");

  sourceArray = [];
  destinationArray = [];

  nodesArray = [];
  linksArray = [];

  while(array.length > 1)
  {
    tmp = array[0].split(",");
    sourceArray.push(tmp[0]);
    destinationArray.push(tmp[1]);

    array.splice(0,1);
  }

  if(sourceArray.length != destinationArray.length)
    console.warn("Source and Destination arrays not the same length");

  arrayLength = Math.min(sourceArray.length,destinationArray.length);

  for(var i = 0; i < arrayLength; i++)
  {
    sourceContained = Boolean(nodesArray.indexOf(sourceArray[i]) != -1)
    destinationContained = Boolean(nodesArray.indexOf(destinationArray[i]) != -1)

    if(!sourceContained)
      nodesArray.push(sourceArray[i]);

    if(!destinationContained)
      nodesArray.push(destinationArray[i]);

    linksArray.push({"source":sourceArray[i],"target":destinationArray[i]});
  }

})

function BFS(source, vis)
{
  queueArray = [source];
  graphLinks = [];
  queueCounter = 0;

  objArray = [{"name":source,"d":0,"p":""}];

  while(!(queueCounter >= queueArray.length))
  {
    _BFS(queueArray[queueCounter], objArray[queueCounter]);
  }

  if(vis)
  {
    d3.selectAll("circle").attr("fill", "black")
    d3.selectAll("path").attr("stroke", "black")
  }

  return {"BFSresults": objArray, "nodes": queueArray, "links": graphLinks};
}

function _BFS(sourceName, sourceObj, vis)
{
  children = linksArray.filter(function(d){return d.source == sourceName || d.target == sourceName});
  childrenArray = [];

  for(var i = 0; i < children.length; i++)
  {
    if(children[i].source != sourceName)
      childrenArray.push(children[i].source)

    if(children[i].target != sourceName)
      childrenArray.push(children[i].target)
  }

  for(var j = 0; j < childrenArray.length; j++)
  {
    graphLinks.push(children[j]);

    if(queueArray.indexOf(childrenArray[j]) == -1)
    {
      queueArray.push(childrenArray[j]);
      objArray.push({"name":childrenArray[j],"d":sourceObj.d+1, "p": sourceObj.name})
    }
  }

  if(vis)
  {
    g.selectAll("g")
      .data(objArray)
      .enter().append("g")
        .attr("id", function(d,i){return objArray[i].name.replace(/ /g, "_")})
        .append("circle")
          .attr("r", nodeRadius)
          .attr("fill", "black")
          .attr("cx", function(d,i) {return 5 + (2*nodeRadius*i) + (nodeGap*(i-1))})
          .on("mouseover",function(d,i){ d3.select(this.parentNode).selectAll("path").attr("stroke","red")})
          .on("mouseout",function(d,i){ d3.select(this.parentNode).selectAll("path").attr("stroke","black")})
          .append("title")
            .text(function(d,i) { return queueArray[i]})

    newChildren = [];

    for(var k = 0; k < childrenArray.length; k++)
    {
      if(queueArray.indexOf(sourceName) < queueArray.indexOf(childrenArray[k]))
        newChildren.push(childrenArray[k]);
    }

    d3.selectAll("path")
      .attr("stroke", "black")

    d3.select("#" + sourceName.replace(/ /g, "_"))
      .selectAll("path")
      .data(newChildren)
      .enter().append("path")
        .attr("d", function(d,i)
          {

            sourceLocation = 2.5 + (7.5 * queueArray.indexOf(sourceName))
            destinationLocation = 2.5 + (7.5 * queueArray.indexOf(newChildren[i]))

            dif = destinationLocation - sourceLocation;

            var string = "M " +  sourceLocation + ",0 a " +  dif/2 + "," + dif/2 + " 0 0 1 " + dif + ",0";

            return string;
          })
        .attr("stroke-width", 0.5)
        .attr("fill", "none")
        .attr("stroke", "red")


      d3.selectAll("circle").attr("fill", "black")

      d3.select(d3.selectAll("circle")[0][queueCounter]).attr("fill", "red")
  }

  queueCounter++;
}

function DFS(source)
{
  colour = []
  d = [];
  f = [];
  p = [];

  for(var i = 0; i < nodesArray.length; i++)
  {
    colour[i] = "white";
    d[i] = null;
    f[i] = null;
    p[i] = null;
  }

  time = 0;

  DFS_Visit(source, nodesArray.indexOf(source));

  // for(var j = 0; j <nodes.length; j++)
  // {
  //   if(colour[j] == "white")
  //     DFS_Visit(nodes[j], j)
  // }

  list = [];
  for(var j = 0; j < nodesArray.length; j++)
  {
    if(colour[j] == "black")
      list.push(nodesArray[j]);
  }

  return({"d":d,"f":f,"p":p, "list":list});
}

function DFS_Visit(node, index)
{
  colour[index] = "grey";
  time++;

  d[index] = time;

  var children = linksArray.filter(function(d){return d.source == node || d.target == node});
  var childrenArray = [];

  for(var i = 0; i < children.length; i++)
  {
    if(children[i].source != node)
      childrenArray.push(children[i].source)

    if(children[i].target != node)
      childrenArray.push(children[i].target)
  }

  for(var i = 0; i < childrenArray.length; i++)
  {
    if(colour[nodesArray.indexOf(childrenArray[i])] == "white")
    {
      p[nodesArray.indexOf(childrenArray[i])] = node;
      DFS_Visit(nodesArray[nodesArray.indexOf(childrenArray[i])], nodesArray.indexOf(childrenArray[i]))
    }
  }

  colour[index] = "black";
  time++;
  f[index] = time;

}

function getConnectedComponents(nodes, links)
{
  var nodesCopy = nodes.slice();
  var linksCopy = links.slice();
  var count = 1;

  var connectedComponents = [];

  while(nodesCopy.length > 0)
  {
    var component = BFS(nodesCopy[0]);

    var results = component.BFSresults;

    for(var i = 0; i < results.length; i++)
    {
      nodesCopy.splice(nodesCopy.indexOf(results[i].name),1);
    }

    connectedComponents.push(component);
    count++;
  }

  return connectedComponents;
}

function analyzeConnectedComponents(components)
{
    var radiusArray = [];
    var diameterArray = [];
    var eccentricitiesArray = [];

    for(var i = 0; i<components.length; i++)
    {
      componentEccentricity = getEccentricity(components[i]);

      radiusArray.push(componentEccentricity.min());
      diameterArray.push(componentEccentricity.max());
      eccentricitiesArray.push(componentEccentricity);
    }

    return {"eccentricities": eccentricitiesArray, "radii":radiusArray,"diameters":diameterArray};
}

function getEccentricity(component)
{
  eccentricities = [];

  for(var i = 0; i < component.nodes.length; i++)
  {
    var BFSresults = BFS(component.nodes[i]).BFSresults;

  //  console.log(BFSresults);

    eccentricities.push(BFSresults[BFSresults.length-1].d);
  }

  return eccentricities;
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

// Source: http://stackoverflow.com/questions/1669190/javascript-min-max-array-values
Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

Array.prototype.min = function() {
  return Math.min.apply(null, this);
};
