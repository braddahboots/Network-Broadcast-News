var net = require('net');
var hostAddress = '0.0.0.0';
var portAddress = 6969;

//creates a new instance of a socket
var client = new net.Socket();

//connect the socket to the host address and port we've designated
client.connect(portAddress, hostAddress, function(){
  console.log('connected to: '+ hostAddress + ':' + portAddress);
  //write a message to the server that confirms connection
  client.write('Connected \n');
});

//set the encoding to utf8
process.stdin.setEncoding('utf8');

//creating an input stream on the client that will communicate with server
process.stdin.on('readable', function() {

  //read the input data from the client?
  var chunk = process.stdin.read();
  if(chunk !== null) {

    //write the input data on the server
    client.write(chunk.toString());
  }
});

//once connection has ended write end
process.stdin.on('end', function() {
  client.write('end');
});

//adding a data event handler to the client socket
client.on('data', function(data) {
  console.log(data.toString());

  //closes the client socket completely
  // client.destroy();
});

//adding a close event handler to the client socket
client.on('close', function() {
  console.log('connection closed');
});