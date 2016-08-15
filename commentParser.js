/*
 * This file parses all JSdoc-style comments from var config.scssDirectory, and outputs
 * `./docs/scssComments.json`, which is used to render React docs in `./docs/index.html` as
 * well as passing the data to `./snippetConverter.js` which constructs the code snippets
 * & saves them to `./code_snippets/phpstorm`, `./code_snippets/sublime` & `./code_snippets/vim`
*/
var parse = require('comment-parser'),
    recursive = require('recursive-readdir'),
    fs = require('fs'),
    path = require('path'),
    snippetConverter = require('./snippetConverter'),
    date = new Date().toDateString(),
    time = new Date().toLocaleTimeString(),
    commentTags = '',
    config = {
        scssDirectory: '/scss/theme' // Directory to search for all .scss files
    };

// Loop through all .scss files in directory, ignoring .DS_Store files
recursive(__dirname + config.scssDirectory, ['.DS_Store'], function(err, files) {
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

    // Generate autocomplete code snippets
    snippetConverter.convert(JSON.parse(commentTags));
}
