
var chords = require('chords.js').chords

inlets = 1;
outlets = 1;

name = "chord_bank";

function bang() {
    outlet(0, "bang called");
}

function msg_float(f) {
  var index = parseInt(f)
  outlet(0, Array.from(chords[index % chords.length].split(' ')).map((i) => parseInt(i)));
}
