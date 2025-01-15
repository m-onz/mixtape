# mixtape

## Screenshot

<img src="screenshot.png" loading="lazy" style="width:100%" />

## Overview

A live coding toolkit for algorithmic music and visual composition in Pure data (Pd) and GEM. 

## install

Add the "mixtape/lib" folder to the Pd path:

file -> preferences -> edit preferences -> new (add a new path).

## status

More objects and examples being adding, the parser is currently a bit buggy but it will eventually allow for complex patterns.

## what is a mixtape?

mixtape is an approach to algorithmic music or visual composition based on the concept of messages (or tapes) that can be fed into sequencing objects.

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

## pattern syntax

## rests

`-`

## numbers

`1`

## a pattern with rests & numbers

`1 - 2 3 4`

## repeat a group

Repeats the group twice

`[1 2 4]*2`

## repeat single values including rests

`-*3 7 8 9 - - 9*2`

## scramble

`scramble [ 1 2 - 4 ]`

## scale

`scale3 [ 1 2 3 ]`

## offset

`offset11 [ 1 2 3 ]`

## mirror

`mirror [ 5 4 3 ]`

## repeat

`repeat2 [ 1 2 3 ]`

## quantize

`quantize10 [ 1 2 3 ]`

You can provide a different value to quantize for example `quantize3` and the same applies to the other transformations.

## Dependencies

It relies on `pdjs` that can be installed easily via dekken.

## Run tests

```js
node test.js
```

## What do I do with the output?

You will need to feed it into a sequencer object. See the "mseq-example.pd" file for an example.

## difference between mseq and mseq2

mseq doesn't keep messages in sync across instances whereas mseq2 does.
