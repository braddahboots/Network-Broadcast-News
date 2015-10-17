var net = require('net');
var hostAddress = '0.0.0.0';
var portAddress = 6969;

//creates a new instance of a socket
var client = new net.Socket();

//connect the socket to the host address and port we've designated
client.connect(portAddress, hostAddress, function(){
  console.log('connected to: '+ hostAddress + ':' + portAddress);

  process.stdout.write('Input Username:');

  //write a message to the server that confirms connection
  // client.write('Connected \n');
});

//set the encoding to utf8
process.stdin.setEncoding('utf8');

//creating an input stream on the client that will communicate with server
process.stdin.on('data', function(chunk) {

  if(chunk !== null) {
    //write the input data on the server
    client.write(chunk.toString());
    // process.stdout.write('\n> ');
  }
});

//once connection has ended write end
process.stdin.on('end', function() {
  client.write('end');
});

//adding a data event handler to the client socket
client.on('data', function(data) {
  console.log(data.toString().trim());
  // process.stdout.write('\n> ');
});

//adding a close event handler to the client socket
client.on('close', function() {
  console.log('connection closed');
});