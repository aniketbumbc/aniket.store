

const express = require('express');
const server = require('http').createServer();
const app = express();

app.get('/', function (req, res) {
  res.sendFile('index.html', { root: __dirname });
});

server.on('request', app);
server.listen(3000, function () {
  console.log('server start on port 300');
});

/******** Wesocket ****** */

const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ server: server });

wss.on('connection', function connection(ws) {
  const numberClients = wss.clients.size;
  console.log('Clients connected', numberClients);

  wss.broadcast(`current visitor, ${numberClients}`);

  if (ws.readyState === ws.OPEN) {
    ws.send('welcome to my server');
  }

  ws.on('close', function close() {
    wss.broadcast(`current visitor, ${numberClients}`);
    console.log('A client has disconnected');
  });
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(clients) {
    clients.send(data);
  });
};

