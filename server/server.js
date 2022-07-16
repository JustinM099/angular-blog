const http = require('http');
const { env } = require('process');

const PORT = 3000

const server = http.createServer((req, res) => {
  res.end('res')
});

server.listen(process.env.PORT || PORT)
