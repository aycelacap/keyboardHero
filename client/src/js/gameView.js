import * as THREE from "./three";
import Light from "./light"

class GameView {
  constructor(renderer, camera, scene, key, musicDelay) {
    this.renderer = renderer;
    this.camera = camera;
    this.scene = scene;
    this.key = key;
    this.musicDelay = musicDelay;

    this.note = {};

    this.zStartPoint = -500;
    this.zEndPoint = 0;
    this.yStartPoint = 50;
    this.yEndPoint = -75;
    this.xPos = [-50, -25, 0, 25, 50];

    this.spheres = [];
    this.cylinders = [];
    this.beatLines = [];

    this.t = 0;
    this.measures = [0];

    this.xRotation = -Math.atan(
      (this.zEndPoint - this.zStartPoint) / (this.yStartPoint - this.yEndPoint)
    );
  }

  setup() {
    this.setWindowResizer();
    this.backgroundSetup();
    this.addFretBoard();
    this.setNoteAttributes();
    this.gameLoop();
  }

  setWindowResizer() {
    let width;
    let height;

    window.addEventListener("resize", () => {
      width = window.innerWidth;
      height = window.innerHeight;
      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    });
  }

  backgroundSetup() {
    this.light = new Light(this.scene);
    this.light.addLights();
    // lines
    this.lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    for (let i = 0; i < 5; i++) {
      let lineGeometry = new THREE.Geometry();
      lineGeometry.vertices.push(
        new THREE.Vector3(this.xPos[i], this.yStartPoint, this.zStartPoint)
      );
      lineGeometry.vertices.push(
        new THREE.Vector3(this.xPos[i], this.yEndPoint, this.zEndPoint)
      );
      let line = new THREE.Line(lineGeometry, this.lineMaterial);
      this.scene.add(line);
    }
  }

  addFretBoard() {
    let width = this.xPos[4] - this.xPos[0] + 50;
    let height = Math.sqrt(
      Math.pow(this.zEndPoint - this.zStartPoint, 2) +
        Math.pow(this.yEndPoint - this.yStartPoint, 2)
    );
    let boardGeometry = new THREE.PlaneGeometry(width, height);
    let boardMaterial = new THREE.MeshPhongMaterial({
      color: 0x000000,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
    });
    let board = new THREE.Mesh(boardGeometry, boardMaterial);
    board.rotateX(this.xRotation);
    board.position.set(0, -15, -250);
    this.scene.add(board);
  }

  setNoteAttributes() {
    this.note.vel = 0.77;

    this.note.yVel =
      (this.note.vel * (this.yEndPoint - this.yStartPoint)) / 100;
    this.note.zVel =
      (this.note.vel * (this.zEndPoint - this.zStartPoint)) / 100;

    this.note.radius = 7.5;

    this.note.colors = [];
    this.note.colors[0] = 0x4c7048; // Green
    this.note.colors[1] = 0xda3a3c; // Red
    this.note.colors[2] = 0xffeb3b; // Yellow
    this.note.colors[3] = 0x3f51b5; // Blue
    this.note.colors[4] = 0xff5722; // Orange
    this.note.colors[5] = 0xffffff; // White - selected

    this.note.geometry = new THREE.SphereGeometry(this.note.radius);

    this.note.materials = [];
    this.note.colors.forEach((color, idx) => {
      this.note.materials[idx] = new THREE.MeshPhongMaterial({
        color: this.note.colors[idx],
      });
    });

    const circleGeometry = new THREE.CircleGeometry(this.note.radius);
    const circles = [];
    for (let i = 0; i < 5; i++) {
      circles[i] = new THREE.Mesh(circleGeometry, this.note.materials[i]);
    }

    circles.forEach((circle, idx) => {
      circle.position.set(this.xPos[idx], this.yEndPoint, this.zEndPoint);
      circle.rotateX(-0.2);

      // LIGHT UP CIRCLE WHEN KEY IS PRESSED
      setInterval(() => {
        if (this.key.isDownVisually(this.key.pos[idx + 1])) {
          circle.material = this.note.materials[5];
        } else {
          circle.material = this.note.materials[idx];
        }
      }, 100);

      this.scene.add(circle);
    });
  }

  sceneRender() {
    this.renderer.render(this.scene, this.camera);
  }

  gameLoop() {
    requestAnimationFrame(this.gameLoop.bind(this));

    // this.sceneUpdate();
    this.sceneRender();
  }
};



export default GameView;