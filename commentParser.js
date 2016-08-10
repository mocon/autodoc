var parse = require('comment-parser'),
    recursive = require('recursive-readdir'),
    fs = require('fs'),
    path = require('path'),
    date = new Date().toDateString(),
    time = new Date().toLocaleTimeString(),
    commentTags = '';

console.log(`${date}, ${time} - Parsing Scss comments`);

// Loop through all .scss files in directory
recursive(__dirname + '/scss/theme', ['.DS_Store'], function (err, files) {
    extractComments(files); // Files is an array of filenames
});

// Extract comments from each .scss file
function extractComments(arr) {
    commentTags += '[';

    arr.map(function(file, index) {
        var fileContent = fs.readFileSync(file, 'utf8'),
            stringFileContent = JSON.stringify(parse(fileContent)), // Parse comments to JSON
            trimmedToObject = stringFileContent.slice(1, -1); // Trim [] off JSON

        // Only separate with comma if it's not the last one
        index !== arr.length - 1 ? commentTags += trimmedToObject + ',' : commentTags += trimmedToObject;
    });

    commentTags += ']';

    // Write commentTags to a file
    fs.writeFile(__dirname + '/js/commentJson/comments.json', commentTags, function(err) {
        if (err) {
            return console.log(err);
        } else {
            return console.log('Successfully wrote file.');
        }
    });
}
