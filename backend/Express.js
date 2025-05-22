const express = require('express');
const app = express();

app.use(express.json()); // Important for parsing JSON POST bodies

app.post('/alzlumacare/sensordata', (req, res) => {
  console.log('Received sensor data:', req.body);
  res.status(200).send('Data received successfully');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
