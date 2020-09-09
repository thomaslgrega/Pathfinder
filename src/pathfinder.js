import Node from "./node";

const container = document.getElementById('pathfinder-grid');

// creates a 2D array full of Node objects
export const createNodes = () => {
  const cols = 5;
  const rows = 10;
  const nodes = new Array(cols);
  for (let i = 0; i < cols; i++) {
    nodes[i] = new Array(rows);
    for (let j = 0; j < rows; j++) {
      nodes[i][j] = new Node(i, j);
    }
  }

  nodes.forEach(row => {
    row.forEach(node => {
      node.findConnectedNodes(nodes);
    })
  })

  console.log(nodes);

  return nodes;
}

// iterate through the nodes and render nodes depending on their state
// each row will be a div container that wraps nodes 
export const renderNodes = (nodes) => {
  nodes.forEach(row => {
    let newRow = document.createElement("div");
    newRow.classList.add("row-div")
    row.forEach(node => {
      let newDiv = document.createElement("div");
      newDiv.classList.add('node');
      if (node.isStart) {
        newDiv.classList.add('start')
      } else if (node.isEnd) {
        newDiv.classList.add('end')
      }

      newRow.appendChild(newDiv);
    });

    container.appendChild(newRow);
  })
}