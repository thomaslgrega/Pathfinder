import { createNodes, renderNodes } from './pathfinder';
import aStarAlgorithm from "./astar";

const nodes = createNodes();

// renderNodes(nodes);

let fpsInterval, done, timeStart, now, then, elapsed;

const startAnimate = (fps) => {
  fpsInterval = 1000 / fps;
  then = Date.now()
  timeStart = then;
  animateTest();
}

const animateTest = () => {
  requestAnimationFrame(animateTest);
  now = Date.now();
  elapsed = now - then;

  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);

    renderNodes(nodes);
    aStarAlgorithm(nodes);
  }

}

startAnimate(40);
