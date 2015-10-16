var net = require('net');
var hostAddress = '0.0.0.0';
var portAddress = 6969;
var socketManager = [];

//create a new server and connect it to a client
var server = net.createServer(function(socket) {

  //asign unique id to each client socket
  socket.id = Math.floor(Math.random()*100);
  socketManager.push(socket);

  //input data from client and write out in command line
  socket.on('data', function(data) {
    // console.log(socketManager.length);
    chatRoom('Id'+ socket.id + ': ' + data, socket);
  });

  //function that interates of the array and checks to see if message posted is from socket
  //if not from sender post to all other sockets
  function chatRoom(message, sender) {
    // console.log('chatROOOOOOOOM');
    socketManager.forEach(function(c) {
      if(c === sender) {
        return;
      }
      c.write(message);
    });
    process.stdout.write(message);
  }

  //confirming the connection between server and socket
  socket.write('testing connection\n');
  socket.pipe(socket);
});

//listen to port address
server.listen({ host: hostAddress, port: portAddress,}, function() {
  console.log('server listening on '+hostAddress + ':' + portAddress);
});