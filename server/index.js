let path = require('path');
let http = require('http');
let mockserver = require('mockserver');

http.createServer(mockserver(path.join(__dirname, '/mocks'))).listen(9001);
