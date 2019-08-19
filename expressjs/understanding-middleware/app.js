let express = require('express');
let myMiddleware = require('./my-middleware');
let app = express();

// Let's first set up our middleware functions
var myLogger = function (req, res, next) {
    console.log('LOGGED');
    next();
}

var requestTime = function (req, res, next) {
    req.requestTime = new Date();
    next();
}

// Now, we tell the application which middleware functions we want to use.
app.use(myLogger);
app.use(requestTime);
app.use(myMiddleware({ option1: '1', option2: '2' }))

app.get('/', function(req, res) {
    var responseText = 'Hello World!<br>';
    responseText += '<small>Requested at: ' + req.requestTime.toDateString() 
        + ' ' + req.requestTime.toTimeString() + '</small>';
    res.send(responseText);
});

app.listen(3000);