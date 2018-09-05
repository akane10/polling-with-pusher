const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//middleware
const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//routes
const poll = require('./routes/poll');
app.use('/', poll);

module.exports = app;
