let express = require('express');
let app = express();

/*
app.get('/', function (req, res) {
    throw new Error('BROKEN');      // Express will catch this on its own.
});
*/

/* Let's set a timeout error.
app.get('/', function (req, res, next) {
    setTimeout(function() {
        try {
            throw new Error('BROKEN');
        } catch (err) {
            next(err);
        }
    }, 100);
});
*/

// Now, let's use promises
app.get('/', function (req, res, next) {
    Promise.resolve().then(function() {
        throw new Error('BROKEN');
    }).catch(next);  // Errors will be passed to Express.
});

app.listen(3000);