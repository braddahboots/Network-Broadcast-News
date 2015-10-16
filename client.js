var net = require('net');
var hostAddress = '0.0.0.0';
var portAddress = 6969;

//creates a new instance of a socket
var client = new net.Socket();

//connect the socket to the host address and port we've designated
client.connect(portAddress, hostAddress, function(){
  console.log('connected to: '+ hostAddress + ':' + portAddress);

  //write a message to the server that confirms connection
  client.write('It was a success!');
});

//adding a data event handler to the client socket
client.on('data', function(data) {
  console.log('DATA:' + data);

  //closes the client socket completely
  client.destroy();
});

//adding a close event handler to the client socket
client.on('close', function() {
  console.log('connection closed');
});