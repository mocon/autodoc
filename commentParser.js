/*
 * This file parses all JSdoc-style comments from var config.sourceDirectory, and outputs
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
        sourceDirectory: '/scss/theme/' // Directory to search for all comment blocks
    };

// Loop through all files in sourceDirectory, ignoring .DS_Store files
recursive(__dirname + config.sourceDirectory, ['.DS_Store'], function(err, files) {
    console.log(`${date}, ${time} - Parsing source code comments...`);

    _extractComments(files); // Files is an array of filenames
});

// Extract comments from each file
function _extractComments(arr) {
    var filesToSearch = arr.length,
        taggedFiles = 0,
        files;

    commentTags += '[';

    arr.map(function(file, index) {
        var fileContent = fs.readFileSync(file, 'utf8'),
            stringFileContent = JSON.stringify(parse(fileContent)), // Parse comments to JSON
            trimmedToObject = stringFileContent.slice(1, -1); // Trim [] off JSON

        if (trimmedToObject) {
            taggedFiles++;
            commentTags += trimmedToObject + ',';
        }
    });

    commentTags = commentTags.slice(0, -1); // Remove last comma
    commentTags += ']';

    // Console feedback
    taggedFiles === 1 ? files = 'file' : files = 'files';
    console.log(`Searched ${filesToSearch} files in "${config.sourceDirectory}", found ${taggedFiles} tagged ${files}.`);

    // Write commentTags to a JSON file, to be used as React state for './docs/index.html' page
    fs.writeFile(__dirname + '/docs/scssComments.json', commentTags, function(err) {
        if (err) {
            return console.log(err);
        } else {
            return console.log('Successfully wrote docs JSON file.');
        }
    });

    // Generate autocomplete code snippets by passing commentTags to snippetConverter
    snippetConverter._formatComments(JSON.parse(commentTags));
}
