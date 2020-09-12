import { renderNodes } from "./pathfinder";
import Node from "./node";

// http://www.integral-domain.org/lwilliams/Applets/algorithms/recursivedivision.php

// 1. make outside completely a wall
//   a. choose two spots on outside to be a start and end node
// 2. choose random area to divide (first area will be the whole board)
// 3. divide by adding walls all the way from one wall to another  
// 4. choose random spot along the wall to make a gap
// 5. if there are divided areas that have height AND width > 2, repeat
// 6. else end process

const recursiveDivisionClosure = () => {
  // clear grid 
  const container = document.getElementById('pathfinder-grid');
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  
  // make new grid with outside wall
  const cols = 61;
  const rows = 31;
  const nodes = new Array(cols);
  for (let i = 0; i < cols; i++) {
    nodes[i] = new Array(rows);
    for (let j = 0; j < rows; j++) {
      nodes[i][j] = new Node(i, j);
      if (i === 0 || j === 0 || i === cols - 1 || j === rows - 1) {
        nodes[i][j].isWall = true
      }
    }
  }

  // create random start and end nodes at opposite sides
  // if (Math.random() < 0.5) {
  //   const randomStartJ = Math.floor((Math.random() * 31));
  //   const randomEndJ = Math.floor((Math.random() * 31));
  //   nodes[0][randomStartJ].isStart = true;
  //   nodes[0][randomStartJ].isWall = false;
  //   nodes[60][randomEndJ].isEnd = true;
  //   nodes[60][randomEndJ].isWall = false;
  // } else {
  //   const randomStartI = Math.floor((Math.random() * 61));
  //   const randomEndI = Math.floor((Math.random() * 61));
  //   nodes[randomStartI][0].isStart = true;
  //   nodes[randomStartI][0].isWall = false;
  //   nodes[randomEndI][30].isEnd = true;
  //   nodes[randomEndI][30].isWall = false;
  // }

  // get the "chamber" after creating outside walls
  renderNodes(nodes);
  const initialChamber = [];
  nodes.forEach((row, i) => {
    const newRow = [];
    if (i !== 0 && i !== 60) {
      row.forEach(node => {
        if (!node.isWall) {
          newRow.push(node);
        }
      });
      initialChamber.push(newRow);
    }
  });

  // closure queue for the divided squares. I may switch to just randomly choosing from the array
  const chambersQueue = [initialChamber];

  const recursiveDivision = () => {
    if (chambersQueue.length === 0) return;
    const currentChamber = chambersQueue.shift();
    // randomly determine if chamber should be cut horizontal or vertical
    const cutDirection = currentChamber.length > currentChamber[0].length ? "vert" : "horiz";
    if (cutDirection === "vert") {
      // have to create an odd index for the walls because 0th and last index are walls 
      const randomCol = Math.floor(Math.random() * ((currentChamber.length / 2) - 1)) * 2 + 1
      for (let j = 0; j < currentChamber[randomCol].length; j++) {
        currentChamber[randomCol][j].isWall = true;
      }
      // create a passage at a random node on an even index along the wall line (technically odd index on the original grid)
      const randomJ = Math.floor(Math.random() * (currentChamber[randomCol].length / 2)) * 2;
      currentChamber[randomCol][randomJ].isWall = false;



    } else {
      const randomRow = Math.floor(Math.random() * ((currentChamber[0].length / 2) - 1)) * 2 + 1;
      for (let i = 0; i < currentChamber.length; i++) {
        currentChamber[i][randomRow].isWall = true;
      }
      // create a passage at a random node on an even index along the wall line (technically odd index on the original grid)
      const randomI = Math.floor(Math.random() * (currentChamber.length / 2)) * 2;
      currentChamber[randomI][randomRow].isWall = false;



    }


    window.requestAnimationFrame(recursiveDivision);
  }

  recursiveDivision();
  renderNodes(nodes);
}



export default recursiveDivisionClosure;