var express = require('express');
var locationRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var router = function() {
	locationRouter.route('/')
		.get(function(req, res) {
			var url = "mongodb://localhost:27017";

			mongodb.connect(url, function(err, client) {
				const db = client.db('mynodetestapp');
				var collection = db.collection('rsvps');

				collection.find({}).toArray(function(err, results) {
					res.render('locationsView', {
						title: 'Locations',
						rsvps: results
					});
				});
			});
		});

	return locationRouter;
}

module.exports = router;