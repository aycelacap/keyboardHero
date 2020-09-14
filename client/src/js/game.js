const GameView = require('./gameView');
const { RectAreaLight } = require('three');


class Game {
  this.tiles = [];
  this.width = 98;
  this.height = 148;
}
  
  setup() {
    createCanvas(400, 600);
  };
  
  draw() {
    background(51);
  
    for (let i = 0; i < tiles.length; i++) {
  
      rect();
  
    }
  };




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