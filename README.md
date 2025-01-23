
# mixtape

# Description

mixtape is an audio visual live coding environment build using Pure data and (GEM).

# Overview

Typically live coding or live patching deals with either audio OR visuals but rarely together. Other environments combine seperate tech to achieve this for example combining tidalcycles with hydra.

I have been working on audio visuals and algorithmic music and visuals in Pure data and GEM for a long time and recently I have figured out a way to control audio and visuals using the same live coding or pattern system.

# The mixtape concept

The "mixtape" or "tape" is simply a message consisting of either hyphens or numbers for example: "- - - 3"

A sequencer object will iterate this list producing either a rest or a number because hyphens indicate a rest.

The number outputted can be any control number or parameter for example MIDI notes.

# a high level pattern language

Using the "pdjs" external available via dekken (Pds extension manager) available through the menu. It's possible to create objects that have javascript code. I created a very basic parser that takes patterns like "-*3 [ 2 3 - 3]*3" and converts it into a tape or mesage of hyphens or numbers.

This means that you can create complex patterns in a more terse syntax that become more longer tapes ready for consumption by sequencing objects.



