const http = require('http');
const heapdump = require('heapdump');
const process = require('process');

const agent = new http.Agent({ keepAlive: true });
const onServerReady = (server) => {
  const opts = {
    agent,
    path: '/',
    port: server.address().port,
  };
  http.request(opts, onRequest).end();
};

const onRequest = (res) => {
  heapdump.writeSnapshot((err, filename) => {
    console.log(`wrote ${require.resolve('./' + filename)}`);
    process.exit();
  });
};

const server = http
  .createServer((req, res) => {
    req.REQUEST_LOCAL_DATA = Buffer.alloc(30*1024*1024, 0);
    res.end();
  })
  .listen(0, () => onServerReady(server));

