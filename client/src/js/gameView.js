// import * as THREE from "three";
const Game = require("./game")

function GameView(game, ctx) {
  // debugger
  this.game = game;
  this.ctx = ctx;
  this.keys = this.game.keys;
  
}


export default GameView;