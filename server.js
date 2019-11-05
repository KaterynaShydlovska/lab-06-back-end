'use srtict';

//first run npm init from the terminal to create "package.json"
// npm install dotenv installs the dotenv module into the node module folder
// loads our environment from a secret .env file
// APP dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Make my server
const app = express();
// Global vars
const PORT = process.env.PORT || 3000;

// app.get('/', (request, response) => {
//   response.send('Hello you all');
// });
// app.use(cors());

app.get('/location', (request, response) => {
  // send the users current location back to them
  const geoData = require('./data/geo.json');
  const city = request.query.data;
  const locationData = new Location(city, geoData);
  response.send(locationData);
});

function Location(city, geoData) {
  this.search_query = city;
  this.formatted_query = geoData.results[0].formatted_address;
  this.latitude = geoData.results[0].geometry.location.lat;
  this.longitude = geoData.results[0].geometry.location.lng;
}

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});