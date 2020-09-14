/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/astar.js":
/*!**********************!*\
  !*** ./src/astar.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pythagoreanTheorem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pythagoreanTheorem */ "./src/pythagoreanTheorem.js");
/* harmony import */ var _manhattanDistance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./manhattanDistance */ "./src/manhattanDistance.js");
// https://en.wikipedia.org/wiki/A*_search_algorithm#Pseudocode


var openNodes = [];
var visited = [];
var finalPath = [];

var aStarAlgorithm = function aStarAlgorithm(nodes) {
  var start;
  var end; // search for the start and end nodes

  nodes.forEach(function (row) {
    row.forEach(function (node) {
      if (node.isStart) {
        start = node;
      } else if (node.isEnd) {
        end = node;
      }
    });
  });

  if (!visited.includes(start)) {
    openNodes = [];
    visited = [];
    finalPath = [];
    start.isOpen = true;
    openNodes.push(start);
  }

  if (openNodes.length > 0) {
    var lowestIdx = 0;
    var currentNode; // loop through openNodes to find the lowest f to get next node to traverse 

    openNodes.forEach(function (node, i) {
      if (node.f < openNodes[lowestIdx].f) {
        lowestIdx = i;
      }
    });
    currentNode = openNodes[lowestIdx]; // if currentNode is end node, search is done so draw the resulting path

    if (currentNode === end) {
      finalPath.push(currentNode);

      while (currentNode.cameFrom) {
        currentNode.isPath = true;
        finalPath.push(currentNode.cameFrom);
        currentNode = currentNode.cameFrom;
      }

      return true;
    } // remove node from open Nodes list and add it to the visited nodes list


    currentNode.isOpen = false;
    currentNode.visited = true;
    openNodes.splice(lowestIdx, 1);
    visited.push(currentNode); // check all connected nodes for their g, h and f

    currentNode.connectedNodes.forEach(function (connectedNode) {
      var newG = currentNode.g + 1;
      var betterPath = false;

      if (!visited.includes(connectedNode) && !connectedNode.isWall) {
        // if neighbor is NOT in the visited nodes list but in the open nodes list
        if (openNodes.includes(connectedNode)) {
          // and the newG is less than the current g of the neighbor, replace it with the newG.
          // meaning this new path to the neighbor is faster than previous route
          if (newG < connectedNode.g) {
            connectedNode.g = newG;
            betterPath = true;
          } // if neighbor is NOT in the visited nodes list and NOT in the open nodes list

        } else {
          // assign the g to the newG because it shouldn't have one and add this node to openNodes list
          betterPath = true;
          connectedNode.g = newG;
          connectedNode.isOpen = true;
          openNodes.push(connectedNode);
        } // only change the f if this is a better path than previously calculated


        if (betterPath) {
          // find heuristic value by using pythagorean theorem from the node to end node (if nodes can move diagonal)
          // connectedNode.h = pythagoreanTheorem(connectedNode, end);
          // find heuristic value by using manhattanDistance (because nodes can't move diagonal)
          connectedNode.h = Object(_manhattanDistance__WEBPACK_IMPORTED_MODULE_1__["default"])(connectedNode, end); // Add heuristic and g value (how long it took to get to this node) to get f

          connectedNode.f = connectedNode.g + connectedNode.h;
          connectedNode.cameFrom = currentNode;
        }
      }
    });
  } else {
    // there's no path so return true to stop the loop
    return true;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (aStarAlgorithm);

/***/ }),

/***/ "./src/dijkstras.js":
/*!**************************!*\
  !*** ./src/dijkstras.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#Algorithm
var openNodes = [];
var visited = [];
var finalPath = [];

var dijkstrasAlgorithm = function dijkstrasAlgorithm(nodes) {
  var start;
  var end;
  var currentNode; // search for the start and end nodes

  nodes.forEach(function (row) {
    row.forEach(function (node) {
      if (node.isStart) {
        start = node;
      } else if (node.isEnd) {
        end = node;
      }
    });
  });
  start.g = 0;

  if (!visited.includes(start)) {
    openNodes = [];
    visited = [];
    finalPath = [];
    start.isOpen = true;
    openNodes.push(start);
    currentNode = start;
  }

  if (openNodes.length > 0) {
    var lowestIdx = 0;
    currentNode; // loop through openNodes to find the lowest g to get currentNode

    openNodes.forEach(function (node, i) {
      if (node.g < openNodes[lowestIdx].g) {
        lowestIdx = i;
      }
    });
    currentNode = openNodes[lowestIdx]; // if currentNode is end node, search is done so draw the resulting path

    if (currentNode === end) {
      finalPath.push(currentNode);

      while (currentNode.cameFrom) {
        currentNode.isPath = true;
        finalPath.push(currentNode.cameFrom);
        currentNode = currentNode.cameFrom;
      }

      return true;
    }

    currentNode.connectedNodes.forEach(function (neighbor) {
      // Add currentNode's g and the weight of the neighbor to check if tentative is 
      // less than the current neighbor's g. Replace if it is.
      if (!visited.includes(neighbor) && !neighbor.isWall) {
        var tentative = currentNode.g + neighbor.weight;

        if (tentative < neighbor.g) {
          neighbor.g = tentative;
          neighbor.cameFrom = currentNode;
        }

        neighbor.isOpen = true;

        if (!openNodes.includes(neighbor)) {
          openNodes.push(neighbor);
        }
      }
    });
    currentNode.isOpen = false;
    currentNode.visited = true;
    openNodes.splice(lowestIdx, 1);
    visited.push(currentNode);
  } else {
    // there's no path so return true to stop the loop
    return true;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (dijkstrasAlgorithm);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pathfinder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pathfinder */ "./src/pathfinder.js");
/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node */ "./src/node.js");
/* harmony import */ var _astar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./astar */ "./src/astar.js");
/* harmony import */ var _dijkstras__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dijkstras */ "./src/dijkstras.js");
/* harmony import */ var _recursiveDivision__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./recursiveDivision */ "./src/recursiveDivision.js");




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

var prepareAStar = function prepareAStar() {
  var nodes = Object(_pathfinder__WEBPACK_IMPORTED_MODULE_0__["createNodes"])("a*");
  animateAStar(nodes);
};

var animateAStar = function animateAStar(nodes) {
  var done = Object(_astar__WEBPACK_IMPORTED_MODULE_2__["default"])(nodes);
  var requestId = requestAnimationFrame(function () {
    return animateAStar(nodes);
  });

  if (done) {
    cancelAnimationFrame(requestId);
  }

  Object(_pathfinder__WEBPACK_IMPORTED_MODULE_0__["renderNodes"])(nodes);
};

var prepareDijkstras = function prepareDijkstras() {
  var nodes = Object(_pathfinder__WEBPACK_IMPORTED_MODULE_0__["createNodes"])("dijkstras");
  animateDijkstras(nodes);
};

var animateDijkstras = function animateDijkstras(nodes) {
  var done = Object(_dijkstras__WEBPACK_IMPORTED_MODULE_3__["default"])(nodes);
  var requestId = requestAnimationFrame(function () {
    return animateDijkstras(nodes);
  });

  if (done) {
    cancelAnimationFrame(requestId);
  }

  Object(_pathfinder__WEBPACK_IMPORTED_MODULE_0__["renderNodes"])(nodes);
};

var clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", function () {
  var container = document.getElementById('pathfinder-grid');

  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  generateEmptyBoard();
  addMouseEnterEvent();
  addMouseLeaveEvent();
});

var handleRandomWalls = function handleRandomWalls() {
  var nodesArr = Array.from(document.querySelectorAll(".node"));
  nodesArr.forEach(function (node) {
    if (!node.classList.contains("start") && !node.classList.contains("end") && Math.random() < 0.25) {
      node.classList.add('is-wall');
    }
  });
};

var aStarBtn = document.getElementById("a-star-btn");
aStarBtn.addEventListener("click", prepareAStar);
var dijkstrasBtn = document.getElementById("dijkstras-btn");
dijkstrasBtn.addEventListener("click", prepareDijkstras);
var randomWallsBtn = document.getElementById("random-btn");
randomWallsBtn.addEventListener("click", handleRandomWalls);
var recursiveDivision = document.getElementById("recursive-division");
recursiveDivision.addEventListener("click", _recursiveDivision__WEBPACK_IMPORTED_MODULE_4__["default"]);

var generateEmptyBoard = function generateEmptyBoard() {
  var cols = 61;
  var rows = 31;
  var nodes = new Array(cols);

  for (var i = 0; i < cols; i++) {
    nodes[i] = new Array(rows);

    for (var j = 0; j < rows; j++) {
      nodes[i][j] = new _node__WEBPACK_IMPORTED_MODULE_1__["default"](i, j);
    }
  } // create default start and end nodes


  nodes[14][14].isStart = true;
  nodes[45][14].isEnd = true;
  nodes.forEach(function (row) {
    row.forEach(function (node) {
      node.isWall = false;
    });
  });
  Object(_pathfinder__WEBPACK_IMPORTED_MODULE_0__["renderNodes"])(nodes);
};

generateEmptyBoard();
var grid = document.getElementById("pathfinder-grid");
var createWall = false;
var deleteWall = false;
var dragStartNode = false;
var dragEndNode = false;
grid.addEventListener("mousedown", function (e) {
  if (e.target.classList.contains("start")) {
    dragStartNode = true;
  } else if (e.target.classList.contains("end")) {
    dragEndNode = true;
  } else if (e.target.classList.contains("is-wall")) {
    deleteWall = true;
    e.target.classList.remove("is-wall");
  } else {
    createWall = true;

    if (!e.target.classList.contains("start") && !e.target.classList.contains("end")) {
      e.target.classList.add("is-wall");
    }
  }
});
grid.addEventListener("mouseup", function () {
  dragStartNode = false;
  dragEndNode = false;
  createWall = false;
  deleteWall = false;
});

var addMouseEnterEvent = function addMouseEnterEvent() {
  var nodesArr = Array.from(document.querySelectorAll(".node"));
  nodesArr.forEach(function (node) {
    node.addEventListener("mouseenter", function (e) {
      if (createWall) {
        if (!e.target.classList.contains("start") && !e.target.classList.contains("end")) {
          e.target.classList.add('is-wall');
        }
      } else if (deleteWall) {
        e.target.classList.remove('is-wall');
      } else if (dragStartNode) {
        e.target.classList.add('start');
        e.target.classList.remove('is-wall');
      } else if (dragEndNode) {
        e.target.classList.add('end');
        e.target.classList.remove('is-wall');
      }
    });
  });
};

var addMouseLeaveEvent = function addMouseLeaveEvent() {
  var nodesArr = Array.from(document.querySelectorAll(".node"));
  nodesArr.forEach(function (node) {
    node.addEventListener("mouseleave", function (e) {
      if (dragStartNode) {
        e.target.classList.remove('start');
      } else if (dragEndNode) {
        e.target.classList.remove('end');
      }
    });
  });
};

addMouseLeaveEvent();
addMouseEnterEvent(); // Nav bar stuff

var addAlgoDropDownEventListener = function addAlgoDropDownEventListener() {
  var algoSpan = document.querySelector(".algorithms-span");
  var algoDropdown = document.querySelector(".algorithms-dropdown");
  var obstaclesDropdown = document.querySelector(".obstacles-dropdown");
  algoSpan.addEventListener("click", function () {
    algoDropdown.classList.toggle("show-dropdown");
    obstaclesDropdown.classList.remove("show-dropdown");
  });
};

var addObstacleDropDownEventListener = function addObstacleDropDownEventListener() {
  var obstaclesSpan = document.querySelector(".obstacles-span");
  var obstaclesDropdown = document.querySelector(".obstacles-dropdown");
  var algoDropdown = document.querySelector(".algorithms-dropdown");
  obstaclesSpan.addEventListener("click", function () {
    obstaclesDropdown.classList.toggle("show-dropdown");
    algoDropdown.classList.remove("show-dropdown");
  });
};

var addDropDownCloseEvent = function addDropDownCloseEvent() {
  var buttons = document.querySelectorAll("button");
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      var algoDropdown = document.querySelector(".algorithms-dropdown");
      var obstacleDropdown = document.querySelector(".obstacles-dropdown");
      algoDropdown.classList.remove("show-dropdown");
      obstacleDropdown.classList.remove("show-dropdown");
    });
  });
};

var addExplanationEvent = function addExplanationEvent() {
  var questionIcon = document.querySelector(".fa-question-circle");
  var explanationContent = document.querySelector(".explanation-content");
  questionIcon.addEventListener("mouseenter", function () {
    explanationContent.classList.add("show-explanation");
  });
  questionIcon.addEventListener("mouseleave", function () {
    explanationContent.classList.remove("show-explanation");
  });
}; // close dropdowns when you click outside the dropdown


window.onclick = function (e) {
  if (!e.target.matches('.dropdown-spans')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");

    for (var i = 0; i < dropdowns.length; i++) {
      dropdowns[i].classList.remove('show-dropdown');
    }
  }
};

addObstacleDropDownEventListener();
addAlgoDropDownEventListener();
addDropDownCloseEvent();
addExplanationEvent();

/***/ }),

/***/ "./src/manhattanDistance.js":
/*!**********************************!*\
  !*** ./src/manhattanDistance.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var manhattanDistance = function manhattanDistance(checkNode, endNode) {
  var a = Math.abs(checkNode.i - endNode.i);
  var b = Math.abs(checkNode.j - endNode.j);
  var distance = a + b;
  return distance;
};

/* harmony default export */ __webpack_exports__["default"] = (manhattanDistance);

/***/ }),

/***/ "./src/node.js":
/*!*********************!*\
  !*** ./src/node.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Node = /*#__PURE__*/function () {
  function Node(i, j, isStart, isEnd, isWall, algo) {
    _classCallCheck(this, Node);

    // i and j are the location they are in the grid
    this.i = i;
    this.j = j;
    this.isStart = isStart;
    this.isEnd = isEnd; // "distance" from start to this node.

    if (algo === "dijkstras") {
      this.g = Infinity;
      this.weight = 1; // weighted dijkstras making some nodes "cost" more to move to
      // this.isWeighted = false
      // if (Math.random() < 0.15 && !this.isStart && !this.isEnd) {
      //   this.isWeighted = true;
      //   this.weight = 5;
      // }
    } else {
      this.g = 0;
    } // heuristic - basically a guess of how far to the end node (straight shot distance to end node)


    this.h = 0; // the total of g and h (basically, the lowest h is the path that the algorithm will take)

    this.f = 0;
    this.isOpen = false;
    this.visited = false;
    this.connectedNodes = [];
    this.isPath = false;
    this.isWall = isWall; // the previous node that we got here from. Used to backtrack when we reach the end node to
    // find the path

    this.cameFrom;
  }

  _createClass(Node, [{
    key: "findConnectedNodes",
    value: function findConnectedNodes(nodes) {
      // don't add nodes if they're out of bounds
      if (this.i < nodes.length - 1) {
        this.connectedNodes.push(nodes[this.i + 1][this.j]);
      }

      if (this.i > 0) {
        this.connectedNodes.push(nodes[this.i - 1][this.j]);
      }

      if (this.j < nodes[0].length - 1) {
        this.connectedNodes.push(nodes[this.i][this.j + 1]);
      }

      if (this.j > 0) {
        this.connectedNodes.push(nodes[this.i][this.j - 1]);
      }
    }
  }]);

  return Node;
}();

/* harmony default export */ __webpack_exports__["default"] = (Node);

/***/ }),

/***/ "./src/pathfinder.js":
/*!***************************!*\
  !*** ./src/pathfinder.js ***!
  \***************************/
/*! exports provided: createNodes, renderNodes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNodes", function() { return createNodes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderNodes", function() { return renderNodes; });
/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node */ "./src/node.js");
 // creates a 2D array full of Node objects

var createNodes = function createNodes(algo) {
  var nodes = [];
  var rows = Array.from(document.querySelectorAll('.col-div'));
  rows.forEach(function (row, i) {
    var nodeRow = [];
    Array.from(row.children).forEach(function (nodeDiv, j) {
      var isWall = Array.from(nodeDiv.classList).includes('is-wall');
      var isStart = Array.from(nodeDiv.classList).includes('start');
      var isEnd = Array.from(nodeDiv.classList).includes('end');
      var newNode = new _node__WEBPACK_IMPORTED_MODULE_0__["default"](i, j, isStart, isEnd, isWall, algo);
      nodeRow.push(newNode);
    });
    nodes.push(nodeRow);
  }); // find the neighbors of each node

  nodes.forEach(function (row) {
    row.forEach(function (node) {
      node.findConnectedNodes(nodes);
    });
  });
  return nodes;
}; // iterate through the nodes and render nodes depending on their state
// each row will be a div container that wraps nodes 

var renderNodes = function renderNodes(nodes) {
  // remove the old grid so it doesn't keep creating a bunch of grids. There might be a better way to do this?
  var container = document.getElementById('pathfinder-grid');

  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  nodes.forEach(function (row) {
    var newRow = document.createElement("div");
    newRow.classList.add("col-div");
    row.forEach(function (node) {
      var newDiv = document.createElement("div");
      newDiv.classList.add('node');

      if (node.isStart) {
        newDiv.classList.add('start');
        newDiv.classList.add('open');
      } else if (node.isEnd) {
        newDiv.classList.add('end');
      } else if (node.visited) {
        newDiv.classList.add('visited');
      } else if (node.isOpen) {
        newDiv.classList.add('is-open');
      }

      if (node.isWall) {
        newDiv.classList.add('is-wall');
      }

      if (node.isWeighted) {
        newDiv.classList.add('is-weighted');
      }

      if (node.isPath && !node.isEnd && !node.isStart) {
        newDiv.classList.add('is-path');
      }

      newRow.appendChild(newDiv);
    });
    container.appendChild(newRow);
  });
};

/***/ }),

/***/ "./src/pythagoreanTheorem.js":
/*!***********************************!*\
  !*** ./src/pythagoreanTheorem.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var pythagoreanTheorem = function pythagoreanTheorem(checkNode, endNode) {
  var a = Math.abs(checkNode.i - endNode.i);
  var b = Math.abs(checkNode.j - endNode.j);
  var c = Math.sqrt(a * a + b * b);
  return c;
};

/* harmony default export */ __webpack_exports__["default"] = (pythagoreanTheorem);

/***/ }),

/***/ "./src/recursiveDivision.js":
/*!**********************************!*\
  !*** ./src/recursiveDivision.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pathfinder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pathfinder */ "./src/pathfinder.js");
/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node */ "./src/node.js");

 // http://www.integral-domain.org/lwilliams/Applets/algorithms/recursivedivision.php
// https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_division_method
// 1. make outside completely a wall
// 2. choose area to divide (first area will be the whole board)
// 3. divide by adding walls all the way from one wall to another  
// 4. choose random spot along the wall to make a gap
// 5. if there are divided areas that have height AND width > 2, repeat
// 6. else end process

var findTwoSplits = function findTwoSplits(chamber, idx, vertBool) {
  var newChambers = [];
  var firstChamber = [];
  var secondChamber = [];

  if (vertBool) {
    firstChamber = chamber.slice(0, idx);
    secondChamber = chamber.slice(idx + 1, chamber.length);
    newChambers.push(firstChamber, secondChamber);
  } else {
    for (var i = 0; i < chamber.length; i++) {
      var newCol = [];

      for (var j = 0; j < idx; j++) {
        newCol.push(chamber[i][j]);
      }

      firstChamber.push(newCol);
    }

    for (var _i = 0; _i < chamber.length; _i++) {
      var _newCol = [];

      for (var _j = idx + 1; _j < chamber[0].length; _j++) {
        _newCol.push(chamber[_i][_j]);
      }

      secondChamber.push(_newCol);
    }

    newChambers.push(firstChamber, secondChamber);
  }

  return newChambers;
};

var recursiveDivisionClosure = function recursiveDivisionClosure() {
  // clear grid 
  // const container = document.getElementById('pathfinder-grid');
  // while (container.firstChild) {
  //   container.removeChild(container.firstChild);
  // }
  // make new grid with outside wall
  var cols = 61;
  var rows = 31;
  var nodes = new Array(cols);

  for (var i = 0; i < cols; i++) {
    nodes[i] = new Array(rows);

    for (var j = 0; j < rows; j++) {
      nodes[i][j] = new _node__WEBPACK_IMPORTED_MODULE_1__["default"](i, j);

      if (i === 0 || j === 0 || i === cols - 1 || j === rows - 1) {
        nodes[i][j].isWall = true;
      }
    }
  } // get the "chamber" after creating outside walls


  Object(_pathfinder__WEBPACK_IMPORTED_MODULE_0__["renderNodes"])(nodes);
  var initialChamber = [];
  nodes.forEach(function (row, i) {
    var newRow = [];

    if (i !== 0 && i !== 60) {
      row.forEach(function (node) {
        if (!node.isWall) {
          newRow.push(node);
        }
      });
      initialChamber.push(newRow);
    }
  });
  var randomStartJ = Math.floor(Math.random() * initialChamber[0].length);
  var randomStartI = Math.floor(Math.random() * initialChamber.length);
  var randomEndJ = Math.floor(Math.random() * initialChamber[0].length);
  var randomEndI = Math.floor(Math.random() * initialChamber.length);
  initialChamber[randomStartI][randomStartJ].isStart = true;
  initialChamber[randomEndI][randomEndJ].isEnd = true; // closure queue for the divided squares. I may switch to just randomly choosing from the array

  var chambersQueue = [initialChamber];

  var recursiveDivision = function recursiveDivision() {
    if (chambersQueue.length === 0) return;
    var currentChamber = chambersQueue.shift(); // determine if chamber should be cut horizontal or vertical

    var cutDirection = currentChamber.length > currentChamber[0].length ? "vert" : "horiz";

    if (cutDirection === "vert") {
      // have to create an odd index for the walls because 0th and last index are walls 
      var randomCol = Math.floor(Math.random() * (currentChamber.length / 2 - 1)) * 2 + 1;

      for (var _j2 = 0; _j2 < currentChamber[randomCol].length; _j2++) {
        if (!currentChamber[randomCol][_j2].isStart && !currentChamber[randomCol][_j2].isEnd) {
          currentChamber[randomCol][_j2].isWall = true;
        }
      } // create a passage at a random node on an even index along the wall line (technically odd index on the original grid)


      var randomJ = Math.floor(Math.random() * (currentChamber[randomCol].length / 2)) * 2;
      currentChamber[randomCol][randomJ].isWall = false; // find the two new chambers

      var newChambers = findTwoSplits(currentChamber, randomCol, true); // push the new Chambers into queue only if they are length AND width 3 or higher

      newChambers.forEach(function (newChamber) {
        if (newChamber.length > 2 && newChamber[0].length > 2) {
          chambersQueue.push(newChamber);
        }
      });
    } else {
      var randomRow = Math.floor(Math.random() * (currentChamber[0].length / 2 - 1)) * 2 + 1;

      for (var _i2 = 0; _i2 < currentChamber.length; _i2++) {
        if (!currentChamber[_i2][randomRow].isStart && !currentChamber[_i2][randomRow].isEnd) {
          currentChamber[_i2][randomRow].isWall = true;
        }
      } // create a passage at a random node on an even index along the wall line (technically odd index on the original grid)


      var randomI = Math.floor(Math.random() * (currentChamber.length / 2)) * 2;
      currentChamber[randomI][randomRow].isWall = false; // find the two new chambers

      var _newChambers = findTwoSplits(currentChamber, randomRow, false); // push the new Chambers into queue only if they are length AND width 3 or higher


      _newChambers.forEach(function (newChamber) {
        if (newChamber.length > 2 && newChamber[0].length > 2) {
          chambersQueue.push(newChamber);
        }
      });
    }

    requestAnimationFrame(recursiveDivision);
    Object(_pathfinder__WEBPACK_IMPORTED_MODULE_0__["renderNodes"])(nodes);
  };

  recursiveDivision();
  Object(_pathfinder__WEBPACK_IMPORTED_MODULE_0__["renderNodes"])(nodes);
};

/* harmony default export */ __webpack_exports__["default"] = (recursiveDivisionClosure);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map