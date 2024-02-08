if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const express = require("express");
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/:username", (req, res) => {
  res.sendFile(path.join(__dirname,'/client/homepage.html'));
});

app.get("/:username/location", (req, res) => {
  res.sendFile(path.join(__dirname,'/client/location.html'));
});

app.post('/:username/location', (req, res) => {
  console.log("Hello");
  console.log('Request Body:', req.body);
  console.log('Request Headers:', req.headers);

  const username = req.params.username;
  const { latitude, longitude, accuracy } = req.body;

  if (latitude === undefined || longitude === undefined || accuracy === undefined) {
    return res.status(400).json({ error: 'Latitude, longitude, and accuracy are required.' });
  }

  console.log(`Received location data for user ${username}:`);
  console.log(`Latitude: ${latitude}, Longitude: ${longitude}, Accuracy: ${accuracy}`);

  res.json({ message: 'Location data received successfull.' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
