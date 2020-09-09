export const aStarAlgorithm = (nodes) => {
  const start = nodes[0][0];
  openNodes = [start];
  if (openNodes.length > 0) {
    window.requestAnimationFrame(aStarAlgorithm);
  }

}