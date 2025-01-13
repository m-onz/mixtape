
const parsePattern = require('./parser.js');

// Simple assertion function
function assertEqual(actual, expected, message) {
    const result = JSON.stringify(actual) === JSON.stringify(expected);
    if (!result) {
        console.error(`❌ ${message}: Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(actual)}`);
    } else {
        console.log(`✅ ${message}`);
    }
}

// Helper function to check if two arrays are permutations of each other
function assertPermutation(actual, expected, message) {
    const sortedActual = actual.slice().sort();
    const sortedExpected = expected.slice().sort();
    const result = JSON.stringify(sortedActual) === JSON.stringify(sortedExpected);
    if (!result) {
        console.error(`❌ ${message}: Expected a permutation of ${JSON.stringify(expected)}, but got ${JSON.stringify(actual)}`);
    } else {
        console.log(`✅ ${message}`);
    }
}

// Test cases
function runTests() {
    assertEqual(parsePattern('- - -*3 - 5 - - - 6*7 7 - - 8*3 -'), ['-', '-', '-', '-', '-', '-', 5, '-', '-', '-', 6, 6, 6, 6, 6, 6, 6, 7, '-', '-', 8, 8, 8, '-'], 'Complex pattern with rests and repeats');
    assertEqual(parsePattern('0 - [ 1 2 3 ]*3'), [0, "-", 1, 2, 3, 1, 2, 3, 1, 2, 3], 'Grouped repeats with leading number');
    assertEqual(parsePattern('60*4 62*2'), [60, 60, 60, 60, 62, 62], 'Repeated notes');

    assertEqual(parsePattern('60 62 64 - 67'), [60, 62, 64, '-', 67], 'Basic sequence');
    assertEqual(parsePattern('60*4'), [ 60, 60, 60, 60 ], 'Repeated notes with leading rest');
    assertEqual(parsePattern('[60 62 64]*2'), [60, 62, 64, 60, 62, 64], 'Grouped repeats');

    // Scramble test: Check if the result is a permutation of [1, 2, 3]
    const scrambleResult = parsePattern('scramble [1 2 3]');
    assertPermutation(scrambleResult, [1, 2, 3], 'Scrambled group');

    assertEqual(parsePattern('invert50 [60 62 64]'), [40, 38, 36], 'Inverted group');
    assertEqual(parsePattern('scale2 [60 - 62 - 64]'), [120, '-', 124, '-', 128], 'Scaled group with rests');
    assertEqual(parsePattern('offset5 [60 62 - 64]'), [65, 67, '-', 69], 'Offset group with rest');
    assertEqual(parsePattern('mirror [60 62 - 64]'), [60, 62, '-', 64, '-', 62, 60], 'Mirrored group with rest');
    assertEqual(parsePattern('repeat2 [60 62 - 64]'), [60, 60, 62, 62, '-', '-', 64, 64], 'Repeat within group with rest');
    assertEqual(parsePattern('quantize10 [63 - 67 72]'), [60, '-', 70, 70], 'Quantized group with rest');

    // Complex patterns
    assertEqual(parsePattern('[60 62 64]*2 - [1 2 3]*2'), [60, 62, 64, 60, 62, 64, '-', 1, 2, 3, 1, 2, 3], 'Grouped repeats with rest');
    assertEqual(parsePattern('scale2 [60 62] mirror [1 2]'), [120, 124, 1, 2, 1], 'Scale and mirror');

    // Offset and scramble: Check if the result is a permutation of [6, 7, 8]
    //const offsetScrambleResult = parsePattern('offset5 scramble [1 2 3]');
    //assertPermutation(offsetScrambleResult, [6, 7, 8], 'Offset and scramble');

    assertEqual(parsePattern('invert50 [60 62] repeat2 [1 2]'), [40, 38, 1, 1, 2, 2], 'Invert and repeat within');

    // Quantize and scramble: Check if the scrambled part is a permutation of [1, 2]
    const quantizeScrambleResult = parsePattern('quantize10 [63 67] scramble [1 2]');
    assertEqual(quantizeScrambleResult.slice(0, 2), [60, 70], 'Quantize part');
    assertPermutation(quantizeScrambleResult.slice(2), [1, 2], 'Scramble part');
}

// Run the tests
runTests();
