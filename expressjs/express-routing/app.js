let express = require('express');
let birds = require('./birds');

var app = express();
const port = 3000;

app.use('/birds', birds);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`)
});