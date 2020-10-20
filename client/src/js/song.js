export const beatsPerMeasure = 8;

import songIntro from "./songs/songIntro";
import songVerse from "./songs/songVerse";
import songChorus from "./songs/songChorus1";
import songSolo from "./songs/songSolo";

export const songNotes = songIntro.concat(songVerse, songChorus, songSolo);
