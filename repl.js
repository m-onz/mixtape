
class MusicalPatternGenerator {
    constructor() {
        this.patternCache = new Map();
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    generateSimplePattern(length = 16) {
        const elements = [];
        for (let i = 0; i < length; i++) {
            if (Math.random() > 0.5) { // 50% chance for number
                elements.push(this.getRandomInt(99) + 1);
            } else { // 70% chance for rest
                elements.push('-*'+Math.floor(Math.random()*7));
            }
        }
        return elements.join(' ');
    }

    generateComplexPattern() {
        const patterns = [
            () => `- ${this.generateSimplePattern(4)} [ ${this.getRandomInt(3) + 1}]`,
            () => `${this.generateSimplePattern(3)} [ ${this.generateSimplePattern(3)} ]*${this.getRandomInt(2) + 1 }`,
            () => `[ ${this.generateSimplePattern(4)} ] ${this.generateSimplePattern(3)} [ ${this.getRandomInt(3) + 1} ]`,
            () => `${this.generateSimplePattern(2)} [ ${this.generateSimplePattern(3)}]*${this.getRandomInt(2) + 1} ${this.generateSimplePattern(2)}`
        ];
        return patterns[this.getRandomInt(patterns.length)]();
    }

    generatePattern(complexity = 'simple') {
        if (complexity === 'complex') {
            return this.generateComplexPattern();
        }
        return this.generateSimplePattern();
    }
}

// Create generator and show examples
const generator = new MusicalPatternGenerator();
/*
console.log("Simple patterns:");
for (let i = 0; i < 3; i++) {
    console.log(generator.generatePattern());
}

console.log("\nComplex patterns:");
for (let i = 0; i < 3; i++) {
    console.log(generator.generatePattern('complex'));
}
*/

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

//var instruments = [ 'kick', 'snare', 'snare2', 'clap', 'hihat', 'hihat2', 'hihat3', 'openhihat', 'cymbal', 'cymbals2', 'fx', 'perc', 'perc2', 'misc', 'modular', 'wine-glass', 'pad', 'riff', 'aibass', 'ai4', 'vocals' ]
var instruments = [ 'kick', 'snare', 'snare2', 'clap', 'hihat', 'hihat2', 'hihat3', 'openhihat' ]
var perc_instruments = [ 'perc', 'perc2', 'wine-glass']
var hihat_instruments = [ 'hihat', 'hihat2', 'hihat3', 'openhihat' ]
var cymbal_instruments = [ 'cymbal', 'cymbals2' ]
var misc_instruments = [ 'misc', 'modular', 'fx' ]
var ai_instruments = [ 'a4', 'aibass' ]


//`
//offset 0, pad 1 -*15, riff 1 -*15, aibass 4 -*62, vocal 6 -*124\n
//`

rl.on('line', (line) => {
  const cmd = line.trim();
  // Forward input to pdsend

  //ls.stdin.write(`${instruments[Math.floor(Math.random()*instruments.length)]} ${patterns[Math.floor(Math.random()*patterns.length)]}\n`)

  //ls.stdin.write(`${cmd}\n`);

  if (cmd.startsWith('s1')) {

  ls.stdin.write(`
  pad -, riff -, aibass -, vocal -,
  chords 79 -*5 78 -*7 78 -*5 78 -*3, bass ${generator.generatePattern()}, random_synth;\n

\n`)

  } else if (cmd.startsWith('s2')) {
   

  ls.stdin.write(`
  pad -, riff -, aibass -, vocal -,
  chords 50*11 51*30 52*15 54*15 55*30, bass ${generator.generatePattern()}, random_synth;\n
`)

  } else if (cmd.startsWith('s3')) {
   

  ls.stdin.write(`
  chords -, bass -, riff 0 -*15, aibass 0 -*15;\n
`)

  } else if (cmd.startsWith('s4')) {

ls.stdin.write(`
chords -, bass -,
offset 0, pad 1 -*15, riff 1 -*15, aibass 4 -*15, vocal 6 -*124\n
`
)


  } else if (cmd.startsWith('more_perc')) {

     ls.stdin.write(`hihat ${generator.generatePattern("complex")}\n`)
   ls.stdin.write(`hihat2 ${generator.generatePattern("complex")}\n`)
   ls.stdin.write(`hihat3 ${generator.generatePattern("complex")}\n`)
/*
  ls.stdin.write(`m1 hihat ${generator.generatePattern()}\n`)
   ls.stdin.write(`m1 hihat2 ${generator.generatePattern()}\n`)
   ls.stdin.write(`m1 hihat3 ${generator.generatePattern()}\n`)

  ls.stdin.write(`m2 hihat ${generator.generatePattern()}\n`)
   ls.stdin.write(`m2 hihat2 ${generator.generatePattern()}\n`)
   ls.stdin.write(`m2 hihat3 ${generator.generatePattern()}\n`)
*/
  ls.stdin.write(`perc ${generator.generatePattern()}\n`)
   ls.stdin.write(`perc2 ${generator.generatePattern()}\n`)
   ls.stdin.write(`misc ${generator.generatePattern()}\n`)


  } else if (cmd.startsWith('all_sp')) {
    instruments.forEach(function (i) {
      ls.stdin.write(`${i} ${generator.generatePattern()}\n`)
      //ls.stdin.write(`m1 ${i} ${generator.generatePattern()}\n`)
      //ls.stdin.write(`m1 ${i} ${generator.generatePattern()}\n`)
    })
   } else if (cmd.startsWith('all_cp')) {
    instruments.forEach(function (i) {
      ls.stdin.write(`${i} ${generator.generatePattern("complex")}\n`)
      //ls.stdin.write(`m1 ${i} ${generator.generatePattern("complex")}\n`)
      //ls.stdin.write(`m2 ${i} ${generator.generatePattern("complex")}\n`)
    })
   } else if (cmd.startsWith('ai_all')) {
      if (cmd.includes("sp")) {
      ai_instruments.forEach(function (i) {
        ls.stdin.write(`${i} ${generator.generatePattern()}\n`)
      })
    } else if (cmd.includes("cp")) {
      ai_instruments.forEach(function (i) {
        ls.stdin.write(`${i} ${generator.generatePattern("complex")}\n`)
      })
    }
  } else if (cmd.startsWith('cymbal_all')) {
      if (cmd.includes("sp")) {
        cymbal_instruments.forEach(function (i) {
        ls.stdin.write(`${i} ${generator.generatePattern()}\n`)
      })
    } else if (cmd.includes("cp")) {
      cymbal_instruments.forEach(function (i) {
        ls.stdin.write(`${i} ${generator.generatePattern("complex")}\n`)
      })
    }
  } else if (cmd.startsWith('misc_all')) {
      if (cmd.includes("sp")) {
        misc_instruments.forEach(function (i) {
        ls.stdin.write(`${i} ${generator.generatePattern()}\n`)
      })
    } else if (cmd.includes("cp")) {
      misc_instruments.forEach(function (i) {
        ls.stdin.write(`${i} ${generator.generatePattern("complex")}\n`)
      })
    }
  } else if (cmd.startsWith('hihat_all')) {
      if (cmd.includes("sp")) {
        hihat_instruments.forEach(function (i) {
        ls.stdin.write(`${i} ${generator.generatePattern()}\n`)
        //ls.stdin.write(`m1 ${i} ${generator.generatePattern()}\n`)
        //ls.stdin.write(`m2 ${i} ${generator.generatePattern()}\n`)
      })
    } else if (cmd.includes("cp")) {
      hihat_instruments.forEach(function (i) {
        ls.stdin.write(`${i} ${generator.generatePattern("complex")}\n`)
        //ls.stdin.write(`m1 ${i} ${generator.generatePattern("complex")}\n`)
        //ls.stdin.write(`m2 ${i} ${generator.generatePattern("complex")}\n`)
      })
    }
  } else if (cmd.startsWith('perc_all')) {
      if (cmd.includes("sp")) {
        perc_instruments.forEach(function (i) {
        ls.stdin.write(`${i} ${generator.generatePattern()}\n`)
      })
    } else if (cmd.includes("cp")) {
      perc_instruments.forEach(function (i) {
        ls.stdin.write(`${i} ${generator.generatePattern("complex")}\n`)
      })
    }

  } else if (cmd.startsWith('dnb')) {
    var sound = Math.floor(Math.random()*111)
    ls.stdin.write(`metro 88, kick ${sound} -*9 ${sound} -*5, snare -*4 ${sound} -*3, clap -*4 ${sound} -*3;\n`)
  
 }  else if (cmd.startsWith('house')) {
    //var sound = Math.floor(Math.random()*111)
    ls.stdin.write(`metro 111, kick 4 -*3, openhihat -*2 1 -*1, clap -*4 1 -*3, snare -*2 1 -*13, hihat -*11 [ 9 9 8 4 7 2 4 ], hihat2 -*22 [ 9*5 9 8 4 7 2 4 ], hihat3 0 -*7, perc 0 -*33 1 2 3 4 5 6, perc2 5 -*31 5*11, modular 19 -*15 7 -*15;\n`)
  } else if (cmd.includes('sp')) {
    ls.stdin.write(cmd.replace(/sp/g, `${generator.generatePattern()}\n`))
  } else if (cmd.includes('cp')) {
    ls.stdin.write(cmd.replace(/cp/g, `${generator.generatePattern("complex")}\n`))
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
