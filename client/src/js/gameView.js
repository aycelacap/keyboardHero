// import * as THREE from "three";
import Game from "./game"

class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.keys = this.game.keys;
  }
  
}


export default GameView;