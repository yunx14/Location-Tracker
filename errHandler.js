module.exports = function() {
	return function(err, req, res, next) {
		console.log(err.stack);
		res.status(500).send('something broke');
	}
};