import { createNodes, renderNodes } from './pathfinder';
import aStarAlgorithm from "./astar";
import dijkstrasAlgorithm from "./dijkstras"

const nodes = createNodes("dijkstras");
// const nodes = createNodes();

let fpsInterval, done, timeStart, now, elapsed;

const startAnimateAStar = (fps) => {
  fpsInterval = 1000 / fps;
  timeStart = Date.now();
  animateAStar();
}

const animateAStar = () => {
  const requestId = requestAnimationFrame(animateAStar);
  now = Date.now();
  elapsed = now - timeStart;
  if (elapsed > fpsInterval) {
    done = aStarAlgorithm(nodes);
    if (done) {
      cancelAnimationFrame(requestId);
    }
  }

  renderNodes(nodes);
}

// const animateAStar = () => {
//   debugger
//   const nodes = createNodes();
//   let done = aStarAlgorithm(nodes);
//   const requestId = requestAnimationFrame(animateAStar);
//   if (done) {
//     cancelAnimationFrame(requestId)
//   }
// }

const startAnimateDijkstras = (fps) => {
  fpsInterval = 1000 / fps;
  timeStart = Date.now();
  animateDijkstras();
}

const animateDijkstras = () => {
  const requestId = requestAnimationFrame(animateDijkstras)
  now = Date.now();
  elapsed = now - timeStart;
  if (elapsed > fpsInterval) {
    done = dijkstrasAlgorithm(nodes);
    if (done) {
      cancelAnimationFrame(requestId);
    }
  }

  renderNodes(nodes);
}

const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", () =>  {
  const container = document.getElementById('pathfinder-grid');
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  startAnimateAStar(60);
});

const aStarBtn = document.getElementById("a-star-btn");
aStarBtn.addEventListener("click", () => startAnimateAStar(60))
// aStarBtn.addEventListener("click", animateAStar)
// startAnimateAStar(60);

const dijkstrasBtn = document.getElementById("dijkstras-btn");
dijkstrasBtn.addEventListener("click", () => startAnimateDijkstras(60))
