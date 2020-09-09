import Node from "./node";

const container = document.getElementById('pathfinder-grid');

export const createGrid = () => {
  for (let i = 0; i < 50; i++) {
    let newRow = document.createElement("div");
    newRow.classList.add("row-div")
    for (let j = 0; j < 30; j++) {
      let newDiv = document.createElement("div");
      newDiv.classList.add('node');
      if (i === 0 && j === 0) {
        newDiv.classList.add('start')
      }
  
      if (i === 49 && j === 29) {
        newDiv.classList.add('end')
      }
  
      newRow.appendChild(newDiv);
    }
    container.appendChild(newRow);
  }
}

export const createNodes = () => {
  const cols = 50;
  const rows = 30;
  const nodes = new Array(cols);
  for (let i = 0; i < cols; i++) {
    nodes[i] = new Array(rows);
    for (let j = 0; j < rows; j++) {
      nodes[i][j] = new Node(i, j);
    }
  }
  return nodes;
}
