'use strict';

const logger = require('./logger');
const { DB_URI, DB_NAME } = process.env;

// const DB_ID = process.env.DB_ID;`
// const DB_PW = process.env.DB_PW;
// const DB_CLUSTER = process.env.DB_CLUSTER;
// const DB_NAME = process.env.DB_NAME;
// const DB_URI = 'mongodb+srv://' + DB_ID + ':' `+ DB_PW + '@' + DB_CLUSTER + '.pygfy.mongodb.net/?retryWrites=true&w=majority';
// const DB_URI = 'mongodb://localhost:27017';

const mongoose = require('mongoose');
module.exports = () => {
  function connect() {
    // mongoose.connect('아이디:비밀번호@주소:포트/admin', { dbName: '데이터베이스' }, function(err) {});
    mongoose.connect(DB_URI, { dbName: DB_NAME }, (err) => {
      if (err) console.error('mongodb connection error', err);
      else console.log('mongodb connected');
    });
  }
  connect();
  mongoose.connection.on('disconnected', connect);

  // mongoose models 연결
  require('../mongoose/User');
  require('../mongoose/Group');
  require('../mongoose/Invite');
  require('../mongoose/Raid');
};