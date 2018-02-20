var express = require('express');
var mainRouter = express.Router();

var router = function() {

	var mainController = require('../controllers/mainController')();

	mainRouter.route('/')
		.get(mainController.getIndex);

	return mainRouter;
}

module.exports = router;