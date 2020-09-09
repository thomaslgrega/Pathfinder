class Node {
  constructor(i, j) {
    // i and j are the location they are in the array
    this.i = i;
    this.j = j;
    // "distance" from start to this node.
    this.g = 0;
    // heuristic - basically a guess of how far to the end node (straight shot distance to end node)
    this.h = 0;
    // the total of j and h (basically, the lowest h is the path that the algorithm will take)
    this.f = 0;
    this.isStart = (i === 15 && j === 0);
    this.isEnd = (i === 20 && j === 25);
    this.isOpen = false;
    this.visited = false;
    this.connectedNodes = [];
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