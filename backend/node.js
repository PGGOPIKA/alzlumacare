const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Receive data from ESP32
app.post('/alzlumacare/sensordata', (req, res) => {
  const sensorData = req.body;
  console.log('Received data:', sensorData);
  io.emit('sensorData', sensorData);  // broadcast to all clients
  res.sendStatus(200);
});

// Serve your frontend
app.get('/alzlumacare', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
