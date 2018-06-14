var http = require('http');
var app = require('./app');

var port = 3000;

var server = http.createServer(app);

server.listen(port, () => console.log('Server started on port 3000'));