'use strict';

const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

app.get('/', (req, res) => {
    res.send('hi');
})

module.exports = app;