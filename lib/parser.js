exports.parser = parsePattern
if (typeof module === 'object') {
  module.exports = parsePattern
}

if (typeof post !== 'function') function post(m) { console.log(m); }

function parsePattern(pattern) {
    let outputPattern = [];
    // Adjusted regex to better handle numbers and groups, including leading numbers
    //let tokens = pattern.match(/(\d+|\w+\s*\[.*?\]|\[\s*[\d\s-]+\]\*\d+|\[\s*[\d\s-]+\]|\S+)/g);

    let tokens = pattern.match(/(\w+\s*\[.*?\]|\[.*?\]\*\d+|\[.*?\]|\S+)/g);

    if (!tokens) {
        console.error("No valid tokens found");
        return [];
    }

    tokens.forEach(token => {

        if (!isNaN(token)) {
            outputPattern.push(parseInt(token));
        }
        // Handle scramble transformation
        else if (token.startsWith('scramble')) {
            let groupContent = token.slice(token.indexOf('[') + 1, -1);
            let groupPattern = parsePattern(groupContent);
            outputPattern = outputPattern.concat(shuffleArray(groupPattern));
        }
        // Handle invert transformation
        else if (token.startsWith('invert')) {
            let match = token.match(/invert(\d+)/);
            if (match) {
                let midpoint = parseInt(match[1]);
                let groupContent = token.slice(token.indexOf('[') + 1, -1);
                let groupPattern = parsePattern(groupContent).map(note => note === '-' ? '-' : midpoint - (note - midpoint));
                outputPattern = outputPattern.concat(groupPattern);
            }
        }
        // Handle scale transformation
        else if (token.startsWith('scale')) {
            let match = token.match(/scale(\d+)/);
            if (match) {
                let scaleFactor = parseInt(match[1]);
                let groupContent = token.slice(token.indexOf('[') + 1, -1);
                let groupPattern = parsePattern(groupContent).map(note => note === '-' ? '-' : note * scaleFactor);
                outputPattern = outputPattern.concat(groupPattern);
            }
        }
        // Handle offset transformation
        else if (token.startsWith('offset')) {
            let match = token.match(/offset(\d+)/);
            if (match) {
                let offsetValue = parseInt(match[1]);
                let groupContent = token.slice(token.indexOf('[') + 1, -1);
                let groupPattern = parsePattern(groupContent).map(note => note === '-' ? '-' : note + offsetValue);
                outputPattern = outputPattern.concat(groupPattern);
            }
        }
        // Handle mirror transformation
        else if (token.startsWith('mirror')) {
            let groupContent = token.slice(token.indexOf('[') + 1, -1);
            let groupPattern = parsePattern(groupContent);
            outputPattern = outputPattern.concat(groupPattern, groupPattern.slice(0, -1).reverse());
        }
        // Handle repeat within transformation
        else if (token.startsWith('repeat')) {
            let match = token.match(/repeat(\d+)/);
            if (match) {
                let repeatCount = parseInt(match[1]);
                let groupContent = token.slice(token.indexOf('[') + 1, -1);
                let groupPattern = parsePattern(groupContent).flatMap(note => Array(repeatCount).fill(note));
                outputPattern = outputPattern.concat(groupPattern);
            }
        }
        // Handle quantize transformation
        else if (token.startsWith('quantize')) {
            let match = token.match(/quantize(\d+)/);
            if (match) {
                let quantizeValue = parseInt(match[1]);
                let groupContent = token.slice(token.indexOf('[') + 1, -1);
                let groupPattern = parsePattern(groupContent).map(note => note === '-' ? '-' : Math.round(note / quantizeValue) * quantizeValue);
                outputPattern = outputPattern.concat(groupPattern);
            }
        }
        // Handle group with repeat syntax
        else if (token.includes(']*')) {
            let [group, repeat] = token.split('*');
            let groupContent = group.slice(1, -1);
            let groupPattern = parsePattern(groupContent);
            for (let i = 0; i < parseInt(repeat); i++) {
                outputPattern = outputPattern.concat(groupPattern);
            }
        }
        // Handle group without repeat
        else if (token.startsWith('[') && token.endsWith(']')) {
            let groupContent = token.slice(1, -1);
            let groupPattern = parsePattern(groupContent);
            outputPattern = outputPattern.concat(groupPattern);
        }

        else if (token.includes('*')) {
            let [value, repeat] = token.split('*');
            if (value === '-') {
                outputPattern = outputPattern.concat(Array(parseInt(repeat)).fill('-'));
            } else if (!isNaN(value)) {
                outputPattern = outputPattern.concat(Array(parseInt(repeat)).fill(parseInt(value)));
            } else {
                console.error(`Invalid repeat value: ${value}`);
            }
        }

        // Handle rest
        else if (token === '-') {
            outputPattern.push('-');
        }
        // Handle numbers
        else {
            let parsedToken = parseInt(token);
            if (!isNaN(parsedToken)) {
                outputPattern.push(parsedToken);
            } else {
                console.error(`Invalid token: ${token}`);
            }
        }
    });

    return outputPattern;
}

// Helper function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
