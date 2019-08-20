let express = require('express');
let app = express();

let router = express.Router();

// a middleware function with no mount path. This code is executed for every request to the router.
router.use(function (req, res, next) {
    var now_timestamp = new Date();
    console.log('Time: ', now_timestamp.toDateString(), ' ', now_timestamp.toTimeString());
    next();
});

// a middleware sub-stack shows request info for any type of HTTP reqyest to the /user/:id path
router.use('/user/:id', function (req, res, next) {
    console.log('Request URL:', req.originalUrl);
    next();
}, function (req, res, next) {
    console.log('Request Type: ', req.method);
    next();
});

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get('/user/:id', function (req, res, next) {
    // if the user ID is 0, skip to the next router
    if (req.params.id === '0') next('route')
    // otherwise pass control to the next middleware function in this stack
    else next();
}, function (req, res, next) {
    // render a regular page
    res.send('regular');
});

// handler for the /user/:id path, which renders a special page
router.get('/user/:id', function (req, res, next) {
    console.log(req.params.id);
    res.send('special');
});

// mount the router on the app
app.use('/', router);

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(3000);