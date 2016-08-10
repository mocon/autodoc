var parse = require('comment-parser'),
    recursive = require('recursive-readdir'),
    fs = require('fs'),
    path = require('path'),
    date = new Date().toDateString(),
    time = new Date().toLocaleTimeString(),
    commentTags = '',
    tabSpaces = '',
    config = {
        scssDirectory: '/scss/theme', // Directory to search for all .scss files
        tabSpaces: 4
    };

// Tab spacing, from configuration
if (config.tabSpaces === 4) {
    tabSpaces = '    ';
} else if (config.tabSpaces === 2) {
    tabSpaces = '  ';
}

// Clear Terminal window before showing output
function _clearTerminalOutput() {
    console.reset = (function() {
        return process.stdout.write('\033c');
    })();
}

// Loop through all .scss files in directory, ignoring .DS_Store files
recursive(__dirname + config.scssDirectory, ['.DS_Store'], function(err, files) {
    _clearTerminalOutput();
    console.log(`${date}, ${time} - Parsing Scss comments`);

    _extractComments(files); // Files is an array of filenames
});

// Extract comments from each .scss file
function _extractComments(arr) {
    commentTags += '[';

    arr.map(function(file, index) {
        var fileContent = fs.readFileSync(file, 'utf8'),
            stringFileContent = JSON.stringify(parse(fileContent)), // Parse comments to JSON
            trimmedToObject = stringFileContent.slice(1, -1); // Trim [] off JSON

        // Only separate with comma if it's not the last one
        index !== arr.length - 1 ? commentTags += trimmedToObject + ',' : commentTags += trimmedToObject;
    });

    commentTags += ']';

    // Write commentTags to a JSON file, to be used as React state for './docs/index.html' page
    fs.writeFile(__dirname + '/docs/scssComments.json', commentTags, function(err) {
        if (err) {
            return console.log(err);
        } else {
            return console.log('Successfully wrote docs JSON file.');
        }
    });

    _extractComponentMarkup(JSON.parse(commentTags));
}

// Extract markup for each component, to assemble code snippets
function _extractComponentMarkup(json) {
    json.forEach(function(component) {
        component.tags.forEach(function(tag) {
            if (tag.type === 'Code') {
                var codeSample = tag.description,
                    codeSampleFormatted = codeSample.replace(/---]/g, tabSpaces);

                // TODO: Assemble code snippets
                // console.log(codeSampleFormatted);
            }
        });
    });
}
