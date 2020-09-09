import { createNodes, renderNodes } from './pathfinder';
import aStarAlgorithm from "./astar";

const nodes = createNodes();

renderNodes(nodes);

const openNodes = [];
const closedNodes = [];
