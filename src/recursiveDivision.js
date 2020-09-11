import { renderNodes } from "./pathfinder";
import Node from "./node";

// http://www.integral-domain.org/lwilliams/Applets/algorithms/recursivedivision.php

// 1. make outside completely a wall
//   a. choose two spots on outside to be a start and end node
// 2. choose random area to divide (first area will be the whole board)
// 3. divide by adding walls all the way from one wall to another  
// 4. choose random spot along the wall to make a gap
// 5. if there are divided areas that have height AND width > 1, repeat
// 6. else end process

const recursiveDivisionClosure = (grid) => {
  // clear grid 
  const container = document.getElementById('pathfinder-grid');
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  
  // make new grid with outside wall
  const cols = 60;
  const rows = 30;
  const nodes = new Array(cols);
  for (let i = 0; i < cols; i++) {
    nodes[i] = new Array(rows);
    for (let j = 0; j < rows; j++) {
      nodes[i][j] = new Node(i, j);
      if (i === 0 || j === 0 || i === cols - 1 || j === rows - 1) {
        nodes[i][j].isWall = true;
      }
    }
  }

  // create random start and end nodes at opposite sides
  if (Math.random() < 0.5) {
    const randomStartJ = Math.floor((Math.random() * 30));
    const randomEndJ = Math.floor((Math.random() * 30));
    nodes[0][randomStartJ].isStart = true;
    nodes[0][randomStartJ].isWall = false;
    nodes[59][randomEndJ].isEnd = true;
    nodes[59][randomEndJ].wall = false;
  } else {
    const randomStartI = Math.floor((Math.random() * 60));
    const randomEndI = Math.floor((Math.random() * 60));
    nodes[randomStartI][0].isStart = true;
    nodes[randomStartI][0].isWall = false;
    nodes[randomEndI][29].isEnd = true;
    nodes[randomEndI][29].isWall = false;
  }

  renderNodes(nodes);

  // const chambers = [initialChamber];
  // recursiveDivision();
}

const recursiveDivision = () => {
  if (chambers.length === 0) return;

  window.requestAnimationFrame(recursiveDivision);
}

export default recursiveDivisionClosure;