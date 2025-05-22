const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from React build folder
app.use(express.static(path.join(__dirname, 'build')));

// In-memory data storage
let sensorData = {};

// API route to receive data from ESP32
app.post('/api/data', (req, res) => {
  sensorData = req.body;
  console.log('Received from ESP32:', sensorData);
  res.sendStatus(200);
});

// API route to get latest sensor data
app.get('/api/live-data', (req, res) => {
  res.json(sensorData);
});

// Serve React app for all other routes (for SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
