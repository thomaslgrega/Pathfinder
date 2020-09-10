// randomly generate numbers to determine start and end Nodes
const startI = Math.floor(Math.random() * 50)
const startJ = Math.floor(Math.random() * 30)
const endI = Math.floor(Math.random() * 50)
const endJ = Math.floor(Math.random() * 30)

class Node {
  constructor(i, j, algo) {
    // i and j are the location they are in the grid
    this.i = i;
    this.j = j;
    // "distance" from start to this node.
    if (algo === "djikstras") {
      this.g = Infinity;
      this.weight = 1;
    } else {
      this.g = 0;
    }
    this.g = 0;
    // heuristic - basically a guess of how far to the end node (straight shot distance to end node)
    this.h = 0;
    // the total of j and h (basically, the lowest h is the path that the algorithm will take)
    this.f = 0;
    this.isStart = (i === startI && j === startJ);
    this.isEnd = (i === endI && j === endJ);
    this.isOpen = false;
    this.visited = false;
    this.connectedNodes = [];
    this.isPath = false;
    // randomly determine if this node will be a wall
    this.isWall = false;
    if (Math.random() < 0.25 && !this.isStart && !this.isEnd) {
      this.isWall = true;
    }

    // the previous node that we got here from. Used to backtrack when we reach the end node to
    // find the path
    this.cameFrom;
  }



  findConnectedNodes(nodes) {
    // don't add nodes if they're out of bounds
    if (this.i < nodes.length - 1) {
      this.connectedNodes.push(nodes[this.i + 1][this.j])
    }

    if (this.i > 0) {
      this.connectedNodes.push(nodes[this.i - 1][this.j])
    } 

    if (this.j < nodes[0].length - 1) {
      this.connectedNodes.push(nodes[this.i][this.j + 1])
    }

    if (this.j > 0) {
      this.connectedNodes.push(nodes[this.i][this.j - 1])
    }
  }
}

export default Node;