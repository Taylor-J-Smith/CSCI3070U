In order to run part B a server must be setup to allow cross-origin requests. This can be done using the command:

python -m SimpleHTTPServer

The file must then be accessed on localhost:8000/main.html or 127.0.0.1:8000/main.html

The following changes have been made to the given dataset and are reflected in the file instructor-pairs-csv.txt:

  Converted to CSV format from given format.
  "'" have been removed from all names to allow for valid HTML id names
  "." have been removed from all names to allow for valid HTML id names

Unfortunately at this time due to time constraints only BFS is visualized.

To view the visualization either click the BFS Step button to view the next step of the algorithm, or click the finish button to jump right to the end.

At any point a node can be hovered to display the professor name and highlight all links coming out of it. To avoid redundant background links, links are only shown going left to right.

If BFS is called from the console either directly or indirectly during the visualization process the visualization buttons will no longer work.

Functions for Part B can be accessed as follows:

  1. BFS("Ken Pu"), results can be seen in the BFSresults of the returned object. Lists all connected professors, their distance from Ken and their predecessor. Includes Ken so connected professors is one less than the length of the array.
  2. DFS("Ken Pu"), results can be seen in the list of the returned object. Returned object contains the discovery time, the finish time and the predecessor for all nodes visited.
  3. getConnectedComponents(nodesArray, linksArray), returns an array of all connected components, each entry has all the nodes and links associated with that component as well as the results of BFS on one of the elements.
  4. analyzeConnectedComponents(getConnectedComponents(nodesArray,linksArray)), returns an object with eccentricities, radii and diameters of all connected components. Number of verticies is equal to the length of the eccentricities array.

Developed and tested on Linux with Google Chrome. When ported over to a Windows environment returned results were incorrect.

Sorry for the code quality :( 
