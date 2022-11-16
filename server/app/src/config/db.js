'use strict';

const logger = require('./logger');
const { DB_NAME } = process.env;

// const db_id = process.env.DB_ID;`
// const db_pw = process.env.DB_PW;
// const db_cluster = process.env.DB_CLUSTER;
// const db_name = process.env.DB_NAME;
// const db_url = 'mongodb+srv://' + db_id + ':' `+ db_pw + '@' + db_cluster + '.pygfy.mongodb.net/?retryWrites=true&w=majority';
const DB_URL = 'mongodb://localhost:27017';

const mongoose = require('mongoose');
module.exports = () => {
  function connect() {
    // mongoose.connect('아이디:비밀번호@주소:포트/admin', { dbName: '데이터베이스' }, function(err) {});
    mongoose.connect(DB_URL, { dbName: DB_NAME }, (err) => {
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