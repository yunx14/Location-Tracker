var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var rsvp = [{"id":1,"first_name":"Dosi","last_name":"Evert","email":"devert0@earthlink.net","gender":"Female","city":"Montgomery","state":"Alabama","latitude":"32.3544","longitude":"-86.2843"},{"id":2,"first_name":"Lucais","last_name":"Cockayme","email":"lcockayme1@netvibes.com","gender":"Male","city":"Columbus","state":"Georgia","latitude":"32.5161","longitude":"-84.9785"},{"id":3,"first_name":"Darnell","last_name":"Zebedee","email":"dzebedee2@lycos.com","gender":"Male","city":"Billings","state":"Montana","latitude":"45.9497","longitude":"-108.599"},{"id":4,"first_name":"Buiron","last_name":"Loader","email":"bloader3@hexun.com","gender":"Male","city":"Jackson","state":"Mississippi","latitude":"32.3218","longitude":"-90.1771"},{"id":5,"first_name":"Alayne","last_name":"Josskovitz","email":"ajosskovitz4@bing.com","gender":"Female","city":"Knoxville","state":"Tennessee","latitude":"35.9901","longitude":"-83.9622"},{"id":6,"first_name":"Guillema","last_name":"Sirrell","email":"gsirrell5@fotki.com","gender":"Female","city":"Minneapolis","state":"Minnesota","latitude":"45.0159","longitude":"-93.4719"},{"id":7,"first_name":"Bail","last_name":"Pringer","email":"bpringer6@eventbrite.com","gender":"Male","city":"Salt Lake City","state":"Utah","latitude":"40.7145","longitude":"-111.8931"},{"id":8,"first_name":"Keven","last_name":"Nanetti","email":"knanetti7@mashable.com","gender":"Male","city":"Brooksville","state":"Florida","latitude":"28.5059","longitude":"-82.4226"},{"id":9,"first_name":"Adorne","last_name":"Bittlestone","email":"abittlestone8@mlb.com","gender":"Female","city":"Fort Lauderdale","state":"Florida","latitude":"26.0663","longitude":"-80.3339"},{"id":10,"first_name":"Loella","last_name":"Bute","email":"lbute9@indiatimes.com","gender":"Female","city":"Dayton","state":"Ohio","latitude":"39.7505","longitude":"-84.2686"}];

var router = function() {
	adminRouter.route('/addlocations')
		.get(function(req, res) {
			var url = "mongodb://localhost:27017";
			
			mongodb.connect(url, function(err, client) {
				console.log("Connected successfully to server");

				const db = client.db('mynodetestapp');

				const insertDocuments = function(db, callback) {
				  const collection = db.collection('rsvps');

				  collection.insertMany(rsvp, function(err, result) {
				    console.log("Inserted rsvps");
				    res.send(result);
				    callback(result);
				  });
				}

				insertDocuments(db, function() {
					client.close();
				});
				
			});
		});

	return adminRouter;
}

module.exports = router;