import * as THREE from "./three";
import Light from "./light"
// line 147 refers to the gameNotes
import GameNotes from "./gameNotes";
import { songNotes, beatsPerMeasure } from "./song";



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
    this.note.colors[0] = 0xff595e; // Eggplant Purple
    this.note.colors[1] = 0xffca3a; // Dark Purple
    this.note.colors[2] = 0x8ac926; // Purple
    this.note.colors[3] = 0x1982c4; // light purp
    this.note.colors[4] = 0x6a4c93; // light light purp
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
          circle.material =  this.note.materials[4];
        } else {
          circle.material = this.note.materials[idx];
        }
      }, 100);

      this.scene.add(circle);
    });
  }

  // add note attributes is above
  // we need to add moving notes after pressing s

  addMovingNotes(noteInterval) {
    let noteMaterial;

    this.gameNotes = new GameNotes(noteInterval, this.musicDelay, this.key);

    songNotes.forEach((songNote, idx) => {
      noteMaterial = this.note.materials[songNote.pos - 1];

      this.spheres[idx] = new THREE.Mesh(this.note.geometry, noteMaterial);

      let time =
        noteInterval * ((songNote.m - 1) * beatsPerMeasure + songNote.t);
      let lag = 0;

      // CREATE HOLDS
      if (songNote.hold) {
        let cylinderMaterial = this.note.materials[songNote.pos - 1];
        let cylinderGeometry = new THREE.CylinderGeometry(
          3.5,
          3.5,
          songNote.hold * this.note.vel * 30
        );
        this.cylinders[idx] = new THREE.Mesh(
          cylinderGeometry,
          cylinderMaterial
        );
        this.cylinders[idx].rotateX(this.xRotation);
      }

      this.addMovingBeatLine(songNote.m, noteInterval, lag);

      // POSITION & ADD TO SCENE NOTES & HOLDS & BeatLines
      setTimeout(() => {
        if (this.cylinders[idx]) {
          let hold = songNote.hold * 3;
          this.cylinders[idx].hold = hold;
          this.cylinders[idx].position.set(
            this.xPos[songNote.pos - 1],
            this.yStartPoint - hold * this.note.yVel,
            this.zStartPoint - hold * this.note.zVel
          );
          this.scene.add(this.cylinders[idx]);
        }
        this.scene.add(this.spheres[idx]);
        this.spheres[idx].position.set(
          this.xPos[songNote.pos - 1],
          this.yStartPoint,
          this.zStartPoint
        );
      }, time);
      // this.gameNotes.setNoteCheck(songNote, time);
    });
  };

  // this is the beat line for the moving notes

  addMovingBeatLine(measure, noteInterval, lag) {
    if (this.measures[this.measures.length - 1] < measure) {
      this.measures.push(measure);
      let onBeatLineMaterial = new THREE.MeshBasicMaterial({ color: 0x999999 });
      let offBeatLineMaterial = new THREE.MeshBasicMaterial({
        color: 0x3b3b3b,
      });
      let beatLineGeometry = new THREE.CylinderGeometry(
        0.25,
        0.25,
        this.xPos[4] - this.xPos[0] + 50
      );
      for (let t = 1; t < 9; t++) {
        let time = lag + noteInterval * ((measure - 1) * beatsPerMeasure + t);
        let idx = measure * beatsPerMeasure + t;
        if (t % 2 === 0) {
          this.beatLines[idx] = new THREE.Mesh(
            beatLineGeometry,
            offBeatLineMaterial
          );
        } else {
          this.beatLines[idx] = new THREE.Mesh(
            beatLineGeometry,
            onBeatLineMaterial
          );
        }

        setTimeout(() => {
          this.scene.add(this.beatLines[idx]);
          this.beatLines[idx].position.set(
            0,
            this.yStartPoint,
            this.zStartPoint
          );
          this.beatLines[idx].rotateZ(Math.PI / 2);
        }, time);
      }
    }
  }

  sceneUpdate() {
    this.spheres.forEach((sphere) => {
      sphere.position.y += this.note.yVel;
      sphere.position.z += this.note.zVel;
      if (sphere.position.z > this.zEndPoint) {
        this.scene.remove(sphere);
      }
    });
    this.cylinders.forEach((cylinder) => {
      if (cylinder) {
        cylinder.position.y += this.note.yVel;
        cylinder.position.z += this.note.zVel;
        if (
          cylinder.position.z >
          this.zEndPoint + cylinder.hold * this.note.zVel
        ) {
          this.scene.remove(cylinder);
        }
      }
    });
    this.beatLines.forEach((beatLine) => {
      if (beatLine) {
        beatLine.position.y += this.note.yVel;
        beatLine.position.z += this.note.zVel;
        if (beatLine.position.z > this.zEndPoint) {
          this.scene.remove(beatLine);
        }
      }
    });
  }

  sceneRender() {
    this.renderer.render(this.scene, this.camera);
  }

  gameLoop() {
    requestAnimationFrame(this.gameLoop.bind(this));

    this.sceneUpdate();
    this.sceneRender();
  }
};



export default GameView;