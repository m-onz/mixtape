
var patterns = require('patterns.js').patterns

inlets = 1;
outlets = 1;

name = "pattern_bank";

function bang() {
    outlet(0, "bang called");
}

function msg_float(f) {
  var index = parseInt(f)
  //outlet(0, Array.from(patterns[index % patterns.length].split(' ')))
   outlet(0, patterns[index % patterns.length].replace(/\\/g, ''))
}
