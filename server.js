var net = require('net');
var hostAddress = '0.0.0.0';
var portAddress = 6969;

//instantiat a net server
var server = net.createServer(function(c) {
  console.log('client connected');
  c.on('end', function() {
    console.log('client disconnected');
  });
  c.write('testing connection');
  c.pipe(c);
});

//listen to port address
server.listen({ host: hostAddress, port: portAddress,}, function() {
  console.log('server bound to '+portAddress);
});