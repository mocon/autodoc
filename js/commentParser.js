var parse = require('comment-parser'),
    fs = require('fs'),
    path = require('path'),
    date = new Date().toDateString(),
    time = new Date().toLocaleTimeString(),
    test,
    content = fs.readFileSync(path.join(__dirname, '../scss/theme/_footer.scss'), 'utf8');

console.log(`${date}, ${time} - Parsing Scss comments`);

// TODO: Loop through all .scss files in directory

// Parse comments to JSON
test = JSON.stringify(parse(content));

// Trim [] off JSON
console.log(test.slice(1, -1));

// TODO: Concatenate JSON objects together, comma separated, and enclose in []

// Write test to a file
// fs.writeFile(__dirname + '/commentJson/test.json', test, function(err) {
//     if (err) {
//         return console.log(err);
//     } else {
//         return console.log('Successfully wrote file.');
//     }
// });
