'use strict';

const express = require('express');
const app = express();

const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// dotenv
dotenv.config();
// reading React build file
app.use(express.static(path.join(__dirname, '../../client/build')));
// CORS policy
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
})

module.exports = app;