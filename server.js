var net = require('net');
var hostAddress = '0.0.0.0';
var portAddress = 6969;
var socketManager = [];
var socketAdmin = false;

//create a new server and connect it to a client
var server = net.createServer(function(socket) {
  socket.id = null;

  //store all new instances of sockets to an array
  socketManager.push(socket);

  //input data from clients
  socket.on('data', function(data) {
    var adminId = data.toString().trim();

    //transform data into a string
    var clientId = data.toString().trim();

    //============Assign User Name================
    if(socket.id === null) {
      if(clientId === '[ADMIN]' && socketAdmin === false) {
        socket.id = clientId;
        socketAdmin = true;
      } else if (socketAdmin === false || clientId !== '[ADMIN]') {
        socket.id = clientId;
      } else {
        userError(socket);
      }

    } else if (socket.id === '[ADMIN]') {
      chatRoom(socket.id + ': ' + data, socket);

    } else {
    //===========Send message to all clients======
    chatRoom(socket.id + ': ' + data, socket);
    }
  });

  //if not from sender post to all other sockets
  function chatRoom(message, socket) {
    socketManager.forEach(function(c) {
      if(c.id === socket.id) {
        return;
      }
      // console.log('out');
      c.write(message);
    });
    process.stdout.write(message);
  }

  //throw error if user is trying to log into admin
  function userError(socket) {
    if(socket) {
      socket.id = null;
      socket.write('Unable to access ADMIN');
    }
  }

});

//listen to port address
server.listen({ host: hostAddress, port: portAddress,}, function() {
  console.log('server listening on '+hostAddress + ':' + portAddress);
});
