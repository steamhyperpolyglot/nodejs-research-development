let express = require('express');
let app = express();

function logOriginalUrl(req, res, next) {
    console.log('Request URL: ', req.originalUrl);
    next();
}

function logMethod(req, res, next) {
    console.log('Request Type: ', req.method);
    next();
}

var logStuff = [logOriginalUrl, logMethod];
app.get('/user/:id', logStuff, function (req, res, next) {
    res.send('User Info');
});

app.listen(3000);