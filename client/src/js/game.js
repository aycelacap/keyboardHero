import GameView from "./gameView"

class Game {
  constructor() {
    this.keys = [];
    this.notes = [];
    this.score = 0;
    // this.DIMX = 600;
    // this.DIMY = 800; 
    // this.MOVES = ["q", "w", "e", "r"];
    // this.KEYCODE = [81, 87, 69, 82];
    // this.COMBO = { 81: "q", 87: "w", 69: "e", 82: "r" };
    // this.song = new Score(this);
    // this.setUp();
    // document.addEventListener("keydown", this.keyDownTextField.bind(this), false);
  }
  // refer to this as this.keyDown
  // keyDown(e) {
  //   let keyCode = e.keyCode;
  //   if (Game.KEYCODE.includes(keyCode)) {
  //     var whichkey = Game.COMBO[keyCode];
  //     this.keys.forEach(function (key) {
  //       if (key.move === whichkey) {
  //         key.pos[1] = key.pos[1] + 4;
  //       }
  //     });
  //     // this.checkCollison(keyCode);
  //   }
  // };
}

export default Game;