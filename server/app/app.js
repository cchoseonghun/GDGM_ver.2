'use strict';

const express = require('express');
// dotenv
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const cors = require('cors');
const path = require('path');

const db = require('./src/config/db');
db();

const home = require('./src/routes/home');
const group = require('./src/routes/group');
const raid = require('./src/routes/raid');

// reading React build file
app.use(express.static(path.join(__dirname, '../../client/app/build')));
// CORS policy
app.use(express.json());
app.use(cors());
// body parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// controller
app.use('/', home);
app.use('/group', group);
app.use('/raid', raid);

module.exports = app;