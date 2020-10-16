import * as THREE from "./three";
import GameView from "./gameView";
import Key from "./key";

class Game {
  constructor() {
    this.key = new Key();
    this.createGameView();
    this.started = false;
    this.gameStartEl = document.getElementsByClassName("start")[0];
    this.gameStartListener = window.addEventListener(
      "keypress",
      this.hitSToStart.bind(this)
    );
  }

  startGame() {
    // this.addMusic();
    this.gameView.addMovingNotes(this.noteInterval);
    this.gameStartEl.className = "start hidden";
    this.started = true;
  }

  hitSToStart(e) {
    if (!this.started) {
      if (e.keyCode === 115 || e.keyCode === 83) {
        this.startGame();
      }
    }
  }

  createGameView() {
    //  scene size
    let width = window.innerWidth,
      height = window.innerHeight;

    let viewAngle = 75,
      aspect = width / height,
      near = 0.1,
      far = 10000;

    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(viewAngle, aspect, near, far);

    camera.position.z = 150;

    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    document.getElementById("game-canvas").appendChild(renderer.domElement);

    this.gameView = new GameView(
      renderer,
      camera,
      scene,
      this.key,
      this.musicDelay
    );
    this.gameView.setup();
  }
};

export default Game;