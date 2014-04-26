var express = require('express');
var util    = require("util");
var app     = express();
var server  = require('http').createServer(app);
var io      = require('socket.io').listen(server);
var port    = 3000;
var players = {};

/*
**
*/
io.set('log level', 1);
app.use(express.logger());
app.use(express.static(__dirname + '/public'));

io.sockets.on('connection', function (p_socket)
{
	p_socket.on('new', function(e){on_connection(p_socket,e)});
	p_socket.on('move', on_move);
	p_socket.on('disconnect', function(){on_deconnection(p_socket)});
});

/*
** socket.io 'on' events callbacks
*/
function on_connection (p_socket, p_data) {

	//var ip = p_socket.handshake.address.address;
	//players[ip] = true;
	
	p_socket.cli_id = p_data ? p_data : p_socket.id;
	players[p_socket.cli_id] = true;
	io.sockets.emit('new', [p_socket.cli_id, players]);
	console.log('--- player ' + p_socket.cli_id + ' is connected ---');
}

function on_move (p_data) {

	io.sockets.broadcast.emit('move', p_data);
}

function on_deconnection (p_socket) {

	//var ip = p_socket.handshake.address.address;
	
	players[p_socket.cli_id] = false;
	p_socket.emit('deco', p_socket.cli_id);
	console.log('--- player ' + p_socket.cli_id + ' is disconnect ---');
}

/*
**
*/
server.listen(port);
console.log('--- server running on port ' + port + ' ---');
