import { songNotes, beatsPerMeasure } from "./song";
import GameView from "./gameView";
import Key from "./key"

class GameNotes {
  constructor(noteInterval, musicDelay, key) {
    this.noteInterval = noteInterval;
    this.musicDelay = musicDelay;
    this.key = key;
    // this.scene = scene;
    // this.cylinderMaterials = this.gameView.note.colors[5];

    this.scoreEl = document.getElementsByClassName("score")[0];
    this.maxStreakEl = document.getElementsByClassName("max-streak")[0];
    this.streakEl = document.getElementsByClassName("streak")[0];
    this.multiplierEl = document.getElementsByClassName("multiplier")[0];
    this.gameProgressEl = document.getElementsByClassName("game-progress")[0];
    this.rockInputEl = document.getElementsByClassName("rock-input")[0];

    this.score = 0;
    this.maxStreak = 0;
    this.streak = 0;
    this.multiplier = 1;
    this.hits = 0;
    this.misses = 0;
    this.totalNotes = 0;
    this.rockInput = 0;
  }

  setNoteCheck(songNote, time) {
    let timeDelay = 500 + this.musicDelay + time;

    setTimeout(() => this.checkNote(songNote), timeDelay);
  }

  checkNote(songNote) {

    //  if clicked on songNote {
          // if clicked on sphere
            // if click and release (immediately)
              // change color to white and add score 
            // else if click and hold
              // while heldDuration < songNote.hold
                // increment score ++
                // heldDuration 
          // else if clicked on cylinder
              // return
    //  } else {
            // return 
    //  }

    // console.log("key:", this.key);
    // console.log(songNotes);
    // if (this.key.isDown(this.key.pos[songNotes.hold])) {
    //   // let cylinderMaterials = this.gameView.note.colors[5];
    //   let cylinderMaterials = 0xffffff;
    //   console.log("if statement")
    //   this.gameView.scene.add(cylinderMaterials);
    // };

    if (this.key.isDown(this.key.pos[songNote.pos])) {
      // debugger
      if (this.streak === 30) {
        this.multiplier = 4;
      } else if (this.streak === 20) {
        this.multiplier = 3;
      } else if (this.streak === 10) {
        this.multiplier = 2;
      }

      this.score += 100 * Number(this.multiplier);
      this.hits += 1;
      this.streak += 1;
      if (this.rockInput < 20) {
        this.rockInput += 1;
      }
    } else {
      console.log("else")
      // debugger
      this.streak = 0;
      this.misses += 1;
      this.multiplier = 1;
      if (this.rockInput > -20) {
        this.rockInput -= 1;
      }
      if (this.rockInput < -10) {
        this.gameProgressEl.className = "game-progress red";
        setTimeout(() => {
          this.gameProgressEl.className = "game-progress";
        }, 75);
      }
    }

    if (this.rockInput > 19) {
      this.gameProgressEl.className = "game-progress green";
    } else if (this.rockInput > 10) {
      this.gameProgressEl.className = "game-progress yellow";
    } else if (this.rockInput > -10 && this.rockInput < 10) {
      this.gameProgressEl.className = "game-progress";
    }

    if (this.streak > this.maxStreak) {
      this.maxStreak = this.streak;
    }

    this.totalNotes += 1;

    this.scoreEl.innerHTML = `Score: ${this.score}`;
    this.maxStreakEl.innerHTML = `Max Streak: ${this.maxStreak}`;
    // this.streakEl.innerHTML = `Streak: ${this.streak}`;
    // this.multiplierEl.innerHTML = `Multiplier: ${this.multiplier}X`;
    this.rockInputEl.value = this.rockInput;
  };
};

export default GameNotes;