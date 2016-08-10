var parse = require('comment-parser'),
    recursive = require('recursive-readdir'),
    fs = require('fs'),
    path = require('path'),
    date = new Date().toDateString(),
    time = new Date().toLocaleTimeString(),
    commentTags = '',
    // Configuration
    config = {
        scssDirectory: '/scss/theme'
    };

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

    // Write commentTags to a file (comment this out if using nodemon)
    // fs.writeFile(__dirname + '/js/commentJson/comments.json', commentTags, function(err) {
    //     if (err) {
    //         return console.log(err);
    //     } else {
    //         return console.log('Successfully wrote file.');
    //     }
    // });

    _extractComponentMarkup(commentTags);
}

// Extract markup for each component, to assemble code snippets
function _extractComponentMarkup(jsonString) {
    var jsonObject = JSON.parse(jsonString);

    jsonObject.forEach(function(component) {
        component.tags.forEach(function(tag) {
            if (tag.type === 'Code') {
                var codeSample = tag.description,
                    codeSampleFormatted = codeSample.replace(/---]/g, '    ');

                console.log(codeSampleFormatted);
            }
        });
    });

    // TODO: Assemble code snippets
}

// TODO: Render documentation from comment JSON
