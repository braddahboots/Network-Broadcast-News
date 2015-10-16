var net = require('net');
var hostAddress = '0.0.0.0';
var portAddress = 6969;
var socketManager = [];

//create a new server and connect it to a client
var server = net.createServer(function(socket) {

    //asign unique id to each client socket
    socket.id = Math.floor(Math.random()*100);
    socketManager.push(socket.id);

  //input data from client and write out in command line
  socket.on('data', function(data) {
    process.stdout.write('Id'+ socket.id + ': ' + data);
  });

  //confirming the connection between server and socket
  socket.write('testing connection');
  socket.pipe(socket);
});

//listen to port address
server.listen({ host: hostAddress, port: portAddress,}, function() {
  console.log('server listening on '+hostAddress + ':' + portAddress);
});