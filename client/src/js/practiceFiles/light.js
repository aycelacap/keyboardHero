import * as THREE from "three";

class Light {
  constructor(scene) {
    this.scene = scene;
  }

  addLights() {
    let lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 0.9, 10000);
    lights[0].position.set(0, 300, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 2000);
    lights[1].position.set(0, 200, 100);
    lights.forEach((light) => this.scene.add(light));
  }

  addMovingLights() {
    this.movingLights = [];
    // this.movingLights[0] = new THREE.PointLight( 0xFFFFFF, .5, 10000);
    // this.movingLights[0].position.set(0, 300, 0);
    this.movingLights[0] = new THREE.SpotLight(0xffffff, 1, 5000, 0.5);
    this.movingLights[0].position.set(200, 0, 0);
    this.movingLights.forEach((light) => this.scene.add(light));
  }
}

export default Light;
