import { createNodes, renderNodes } from './pathfinder';
import Node from './node'
import aStarAlgorithm from "./astar";
import dijkstrasAlgorithm from "./dijkstras"

// ************ Used to control animation speed. May use it in the future *************
// let fpsInterval, done, timeStart, now, elapsed;

// const startAnimateAStar = (fps) => {
//   fpsInterval = 1000 / fps;
//   timeStart = Date.now();
//   animateAStar();
// }

// const animateAStar = () => {
//   const requestId = requestAnimationFrame(animateAStar);
//   now = Date.now();
//   elapsed = now - timeStart;
//   if (elapsed > fpsInterval) {
//     done = aStarAlgorithm(nodes);
//     if (done) {
//       cancelAnimationFrame(requestId);
//     }
//   }
//   renderNodes(nodes);
// }
// ************************************************************************************

const prepareAStar = () => {
  const nodes = createNodes("a*");
  animateAStar(nodes);
}

const animateAStar = (nodes) => {
  let done = aStarAlgorithm(nodes);
  const requestId = requestAnimationFrame(() => animateAStar(nodes));
  if (done) {
    cancelAnimationFrame(requestId)
  }

  renderNodes(nodes)
}

const prepareDijkstras = () => {
  const nodes = createNodes("dijkstras");
  animateDijkstras(nodes);
}

const animateDijkstras = (nodes) => {
  let done = dijkstrasAlgorithm(nodes);
  const requestId = requestAnimationFrame(() => animateDijkstras(nodes));
  if (done) {
    cancelAnimationFrame(requestId)
  }

  renderNodes(nodes)
}

// const clearBtn = document.getElementById("clear");
// clearBtn.addEventListener("click", () =>  {
//   const container = document.getElementById('pathfinder-grid');
//   while (container.firstChild) {
//     container.removeChild(container.firstChild);
//   }
//   startAnimateAStar(60);
// });

const aStarBtn = document.getElementById("a-star-btn");
aStarBtn.addEventListener("click", prepareAStar)

const dijkstrasBtn = document.getElementById("dijkstras-btn");
dijkstrasBtn.addEventListener("click", prepareDijkstras)

const generateEmptyBoard = () => {
  const cols = 60;
  const rows = 30;
  const nodes = new Array(cols);
  for (let i = 0; i < cols; i++) {
    nodes[i] = new Array(rows);
    for (let j = 0; j < rows; j++) {
      nodes[i][j] = new Node(i, j);
    }
  }

  renderNodes(nodes);
}

generateEmptyBoard()

const addWall = (e) => {
  debugger
  e.target.classList.add('is-wall');
}

const grid = document.getElementById("pathfinder-grid");
grid.addEventListener("click", addWall)
