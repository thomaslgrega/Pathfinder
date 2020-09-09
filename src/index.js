import { createNodes, renderNodes } from './pathfinder';
import aStarAlgorithm from "./astar";
import { request } from 'http';

const nodes = createNodes();

// renderNodes(nodes);

let fpsInterval, done, timeStart, now, then, elapsed;

const animateFinalPath = () => {
  
}

const startAnimate = (fps) => {
  fpsInterval = 1000 / fps;
  then = Date.now()
  timeStart = then;
  animateTest();
}

const animateTest = () => {
  const requestId = requestAnimationFrame(animateTest);
  now = Date.now();
  elapsed = now - then;
  console.log('hello')
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);

    renderNodes(nodes);
    done = aStarAlgorithm(nodes, requestId);

    if (done) {
      cancelAnimationFrame(requestId);
    }
  }

  renderNodes(nodes);

}

startAnimate(60);
