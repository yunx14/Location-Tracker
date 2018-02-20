var socketIO = require('socket.io');

var socketService = function(http) {
	var io = socketIO(http);

	io.on('connection', function(socket) {
		console.log('someone connected');
		var welcomeMessage = socket.handshake.headers['user-agent'] + ' just joined the chat';
		socket.broadcast.emit('user connected');
		socket.broadcast.emit('chat message', welcomeMessage);

		socket.on('chat message', function(msg) {
			console.log('message: ' + msg);
			io.emit('chat message', msg);
		});

		socket.on('disconnect', function() {
			console.log('user disconnected');
		});
	});
}

module.exports = socketService;