const pythagoreanTheorem = (checkNode, endNode) => {
  const a = Math.abs(checkNode.i - endNode.i);
  const b = Math.abs(checkNode.j - endNode.j);
  const c = Math.sqrt((a * a) + (b * b));
  return c;
}

export default pythagoreanTheorem;