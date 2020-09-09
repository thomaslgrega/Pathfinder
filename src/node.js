class Node {
  constructor(i, j) {
    // i and j are the location they are in the array
    this.i = i;
    this.j = j;
    // "distance" from start to this node.
    this.g;
    // heuristic - basically a guess of how far to the end node (straight shot distance to end node)
    this.h;
    // the total of j and h (basically, the lowest h is the path that the algorithm will take)
    this.f;
    this.isStart = (i === 0 && j === 0)
    this.isEnd = (i === 2 && j === 4)
    this.connectedNodes = [];
    this.cameFrom;
  }



  findConnectedNodes(nodes) {
    debugger
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