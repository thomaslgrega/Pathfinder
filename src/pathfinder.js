import Node from "./node";

// creates a 2D array full of Node objects
export const createNodes = (algo) => {
  const nodes = [];
  const rows = Array.from(document.querySelectorAll('.col-div'));
  rows.forEach((row, i) => {
    const nodeRow = [];
    Array.from(row.children).forEach((nodeDiv, j) => {
      const isWall = Array.from(nodeDiv.classList).includes('is-wall');
      const isStart = Array.from(nodeDiv.classList).includes('start');
      const isEnd = Array.from(nodeDiv.classList).includes('end');
      const newNode = new Node(i, j, isStart, isEnd, isWall, algo)
      nodeRow.push(newNode);
    });
    nodes.push(nodeRow);
  })

  // find the neighbors of each node
  nodes.forEach(row => {
    row.forEach(node => {
      node.findConnectedNodes(nodes);
    })
  })

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
    newRow.classList.add("col-div")
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

      if (node.isWall) {
        newDiv.classList.add('is-wall')
      }

      if (node.isWeighted) {
        newDiv.classList.add('is-weighted')
      }

      if (node.isPath && !node.isEnd && !node.isStart) {
        newDiv.classList.add('is-path')
      }

      newRow.appendChild(newDiv);
    });

    container.appendChild(newRow);
  })
}
