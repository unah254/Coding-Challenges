const http = require('http');

const hostname = '127.0.0.1';
const port = 8000;

const backendHostname = '127.0.0.1';
const backendPort = 9000;

const server = http.createServer((req, res) => {
  console.log(`Received request from ${req.socket.remoteAddress}`);
  console.log(`${req.method} ${req.url} HTTP/${req.httpVersion}`);
  console.log(`Host: ${req.headers.host}`);
  console.log(`User-Agent: ${req.headers['user-agent']}`);
  console.log(`Accept: ${req.headers.accept}`);

  const options = {
    hostname: backendHostname,
    port: backendPort,
    path: req.url,
    method: req.method,
    headers: req.headers,
  };
  const backendReq = http.request(options, (backendRes) => {
    console.log(`Response from server: ${backendRes.statusCode} ${backendRes.statusMessage}`);
    res.writeHead(backendRes.statusCode, backendRes.headers);
    backendRes.pipe(res, { end: true });
  });

  req.pipe(backendReq, { end: true });
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello From Backend Server\n');
});
server.listen(port, hostname, () => {
  console.log(`Load balancer running at ${hostname}`);
});
