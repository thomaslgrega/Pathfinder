import { renderNodes } from "./pathfinder";
import Node from "./node";

// http://www.integral-domain.org/lwilliams/Applets/algorithms/recursivedivision.php
// https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_division_method

// 1. make outside completely a wall
// 2. choose area to divide (first area will be the whole board)
// 3. divide by adding walls all the way from one wall to another  
// 4. choose random spot along the wall to make a gap
// 5. if there are divided areas that have height AND width > 2, repeat
// 6. else end process

const findTwoSplits = (chamber, idx, vertBool) => {
  const newChambers = [];
  let firstChamber = [];
  let secondChamber = [];
  if (vertBool) {
    firstChamber = chamber.slice(0, idx);
    secondChamber = chamber.slice(idx + 1, chamber.length);
    newChambers.push(firstChamber, secondChamber);
  } else {
    for (let i = 0; i < chamber.length; i++) {
      const newCol = [];
      for (let j = 0; j < idx; j++) {
        newCol.push(chamber[i][j]);
      }
      firstChamber.push(newCol);
    }
    
    for (let i = 0; i < chamber.length; i++) {
      const newCol = [];
      for (let j = idx + 1; j < chamber[0].length; j++) {
        newCol.push(chamber[i][j]);
      }
      secondChamber.push(newCol);
    }

    newChambers.push(firstChamber, secondChamber);
  }

  return newChambers;
}

const recursiveDivisionClosure = () => {
  // clear grid 
  // const container = document.getElementById('pathfinder-grid');
  // while (container.firstChild) {
  //   container.removeChild(container.firstChild);
  // }
  
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

  const randomStartJ = Math.floor((Math.random() * initialChamber[0].length));
  const randomStartI = Math.floor((Math.random() * initialChamber.length));
  const randomEndJ = Math.floor((Math.random() * initialChamber[0].length));
  const randomEndI = Math.floor((Math.random() * initialChamber.length));

  initialChamber[randomStartI][randomStartJ].isStart = true;
  initialChamber[randomEndI][randomEndJ].isEnd = true;

  // closure queue for the divided squares. I may switch to just randomly choosing from the array
  const chambersQueue = [initialChamber];

  const recursiveDivision = () => {
    if (chambersQueue.length === 0) return;
    const currentChamber = chambersQueue.shift();
    // determine if chamber should be cut horizontal or vertical
    const cutDirection = currentChamber.length > currentChamber[0].length ? "vert" : "horiz";
    if (cutDirection === "vert") {
      // have to create an odd index for the walls because 0th and last index are walls 
      const randomCol = Math.floor(Math.random() * ((currentChamber.length / 2) - 1)) * 2 + 1
      for (let j = 0; j < currentChamber[randomCol].length; j++) {
        if (!currentChamber[randomCol][j].isStart && !currentChamber[randomCol][j].isEnd) {
          currentChamber[randomCol][j].isWall = true;
        }
      }
      // create a passage at a random node on an even index along the wall line (technically odd index on the original grid)
      const randomJ = Math.floor(Math.random() * (currentChamber[randomCol].length / 2)) * 2;
      currentChamber[randomCol][randomJ].isWall = false;

      // find the two new chambers
      const newChambers = findTwoSplits(currentChamber, randomCol, true);
      // push the new Chambers into queue only if they are length AND width 3 or higher
      newChambers.forEach(newChamber => {
        if (newChamber.length > 2 && newChamber[0].length > 2) {
          chambersQueue.push(newChamber);
        }
      });
    } else {
      const randomRow = Math.floor(Math.random() * ((currentChamber[0].length / 2) - 1)) * 2 + 1;
      for (let i = 0; i < currentChamber.length; i++) {
        if (!currentChamber[i][randomRow].isStart && !currentChamber[i][randomRow].isEnd) {
          currentChamber[i][randomRow].isWall = true;
        }
      }
      // create a passage at a random node on an even index along the wall line (technically odd index on the original grid)
      const randomI = Math.floor(Math.random() * (currentChamber.length / 2)) * 2;
      currentChamber[randomI][randomRow].isWall = false;

      // find the two new chambers
      const newChambers = findTwoSplits(currentChamber, randomRow, false);
      // push the new Chambers into queue only if they are length AND width 3 or higher
      newChambers.forEach(newChamber => {
        if (newChamber.length > 2 && newChamber[0].length > 2) {
          chambersQueue.push(newChamber);
        }
        
      });
    }

    requestAnimationFrame(recursiveDivision);
    renderNodes(nodes);
  }

  recursiveDivision();
  renderNodes(nodes);
}



export default recursiveDivisionClosure;