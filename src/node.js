class Node {
  constructor(i, j, isStart, isEnd, isWall, algo) {
    // i and j are the location they are in the grid
    this.i = i;
    this.j = j;
    this.isStart = isStart;
    this.isEnd = isEnd;
    // "distance" from start to this node.
    if (algo === "dijkstras") {
      this.g = Infinity;
      this.weight = 1;
      // weighted dijkstras making some nodes "cost" more to move to
      // this.isWeighted = false
      // if (Math.random() < 0.15 && !this.isStart && !this.isEnd) {
      //   this.isWeighted = true;
      //   this.weight = 5;
      // }
    } else {
      this.g = 0;
    }

    // heuristic - basically a guess of how far to the end node (straight shot distance to end node)
    this.h = 0;
    // the total of g and h (basically, the lowest h is the path that the algorithm will take)
    this.f = 0;
    this.isOpen = false;
    this.visited = false;
    this.connectedNodes = [];
    this.isPath = false;
    this.isWall = isWall;

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