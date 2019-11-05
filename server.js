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

app.get('/data', (request, response) => {
  response.send('Hello you all');
});
// app.use(cors());

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});