let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
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

module.exports = router;
