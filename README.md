# Pathfinder

Pathfinder allows users to create obstacles and visualize two famous algorithms, Dijkstra's and A*, find the shortest path between a start and end node.

## [Live Link](https://thomaslgrega.github.io/Pathfinder/)

## Technologies Used
* JavaScript
* HTML5
* CSS3

## Details About Pathfinder
### Dijkstra's Algorithm
Using a Breadth-first search style, Dijkstra's algorithm is able to always find the shortest path. In this approach, the end node has no effect in the calculation of which node to visit next. Because of this, the search can be seen moving outwards evenly. This sacrifices speed, but allows for a wider range search. This is also a weighted algorithm meaning there could be different "distances" or values between each neighboring node and the algorithm will compensate for it and successfully locate the shortest path.

### A* Algorithm
Contrary to Dijkstra's algorithm, the A* algorithm is an informed search algorithm that uses the end node and heuristics to make an educated guess at traversing the grid.

```javascript
const manhattanDistance = (checkNode, endNode) => {
  const a = Math.abs(checkNode.i - endNode.i);
  const b = Math.abs(checkNode.j - endNode.j);
  const distance = a + b;
  return distance;
}
```

By simply calculating the distance between the current node and the ending node using the Manhattan Distance (if there are diagonal traversal, it would be better to calculate euclidean distance using the pythagorean theorem), the algorithm will calculate the total "score" for each node and traverse accordingly. Like Dijkstra's algorithm, A* is a weighted algorithm.

### Recursive Division
Other than allowing the user to draw their own obstacles and generate walls at completely random spots on the grid, I also implemented a maze generator using recursive division. During each recursive call, the algorithm draws a line to split a chamber and clears one random node along that line to make a passage. This allows the whole maze to be connected without fail. After all the chambers can't be split anymore, the recursion stops and a maze is created. This creates a satisfying visual when combined with the pathfinder.

### Other Notes
Animation is created simply using JavaScript with requestAnimationFrame.

### Future Direction
- Implement other pathfinding algorithms
- Add other maze generating algorithms
