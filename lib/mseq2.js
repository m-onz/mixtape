
inlets = 2;
outlets = 1;

var tape = [];
var counter = 0;

function bang() {
    var out = tape[counter++ % tape.length];
    if (!isNaN(out)) outlet(0, out);
}

function list() {
    if (inlet === 1) {
        tape = Array.from(arguments);
    }
}

function reset () {
  counter = 0
}
