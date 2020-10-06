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
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/src/index.js":
/*!*****************************!*\
  !*** ./client/src/index.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/game */ "./client/src/js/game.js");
/* harmony import */ var _js_game__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_game__WEBPACK_IMPORTED_MODULE_0__);


document.addEventListener("DOMContentLoaded", () => {
  let game = new _js_game__WEBPACK_IMPORTED_MODULE_0___default.a();
  
}); 



// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import GameView from "./gameView"

// class Game {
//   constructor() {
//     this.createGameView();
//     this.animate();
//   }

//   createGameView() {
//     let scene = new THREE.Scene();
//     let camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     camera.position.z = 5;

//     let renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);

//     let geometry = new THREE.BoxGeometry(1, 1, 1);
//     let material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
//     let cube = new THREE.Mesh(geometry, material);
//     scene.add(cube);

//     let spotLight1 = new THREE.SpotLight(0xffffff);
//     spotLight1.position.set(0, 10, 10);
//     scene.add(spotLight1);

//     let spotLight2 = new THREE.SpotLight(0xffffff);
//     spotLight2.position.set(0, 10, 0);
//     scene.add(spotLight2);

//     let spotLight3 = new THREE.SpotLight(0xffffff);
//     spotLight3.position.set(0, 10, -10);
//     scene.add(spotLight3);

//     let controls = new OrbitControls(camera, renderer.domElement);
//     // camera.position.set(0, 20, 100);
//     // controls.update();

//     Game.prototype.animate = () => {
//       // default rotation for the cube
//       cube.rotation.x += 0.01;
//       renderer.render(scene, camera);
//       controls.update();
//       requestAnimationFrame(animate);
//     };
//   }
// }

// export default Game;



/***/ }),

/***/ "./client/src/js/game.js":
/*!*******************************!*\
  !*** ./client/src/js/game.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

// import GameView from "./gameView"
// import * as THREE from "three"

// class Game {
//  constructor() {
//   this.createGameView();
//  }

//  createGameView() {
//   //  scene size
//   let width = window.innerWidth,
//       height = window.innerHeight;

//   let viewAngle = 75,
//       aspect = width / height,
//       near = 0.1,
//       far = 10000;

//   let scene = new THREE.Scene();
//   let camera = new THREE.PerspectiveCamera(
//     viewAngle,
//     aspect, 
//     near,
//     far
//   );

//   camera.position.z = 150;

//   let renderer = new THREE.WebGLRenderer();
//   renderer.setSize(width, height);
//   document.getElementById('game-canvas').appendChild(renderer.domElement);

//    this.gameView = new GameView(
//      renderer, camera, scene, this.key, this.musicDelay
//    );

//  }

// };

// export default Game;

/***/ })

/******/ });
//# sourceMappingURL=main.js.map