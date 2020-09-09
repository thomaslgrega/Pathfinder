import Node from "./node";

// const container = document.getElementById('pathfinder-grid');

// creates a 2D array full of Node objects
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
  // remove the old grid so it doesn't keep creating a bunch of grids. There might be a better way to do this?
  const container = document.getElementById('pathfinder-grid');
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  nodes.forEach(row => {
    let newRow = document.createElement("div");
    newRow.classList.add("row-div")
    row.forEach(node => {
      let newDiv = document.createElement("div");
      newDiv.classList.add('node');
      if (node.isStart) {
        newDiv.classList.add('start');
        newDiv.classList.add('open');
      } else if (node.isEnd) {
        newDiv.classList.add('end');
      } else if (node.visited) {
        newDiv.classList.add('visited')
      } else if (node.isOpen) {
        newDiv.classList.add('is-open')
      }

      newRow.appendChild(newDiv);
    });

    container.appendChild(newRow);
  })
}