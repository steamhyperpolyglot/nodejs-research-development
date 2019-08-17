let express = require('express');
let router = express.Router();
let uuidv4 = require('uuid/v4');

let users = {
	1: {
		id: '1',
		username: 'Sherman Chen',
	},
	2: {
		id: '2',
		username: 'Lucas Poh',
	},
};

let messages = {
	1: {
		id: '1',
		text: "Hello World",
		userId: '1',
	},
	2: {
		id: '2',
		text: "By World",
		userId: '2',
	},
};

/* GET users listing. */
router.get('/', function(req, res, next) {
  return res.send(Object.values(users));
});

router.get('/users/:userId', (req, res) => {
	return res.send(users[req.params.userId]);
});

router.post('/', (req, res) => {
	return res.send('POST HTTP method on user resource');
});

router.put('/:userId', (req, res) => {
	return res.send(`PUT HTTP method on users/${req.params.userId} resource`);
});

router.delete('/:userId', (req, res) => {
	return res.send(`DELETE HTTP method on users/${req.params.userId} resource`);
});

router.get('/messages', (req, res) => {
	return res.send(Object.values(messages));
});

router.get('/messages/:messageId', (req, res) => {
	return res.send(messages[req.params.messageId]);
});

router.post('/messages', (req, res) => {
	//let messageText = req.body.text;

	const id = uuidv4();
	const message = {
		id,
		text: req.body.text
	};
	
	messages[id] = message;
	
	return res.send(message);
});

module.exports = router;
