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
    // nodes.forEach(row => {
    //   row.forEach(node => {
    //     if (node.isStart) {
    //       start = node;
    //     } else if (node.isEnd) {
    //       end = node;
    //     }
    //   })
    // });
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
/*! exports provided: addMouseEnterEvent, addMouseLeaveEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addMouseEnterEvent", function() { return addMouseEnterEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addMouseLeaveEvent", function() { return addMouseLeaveEvent; });
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
randomWallsBtn.addEventListener("click", handleRandomWalls); // const recursiveDivision = document.getElementById("recursive-division");
// recursiveDivision.addEventListener("click", () => recursiveDivisionClosure());

var generateEmptyBoard = function generateEmptyBoard() {
  var cols = 60;
  var rows = 30;
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
addMouseEnterEvent();

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


    this.h = 0; // the total of j and h (basically, the lowest h is the path that the algorithm will take)

    this.f = 0;
    this.isOpen = false;
    this.visited = false;
    this.connectedNodes = [];
    this.isPath = false;
    this.isWall = isWall; // randomly determine if this node will be a wall
    // if (Math.random() < 0.25 && !this.isStart && !this.isEnd) {
    //   this.isWall = true;
    // }
    // the previous node that we got here from. Used to backtrack when we reach the end node to
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
  // randomly generate numbers to determine start and end Nodes
  var nodes = [];
  var rows = Array.from(document.querySelectorAll('.row-div'));
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
    newRow.classList.add("row-div");
    row.forEach(function (node) {
      var newDiv = document.createElement("div");
      newDiv.classList.add('node'); // if (node.isStart) {

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
// 1. make outside completely a wall
//   a. choose two spots on outside to be a start and end node
// 2. choose random area to divide (first area will be the whole board)
// 3. divide by adding walls all the way from one wall to another  
// 4. choose random spot along the wall to make a gap
// 5. if there are divided areas that have height AND width > 1, repeat
// 6. else end process

var recursiveDivisionClosure = function recursiveDivisionClosure(grid) {
  // clear grid 
  var container = document.getElementById('pathfinder-grid');

  while (container.firstChild) {
    container.removeChild(container.firstChild);
  } // make new grid with outside wall


  var cols = 60;
  var rows = 30;
  var nodes = new Array(cols);

  for (var i = 0; i < cols; i++) {
    nodes[i] = new Array(rows);

    for (var j = 0; j < rows; j++) {
      nodes[i][j] = new _node__WEBPACK_IMPORTED_MODULE_1__["default"](i, j);

      if (i === 0 || j === 0 || i === cols - 1 || j === rows - 1) {
        nodes[i][j].isWall = true;
      }
    }
  } // create random start and end nodes at opposite sides


  if (Math.random() < 0.5) {
    var randomStartJ = Math.floor(Math.random() * 30);
    var randomEndJ = Math.floor(Math.random() * 30);
    nodes[0][randomStartJ].isStart = true;
    nodes[0][randomStartJ].isWall = false;
    nodes[59][randomEndJ].isEnd = true;
    nodes[59][randomEndJ].wall = false;
  } else {
    var randomStartI = Math.floor(Math.random() * 60);
    var randomEndI = Math.floor(Math.random() * 60);
    nodes[randomStartI][0].isStart = true;
    nodes[randomStartI][0].isWall = false;
    nodes[randomEndI][29].isEnd = true;
    nodes[randomEndI][29].isWall = false;
  }

  Object(_pathfinder__WEBPACK_IMPORTED_MODULE_0__["renderNodes"])(nodes); // const chambers = [initialChamber];
  // recursiveDivision();
};

var recursiveDivision = function recursiveDivision() {
  if (chambers.length === 0) return;
  window.requestAnimationFrame(recursiveDivision);
};

/* harmony default export */ __webpack_exports__["default"] = (recursiveDivisionClosure);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map