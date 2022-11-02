'use strict';

const express = require('express');
// dotenv
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const cors = require('cors');
const path = require('path');
const home = require('./src/routes/home');

// reading React build file
app.use(express.static(path.join(__dirname, '../../client/app/build')));
// CORS policy
app.use(express.json());
app.use(cors());
// body parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', home);

module.exports = app;