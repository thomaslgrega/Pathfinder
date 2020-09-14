// https://en.wikipedia.org/wiki/A*_search_algorithm#Pseudocode

import pythagoreanTheorem from "./pythagoreanTheorem";
import manhattanDistance from "./manhattanDistance";

let openNodes = [];
let visited = [];
let finalPath = []

const aStarAlgorithm = (nodes) => {
  let start;
  let end;

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

  if (!visited.includes(start)) {
    openNodes = [];
    visited = [];
    finalPath = [];
    start.isOpen = true;
    openNodes.push(start);
  }

  if (openNodes.length > 0) {
    let lowestIdx = 0;
    let currentNode;
    // loop through openNodes to find the lowest f to get next node to traverse 
    openNodes.forEach((node, i) => {
      if (node.f < openNodes[lowestIdx].f) {
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

    // remove node from open Nodes list and add it to the visited nodes list
    currentNode.isOpen = false;
    currentNode.visited = true;
    openNodes.splice(lowestIdx, 1);
    visited.push(currentNode);
    // check all connected nodes for their g, h and f
    currentNode.connectedNodes.forEach(connectedNode => {
      let newG = currentNode.g + 1;

      let betterPath = false;
      if (!visited.includes(connectedNode) && !connectedNode.isWall) {
        // if neighbor is NOT in the visited nodes list but in the open nodes list
        if (openNodes.includes(connectedNode)) {
          // and the newG is less than the current g of the neighbor, replace it with the newG.
          // meaning this new path to the neighbor is faster than previous route
          if (newG < connectedNode.g) {
            connectedNode.g = newG;
            betterPath = true;
          }
          // if neighbor is NOT in the visited nodes list and NOT in the open nodes list
        } else {
          // assign the g to the newG because it shouldn't have one and add this node to openNodes list
          betterPath = true
          connectedNode.g = newG;
          connectedNode.isOpen = true;
          openNodes.push(connectedNode);
        }

        // only change the f if this is a better path than previously calculated
        if (betterPath) {
          // find heuristic value by using pythagorean theorem from the node to end node (if nodes can move diagonal)
          // connectedNode.h = pythagoreanTheorem(connectedNode, end);
  
          // find heuristic value by using manhattanDistance (because nodes can't move diagonal)
          connectedNode.h = manhattanDistance(connectedNode, end);
          // Add heuristic and g value (how long it took to get to this node) to get f
          connectedNode.f = connectedNode.g + connectedNode.h;
          connectedNode.cameFrom = currentNode;
        }
      }
    })
  } else {
    // there's no path so return true to stop the loop
    return true;
  }
}

export default aStarAlgorithm;