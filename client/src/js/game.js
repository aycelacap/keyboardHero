import * as THREE from "./three";
import GameView from "./gameView";
import Key from "./key";
// import GameNotes from './gameNotes';
import Instructions from "./instructions";
import Audio from "./audio";

class Game {
  constructor() {
    this.noteInterval = 347.72;
    this.musicDelay = 1450;
    this.key = new Key();
    this.instructions = new Instructions();
    this.started = false;

    this.gameStartEl = document.getElementsByClassName("start")[0];
    this.gameStartListener = window.addEventListener(
      "keypress",
      this.hitSToStart.bind(this)
    );

    this.createGameView();
  }

  startGame() {
    this.addMusic();
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

  addMusic() {
    this.music = new Audio(this.musicDelay);
    this.music.startMusic();
    setTimeout(this.music.fadeOut.bind(this.music), 118000);
  }
};

export default Game;