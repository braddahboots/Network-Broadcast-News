var net = require('net');
var hostAddress = '0.0.0.0';
var portAddress = 6969;

//create a new server and connect it to a client
var server = net.createServer(function(socket) {

  //input data from client and write out in command line
  socket.on('data', function(data) {
    process.stdout.write(data);
  });

  //confirming the connection between server and socket
  socket.write('testing connection');
  socket.pipe(socket);
});

//listen to port address
server.listen({ host: hostAddress, port: portAddress,}, function() {
  console.log('server listening on '+hostAddress + ':' + portAddress);
});