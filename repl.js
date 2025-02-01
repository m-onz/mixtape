
var patterns = [
  "0 - - -",
  "-*3 -*16",
  "1 2 3 -*15",
  "-*5 1*3 2*2 3",
  "[1 2 3]*3",
  "-*31 [7 4 9 3*11]",
  "-*15 - - 3 4 5 3",
  "- *23 0",
  "-*33 - [3 - - - 4]",
  "-*3",
  "-*15 [1 2 3]*3",
  "-*11 [- 1 2]*2 3*4",
  "-*33 [1 [2 3]*2 4]*3",
  "-*11 1 [2 3]*2 4*3",
  "-*7 [1 2]*3 [3 4]*2",
  "-*55 [- 1]*3 [- 2]*2",
  "-*31 [1 [2 3]*2]*3 4*2"
]

const { spawn } = require('node:child_process');
const { createInterface } = require('node:readline');

// Create the child process
const ls = spawn('pdsend', ['6000', 'localhost', 'udp']);

// Set up stdout/stderr handlers
ls.stdout.on('data', (data) => {
  console.log(`${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`${data}`);
});

// Create readline interface
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '<mixtape> ',
});

rl.prompt();

var instruments = [ 'kick', 'snare', 'snare2', 'clap', 'hihat', 'hihat2', 'hihat3', 'openhihat', 'cymbal', 'cymbals2', 'fx', 'perc', 'perc2', 'misc', 'modular', 'wine-glass', 'ai4', 'aibass' ]

var perc_instruments = [ 'hihat', 'hihat2', 'hihat3', 'openhihat', 'perc', 'perc2', 'wine-glass']

rl.on('line', (line) => {
  const cmd = line.trim();
  // Forward input to pdsend

  //ls.stdin.write(`${instruments[Math.floor(Math.random()*instruments.length)]} ${patterns[Math.floor(Math.random()*patterns.length)]}\n`)

  //ls.stdin.write(`${cmd}\n`);

  if (cmd.startsWith('all')) {
    //ls.stdin.write(`${instruments[Math.floor(Math.random()*instruments.length)]} ${patterns[Math.floor(Math.random()*patterns.length)]}\n`)
    instruments.forEach(function (i) {
      ls.stdin.write(`${i} ${patterns[Math.floor(Math.random()*patterns.length)]}\n`)
    })
  } else if (cmd.startsWith('perc_all')) {
    //ls.stdin.write(`${instruments[Math.floor(Math.random()*instruments.length)]} ${patterns[Math.floor(Math.random()*patterns.length)]}\n`)
    perc_instruments.forEach(function (i) {
      ls.stdin.write(`${i} ${patterns[Math.floor(Math.random()*patterns.length)]}\n`)
    })
  } else if (cmd.startsWith('dnb')) {
    var sound = Math.floor(Math.random()*111)
    ls.stdin.write(`kick ${sound} -*9 ${sound} -*5, snare -*4 ${sound} -*3, clap -*4 ${sound} -*3;\n`)
  } else if (cmd.includes('rp')) {
    ls.stdin.write(cmd.replace(/rp/g, `${patterns[Math.floor(Math.random()*patterns.length)]}\n`))
  } else {
    ls.stdin.write(`${cmd}\n`);
  }
  
 /*
  switch (cmd) {
    case 'hello':
      console.log('world!');
      break;
    default:
      console.log(`Say what? I might have heard '${cmd}'`);
      break;
  }*/
  rl.prompt();
}).on('close', () => {
  console.log('Closing...');
  ls.kill(); // Cleanly exit the child process
  process.exit(0);
});
