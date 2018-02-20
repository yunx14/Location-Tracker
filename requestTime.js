module.exports = function() {
	return function(req, res, next) {
		req.requestTime = Date.now()
		next();
	}
}