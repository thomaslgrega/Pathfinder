import pythagoreanTheorem from "./pythagoreanTheorem";

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
  })

  openNodes.push(start);
  visited = [];

  if (openNodes.length > 0) {
    let nextNodeIdx = 0;
    let nextNode;

    // loop through openNodes to find the lowest f to get next node to traverse 
    openNodes.forEach((node, i) => {
      if (node.f < openNodes[nextNodeIdx].f) {
        nextNodeIdx = i;
        nextNode = node;
      }
    })

    // if nextNode is end node, search is done
    if (nextNode === end) {
      console.log('DONE');
    }

    // remove node from open Nodes list and add it to the visited nodes list
    openNodes.splice(nextNodeIdx, 1);
    visited.push(nextNode);

    // check all connected nodes for their 
    node.connectedNodes.forEach(connectedNode => {
      let newG = nextNode.g + 1;
      if (!visited.includes(connectedNode)) {
        // if neighbor is NOT in the visited nodes list but in the open nodes list
        if (openNodes.includes(connectedNode)) {
          // and the newG is less than the current g of the neighbor, replace it with the newG.
          // meaning this new path to the neighbor is faster than previous route
          if (newG < connectedNode.g) {
            connectedNode.g = newG;
          }
          // if neighbor is NOT in the visited nodes list and NOT in the open nodes list
        } else {
          // assign the g to the newG because it shouldn't have one and add this node to openNodes list
          connectedNode.g = newG;
          openNodes.push(connectedNode);
        }

        // find heuristic value by using pythagorean theorem from the node to end node
        connectedNode.h = pythagoreanTheorem(connectedNode, end);
        // Add heuristic and g value (how long it took to get to this node) to get f
        connectedNode.f = connectedNode.g + connectedNode.h
      }
    })

    // as long as there are more open nodes, keep searching
    window.requestAnimationFrame(aStarAlgorithm);
  } else {
    // there's no path

  }
}

export default aStarAlgorithm;