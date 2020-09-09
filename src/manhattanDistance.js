const manhattanDistance = (checkNode, endNode) => {
  const a = Math.abs(checkNode.i - endNode.i);
  const b = Math.abs(checkNode.j - endNode.j);
  const distance = a + b;
  return distance;
}

export default manhattanDistance;