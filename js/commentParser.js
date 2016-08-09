var parse = require('comment-parser'),
    date = new Date().toDateString(),
    time = new Date().toLocaleTimeString(),
    test;

console.log(`${date}, ${time} - Parsing Scss comments`);

test = parse('../scss/theme/_footer.scss');

console.log(test);
