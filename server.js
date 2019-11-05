'use srtict';

//first run npm init from the terminal to create "package.json"
// npm install dotenv installs the dotenv module into the node module folder
// loads our environment from a secret .env file
// APP dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// let moment = require('moment');
// moment().format();

// Make my server
const app = express();
// Global vars
const PORT = process.env.PORT || 3000;


app.get('/location', (request, response) => {
  // send the users current location back to them
  const geoData = require('./data/geo.json');
  const city = request.query.data;
  console.log('LOCATION END POINT REACHED')
  const locationData = new Location(city, geoData);
  response.send(locationData);
});

function Location(city, geoData) {
  this.search_query = city;
  this.formatted_query = geoData.results[0].formatted_address;
  this.latitude = geoData.results[0].geometry.location.lat;
  this.longitude = geoData.results[0].geometry.location.lng;
}


app.get('/weather', (request, response) => {
  // send the users current location back to them
  const forcast = require('./data/darksky.json');
  console.log('WEATHER END POINT REACHED')
  const weatherData = [];
  for (let i = 0; i < forcast.daily.data.length; i++) {
    let dataItem = forcast.daily.data[i]
    weatherData.push(new Weather(dataItem.summary, dataItem.time));
  }

  response.send(weatherData);
});

function Weather(forcast, time) {
  this.forcast = forcast;
  this.time = new Date(parseInt(time*1000)).toGMTString();
  // this.time = moment.utc(parseInt(time)).local()
  // this.time = new Date(time);
 
  
}


app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});