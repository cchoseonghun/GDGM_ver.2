'use strict';

const express = require('express');
const app = express();

const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const home = require('./src/routes/home');

// dotenv
dotenv.config();
// reading React build file
app.use(express.static(path.join(__dirname, '../../client/app/build')));
// CORS policy
app.use(express.json());
app.use(cors());

app.use('/', home);

module.exports = app;