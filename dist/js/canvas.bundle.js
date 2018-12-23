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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

var mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2
};

var colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

// Event Listeners
addEventListener('mousemove', function (event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;

	moleculesOnTheScreen.forEach(function (molecule) {
		molecule.clickMove(event.clientX, event.clientY);
	});
});

addEventListener('resize', function () {
	canvas.width = innerWidth;
	canvas.height = innerHeight;

	init();
});

addEventListener('mousedown', function (event) {
	//every time the mouse button goes down
	moleculesOnTheScreen.forEach(function (molecule) {
		molecule.clickDown(event.clientX, event.clientY);
	});
});

addEventListener('mouseup', function (event) {
	//every time the mouse button goes up
	moleculesOnTheScreen.forEach(function (molecule) {
		molecule.clickUp(event.clientX, event.clientY);
	});
});

// Objects

//Molecule
function Molecule(x, y) {
	this.x = x;
	this.y = y;
	this.radius = 20;

	this.defaultSmallRadius = 8;
	this.expandedSmallRadius = 14;
	this.smallRadiusL = 8;
	this.smallRadiusR = 8;
	this.inputX = this.x - this.radius;
	this.outputX = this.x + this.radius;

	this.defaultColor = '#F3EFEF';
	this.selectedColor = 'green';
	this.color = this.defaultColor;
	this.name = "sphereoid";
	this.isMoving = false;
}

Molecule.prototype.draw = function () {

	this.inputX = this.x - this.radius;
	this.outputX = this.x + this.radius;

	c.beginPath();
	c.fillStyle = this.color;
	c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
	c.arc(this.inputX, this.y, this.smallRadiusL, 0, Math.PI * 2, false);
	c.arc(this.outputX, this.y, this.smallRadiusR, 0, Math.PI * 2, false);
	c.fillText(this.name, this.x + this.radius, this.y - this.radius);
	c.fill();
	c.closePath();
};

Molecule.prototype.clickDown = function (x, y) {

	var distFromClick = distBetweenPoints(x, this.x, y, this.y);

	if (distFromClick < this.radius) {
		this.color = this.selectedColor;
		this.isMoving = true;
	} else if (distBetweenPoints(this.x + this.radius, x, this.y, y) < this.defaultSmallRadius | distBetweenPoints(this.x - this.radius, x, this.y, y) < this.defaultSmallRadius) {
		var connector = new Connector(this);
		moleculesOnTheScreen.push(connector);
		console.log(moleculesOnTheScreen);
	} else {
		this.color = this.defaultColor;
	}
};

Molecule.prototype.clickUp = function (x, y) {
	this.isMoving = false;
};

Molecule.prototype.clickMove = function (x, y) {
	if (this.isMoving == true) {
		this.x = x;
		this.y = y;
	}

	//check the right
	if (distBetweenPoints(this.x + this.radius, x, this.y, y) < this.defaultSmallRadius) {
		this.smallRadiusR = this.expandedSmallRadius;
	} else {
		this.smallRadiusR = this.defaultSmallRadius;
	}

	if (distBetweenPoints(this.x - this.radius, x, this.y, y) < this.defaultSmallRadius) {
		this.smallRadiusL = this.expandedSmallRadius;
	} else {
		this.smallRadiusL = this.defaultSmallRadius;
	}
};

Molecule.prototype.update = function () {
	this.draw();
};

//Connectors

function Connector(molecule1) {
	this.molecule1 = molecule1;
	this.molecule2;
	this.startX = this.molecule1.outputX;
	this.startY = this.molecule1.y;
	this.endX;
	this.endY;
	this.isMoving = true;
	this.color = 'black';
}

Connector.prototype.draw = function () {

	c.beginPath();
	c.fillStyle = this.color;
	c.moveTo(this.startX, this.startY);
	c.bezierCurveTo(this.startX + 100, this.startY, this.endX - 100, this.endY, this.endX, this.endY);
	c.stroke();
};

Connector.prototype.clickDown = function (x, y) {};

Connector.prototype.clickUp = function (x, y) {
	this.isMoving = false;

	//find what element is closest
};

Connector.prototype.clickMove = function (x, y) {
	if (this.isMoving == true) {
		this.endX = x;
		this.endY = y;
	}
};

Connector.prototype.update = function () {
	this.startX = this.molecule1.outputX;
	this.startY = this.molecule1.y;
	this.draw();
};

// Implementation
var moleculesOnTheScreen = void 0;
var molecule;
function init() {
	moleculesOnTheScreen = [];

	for (var i = 0; i < 5; i++) {
		molecule = new Molecule(Math.random() * 500, Math.random() * 500);
		moleculesOnTheScreen.push(molecule);
	}
}

function distBetweenPoints(x1, x2, y1, y2) {
	var a2 = Math.pow(x1 - x2, 2);
	var b2 = Math.pow(y1 - y2, 2);
	var dist = Math.sqrt(a2 + b2);

	return dist;
}

// Animation Loop
function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);

	//c.fillText('T', mouse.x, mouse.y)
	moleculesOnTheScreen.forEach(function (molecule) {
		molecule.update();
	});
}

init();
animate();

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
    var xDist = x2 - x1;
    var yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

module.exports = { randomIntFromRange: randomIntFromRange, randomColor: randomColor, distance: distance };

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map