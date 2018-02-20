var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var mainController = function() {

	var getIndex = function(req, res) {
		var url = "mongodb://localhost:27017";

		mongodb.connect(url, function(err, client) {
			const db = client.db('mynodetestapp');
			var collection = db.collection('rsvps');

			collection.find({}).toArray(function(err, results) {
				var dbRecords = JSON.stringify(results);
				res.render('index', {
					title: 'where is everyone',
					rsvps: results,
					dbRecords: dbRecords
				});
			});
		});
	};


	return {
		getIndex: getIndex
	}
}

module.exports = mainController;