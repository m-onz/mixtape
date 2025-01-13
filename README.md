# mixtape

live coding object for pure data (Pd) for algorithmic music and visuals.

## Overview

This is a live coding object for Pure data (Pd) and GEM.

## what is a mixtape?

mixtape is an approach to algoritmic music or visual composition based on the concept of messages (or tapes) that can be fed into sequencing objects.

The concept is incredibly simple, tapes are simply messages that contain hyphens (rests) and numbers. 

```
- - 1 2 3 4 - - 4
```

This becomes a list/message that can be fed into else/sequencer or mseq (basically a sequencing object that iterates through the message).

mixtape allows you to create more complex patterns and outputs a list of either rests or numbers.

```
- 1 2 4*3 [ 1 2 ]*3 scramble [ 1 2 - 3 4 ]  
```

numbers can be used as MIDI numbers, parameters or just numbers for any purpose.

## Comparison to tidalcycles mini notation

This object has no opinions on where you feed the "tape" message into and because its only concerned with a single instrument there is no need to reference multiple instruments or worry about high level orchestration or control. It's incredibly simple (by design) and surprising powerful and flexible for algorithmic composition.

## Dependencies

It relies on `pdjs` that can be installed easily via dekken.

## Run tests

```js
node test.js
```

## What do I do with the output?

You will need to feed it into a sequencer object. See the "mseq-example.pd" file for an example.
