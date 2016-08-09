var parse = require('comment-parser'),
    fs = require('fs'),
    path = require('path'),
    date = new Date().toDateString(),
    time = new Date().toLocaleTimeString(),
    test,
    content = fs.readFileSync(path.join(__dirname, '../scss/theme/_footer.scss'), 'utf8');

console.log(`${date}, ${time} - Parsing Scss comments`);

test = parse(content);

console.log(test);
