let express = require('express');
let router = express.Router();
let uuidv4 = require('uuid/v4');
let userModel = require('../models/users');
let messageModel = require('../models/messages');

/* GET users listing. */
router.get('/', function(req, res, next) {
	return res.send(Object.values(userModel.users));
});

router.get('/users/:userId', (req, res) => {
	return res.send(userModel.users[req.params.userId]);
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
	return res.send(Object.values(messageModel.messages));
});

router.get('/messages/:messageId', (req, res) => {
	return res.send(messageModel.messages[req.params.messageId]);
});

router.post('/messages', (req, res) => {
	//let messageText = req.body.text;
	const id = uuidv4();
	const message = {
		id,
		text: req.body.text,
		userId: req.body.userId,
	};
	
	messageModel.messages[id] = message;
	
	return res.send(message);
});

router.delete('/messages/:messageId', (req, res) => {
	const {
		[req.params.messageId]: message,
		...otherMessages
	} = messageModel.messages;

	messageModel.messages = otherMessages;

	return res.send(message);
});

module.exports = router;
