function Game() {
  this.keys = [];
  this.notes = [];
  this.score = 0;
  // this.song = new Score(this);
  // this.setUp();
  // document.addEventListener("keydown", this.keyDownTextField.bind(this), false);
}

// dimensions of the canvas
Game.DIMX = 600;
Game.DIMY = 800; 
Game.MOVES = ["q", "w", "e", "r"];
Game.KEYCODE = [81, 87, 69, 82];
Game.COMBO = { 81: "q", 87: "w", 69: "e", 82: "r" };

// Game.prototype.keyDownTextField = function (e) {
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