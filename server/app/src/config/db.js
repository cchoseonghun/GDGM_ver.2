'use strict';

const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PSWORD, 
    database: process.env.DB_DATABASE
    // host: "login-lecture.cd7q3laorj2l.ap-northeast-2.rds.amazonaws.com", 
    // user: "admin", 
    // password: "iIl1!IlINIT", 
    // database: "login_lecture"
});

db.connect();

module.exports = db;