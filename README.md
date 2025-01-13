# mixtape

A live coding object for pure data (Pd) useful for algorithmic music and visuals.

## Overview

This is a live coding object for Pure data (Pd) and GEM.

## what is a mixtape?

mixtape is an approach to algoritmic music or visual composition based on the concept of messages (or tapes) that can be fed into sequencing objects.

The concept is incredibly simple, tapes are simply messages that contain hyphens (rests) and numbers. 

```
- - 1 2 3 4 - - 4
```

This becomes a list/message that can be fed into else/sequencer or mseq (basically a sequencing object that iterates through the message).

mixtape allows you to create more complex patterns and outputs a list of either rests or numbers. eg.

```
- 1 2 4*3 [ 1 2 ]*3 scramble [ 1 2 - 3 4 ]  
```

numbers can be used as MIDI numbers, parameters or just numbers for any purpose.

## Comparison to tidalcycles mini notation

This object has no opinions on where you feed the "tape" message into and because its only concerned with a single instrument so there is no need to reference multiple instruments or worry about high level orchestration or control. It's incredibly simple (by design) and surprising powerful and flexible for algorithmic composition.

## Dependencies

It relies on `pdjs` that can be installed easily via dekken.

## Run tests

```js
node test.js
```

## What do I do with the output?

You will need to feed it into a sequencer object. See the "mseq-example.pd" file for an example.

## difference between mseq and mseq2

mseq will run the tape with each mseq instance running it when banged but each instance can run the pattern out of sync, banging a tape will cause it to restart from scratch. mseq2 will syncronise the tape across many instances so if you run the tape across many mseq2 it doesn't matter when you bang the message they stay in sync. So if you have a pattern `1 2 3 1 with mseq2 you can bang each tape but each object will output in sync. Depending on whether you want polyrhythms or interesting counterpoint you may opt for different objects.
