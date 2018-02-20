var express = require('express');
var signinRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var router = function() {
	signinRouter.route('/signin')
		.post(function(req, res) {
			var url = 'mongodb://localhost:27017';

			mongodb.connect(url, function(err, client) {
				const db = client.db('mynodetestapp');
				const collection = db.collection('rsvps');
				var rsvp = {
					first_name: req.body.firstName,
					last_name: req.body.lastName,
					email: req.body.email,
					gender: req.body.gender,
					city: req.body.city,
					state: req.body.state,
					latitude: req.body.latitude,
					longitude: req.body.longitude,
				};

				collection.insert(rsvp, function(err, results) {
					console.log(results);
					res.redirect('/index');
				});
			});
		});

	return signinRouter;
}

module.exports = router;