var width = 1900,
    height = 950;

var nodeRadius = 2.5,
    nodeGap = 2.5;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var g = d3.select("svg")
          .append("g")
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

  // for(var k = 0; k < linksArray.length; k++)
  // {
  //   dups = linksArray.filter(function(d){return d[0] == destinationArray[k]}).filter(function(d){return d[1] == sourceArray[k]})
  //
  //   if(dups.length > 0)
  //   {
  //     array.splice(k,1);
  //
  //     console.log(k);
  //
  //     k--;
  //   }
  // }

  // for(var j = 0; j < nodesArray.length; j++)
  // {
  //   nodesArray[j] = {"name":nodesArray[j]};
  // }

  // copy = nodesArray.slice();
  // components = 0;
  //
  // console.log(copy.length);
  //
  // while(copy.length !=0)
  // {
  //   BFS(copy[0]);
  //
  //   for(var i = 0; i < queueArray.length; i++)
  //   {
  //     if(copy.indexOf(queueArray[i]) != -1)
  //       copy.splice(copy.indexOf(queueArray[i],1))
  //   }
  //
  //   components++;
  // }
  //
  // console.log(components);

})

function BFS(source)
{
  queueArray = [source];
  queueCounter = 0;

  objArray = [{"name":source,"d":0,"p":""}];

  while(!(queueCounter > queueArray.length))
  {
    _BFS(queueArray[queueCounter], objArray[queueCounter]);
  }

  return objArray
}

function _BFS(sourceName, sourceObj)
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
    if(queueArray.indexOf(childrenArray[j]) == -1)
    {
      queueArray.push(childrenArray[j]);
      objArray.push({"name":childrenArray[j],"d":sourceObj.d+1, "p": sourceObj.name})
    }
  }

  g.selectAll("circle")
    .data(objArray)
    .enter().append("circle")
      .attr("r", nodeRadius)
      .attr("fill", "black")
      .attr("cx", function(d,i) {return (2*nodeRadius*i) + (nodeGap*(i-1))})

  queueCounter++;
}

function DFS(source)
{

}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
