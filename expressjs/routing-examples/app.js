let express = require('express');
var app = express();
const port = 3000;

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`)
});

// GET method route
app.get('/', function(req, res) {
    res.send('GET request to the homepage')
});

// POST method route
app.post('/', function (req, res) {
    res.send('POST request to the homepage');
});

app.all('/secret', function (req, res, next) {
    console.log('Accessing the secret section ...');
    next();
});

app.get('/random.text', function(req, res) {
    res.send('random.text');
});

// This route path will match abcd, abbcd, abbbcd
app.get('/ab+cd', function (req, res) {
    res.send('ab+cd');
});

// This route path will match abcd, abxcd, abdRANDOMcd, ab123cd
app.get('/ab*cd', function(req, res) {
    res.send('ab*cd');
});

// This route path will match /abe and /abcde
app.get('/ab(cd)?e', function(req, res) {
    res.send('abc(cd)?e');
});

// This route path will match /butterfly and /iloveflying
app.get(/.*fly$/, function(req, res) {
    res.send('/.*fly$/');
});

app.get('/users/:userId/books/:bookId', function (req, res) {
    res.send(req.params);
});

app.get('/flights/:from-:to', function(req, res) {
    res.send(req.params);
});

// A single callback function...
app.get('/example/a', function (req, res) {
    res.send('Hello from A!');
});

// Using more than one callback functions
app.get('/example/b', function (req, res, next) {
    console.log('the response will be sent by the next function ...');
    next();
}, function (req, res) {
    res.send('Hello from B!');
});

// An array of callback functions.
var cb0 = function (req, res, next) {
    console.log('CB0');
    next();
}

var cb1 = function (req, res, next) {
    console.log('CB1');
    next();
}

var cb2 = function (req, res, next) {
    res.send('Hello from C!');
}

app.get('/example/c', [cb0, cb1, cb2]);

// Using a combination of callback & independent functions
app.get('/example/d', [cb0, cb1], function (req, res, next) {
    console.log('the response will be sent by the next function ...');
    next();
}, function (req, res) {
    res.send('Hello from D!');
});

// Using app.route()
app.route('/book')
    .get(function (req, res) {
        res.send('Get a random book');
    })
    .post(function (req, res) {
        res.send('Add a book');
    })
    .put(function (req, res) {
        res.send('Update the book')
    })