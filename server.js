var net = require('net');
var hostAddress = '0.0.0.0';
var portAddress = 6969;
var socketManager = [];

//create a new server and connect it to a client
var server = net.createServer(function(socket) {
  socket.id = null;
  socket.admin = '[ADMIN]';

  //store all new instances of sockets to an array
  socketManager.push(socket);

  //input data from clients
  socket.on('data', function(data) {
    var adminId = data.toString().trim();

    //transform data into a string
    var clientId = data.toString().trim();

    //============Assign User Name================
    if(socket.id === null) {
      socket.id = clientId;

    } else if(socket.id === '[ADMIN]') {
      adminMessage(socket.id + ': ' + data, socket);

    } else {

    //===========Send message to all clients======
    chatRoom(socket.id + ': ' + data, socket);
    }
  });

  //functions that interate of the array and checks to see if message posted is from socket

  //if from ADMIN then call this function
  function adminMessage(message, sender) {
    socketManager.forEach(function(c) {
      if(c.id === '[ADMIN]') {
        c.write(message);
      }
    });
    process.stdout.write(message);
  }

  //if not from sender post to all other sockets
  function chatRoom(message, sender) {
    socketManager.forEach(function(c) {
      if(c.id === sender.id) {
        return;
      }
      // console.log('out');
      c.write(message);
    });
    process.stdout.write(message);
  }

});

//listen to port address
server.listen({ host: hostAddress, port: portAddress,}, function() {
  console.log('server listening on '+hostAddress + ':' + portAddress);
});
