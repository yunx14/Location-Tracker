var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var requestTime = require('./requestTime')();
var errHandler = require('./errHandler')();


var app = express();

var port = 5050;

var http = require('http').Server(app);
var io = require('socket.io')(http);

var adminRouter = require('./src/routes/adminRoute')();
var locationRouter = require('./src/routes/locationRoute')();
var authRouter = require('./src/routes/authRoute')();
var mainRouter = require('./src/routes/mainRoute')();

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(requestTime);

app.use(errHandler);

app.use('/admin', adminRouter);
app.use('/locations', locationRouter);
app.use('/auth', authRouter);
app.use('/index', mainRouter);

io.on('connection', function(socket) {
	console.log('someone connected');
	var welcomeMessage = socket.handshake.headers['user-agent'] + ' just logged on';
	io.emit('chat message', welcomeMessage);

	socket.on('chat message', function(msg) {
		console.log('message: ' + msg);
		io.emit('chat message', msg);
	});

	socket.on('latLng', function(latLng) {
		console.log(latLng);
		io.emit('latLng', latLng);
	});

	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
});

http.listen(port, function() {
	console.log("listening on port "+ port);
});

