import * as THREE from "./three";
import Game from "./game"
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
    this.backgroundSetup();
  }




  backgroundSetup() {
    let backgroundGeometry = new THREE.BoxGeometry(2000, 1000, 1000);
    let backgroundMaterials = [
      "",
      "",
      "",
      "",
      "",
      new THREE.MeshPhongMaterial({
        // RANDOM: https://www.lifeandexperiences.com/wp-content/uploads/2019/10/stage-light.jpg
        // AWS: https://brewbottle-seeds.s3-us-west-1.amazonaws.com/stage.jpg
        // ANOTHER url: https://i.imgur.com/T0ALh6p.jpg?1
        map: new THREE.TextureLoader().load("./stage.jpg"),
        side: THREE.DoubleSide,
      }),
    ];

    // let backgroundMaterial = new THREE.MeshFaceMaterial(backgroundMaterials);
    let backgroundMaterial = new THREE.Mesh(backgroundMaterials);

    this.light = new Light(this.scene);
    this.light.addLights();

    let background = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
    this.scene.add(background);

    // Adding Lines (strings)
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
}

export default GameView;