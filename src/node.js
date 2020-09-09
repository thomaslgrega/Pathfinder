class Node {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.isStart = (i === 0 && j === 0)
    this.isEnd = (i === 49 && j === 29)
  }

  render() {
    
  }
}

export default Node;