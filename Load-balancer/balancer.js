const http = require('http');

const hostname = '127.0.0.1';
const port = 8000;
const server = http.createServer((req, res) => {
  console.log(`Received request from ${req.socket.remoteAddress}`);
  console.log(`${req.method} ${req.url} HTTP/${req.httpVersion}`);
  console.log(`Host: ${req.headers.host}`);
  console.log(`User-Agent: ${req.headers['user-agent']}`);
  console.log(`Accept: ${req.headers.accept}`);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});
server.listen(port, hostname, () => {
  console.log(`Received request from ${hostname}`);
});
