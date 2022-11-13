'use strict';

const logger = require('../config/logger');
const User = require('../mongoose/User');

class UserStorage {
    static getUserInfo(id) {
        return new Promise((resolve, reject) => {
            User.find({ id: id }, (err, data) => {
                if (err) reject(`${err}`);
                else resolve(data[0]);
            })
        });
    };

    static save(userInfo) {
        return new Promise((resolve, reject) => {
            User.create({ id: userInfo.id, psword: userInfo.psword, name: userInfo.name }, (err, result) => {
                if (err) reject(`${err}`);
                else resolve({ success: true, msg: '아이디 생성 완료' });
            });
        });
    }
}

module.exports = UserStorage;