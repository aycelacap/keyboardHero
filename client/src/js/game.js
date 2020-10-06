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