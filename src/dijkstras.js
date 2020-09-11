// https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#Algorithm

let openNodes = [];
let visited = [];
let finalPath = []

const dijkstrasAlgorithm = (nodes) => {
  let start;
  let end;
  let currentNode;

  // search for the start and end nodes
  nodes.forEach(row => {
    row.forEach(node => {
      if (node.isStart) {
        start = node;
      } else if (node.isEnd) {
        end = node;
      }
    })
  });

  start.g = 0;

  if (!visited.includes(start)) {
    openNodes = [];
    visited = [];
    finalPath = [];
    start.isOpen = true;
    openNodes.push(start);
    currentNode = start;
  }

  if (openNodes.length > 0) {
    let lowestIdx = 0;
    currentNode;
    // loop through openNodes to find the lowest g to get currentNode
    openNodes.forEach((node, i) => {
      if (node.g < openNodes[lowestIdx].g) {
        lowestIdx = i;
      }
    })

    currentNode = openNodes[lowestIdx];
    // if currentNode is end node, search is done so draw the resulting path
    if (currentNode === end) {
      finalPath.push(currentNode);
      while (currentNode.cameFrom) {
        currentNode.isPath = true;
        finalPath.push(currentNode.cameFrom);
        currentNode = currentNode.cameFrom;
      }

      return true;
    }

    currentNode.connectedNodes.forEach(neighbor => {
      // Add currentNode's g and the weight of the neighbor to check if tentative is 
      // less than the current neighbor's g. Replace if it is.
      if (!visited.includes(neighbor) && !neighbor.isWall) {
        const tentative = currentNode.g + neighbor.weight;
        if (tentative < neighbor.g) {
          neighbor.g = tentative;
          neighbor.cameFrom = currentNode;
        }
        
        neighbor.isOpen = true;
        if (!openNodes.includes(neighbor)) {
          openNodes.push(neighbor);
        }
      }
    })

    currentNode.isOpen = false;
    currentNode.visited = true;
    openNodes.splice(lowestIdx, 1);
    visited.push(currentNode);

  } else {
    // there's no path so return true to stop the loop
    return true;
  }
}

export default dijkstrasAlgorithm;