'use strict';

const logger = require('../config/logger');
const db = require('../config/db');

class UserStorage {
    static getUserInfo(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE id = ?;';
            db.query(query, [id], (err, data) => {
                if (err) reject(`${err}`);
                else resolve(data[0]);
            })
        });
    };

    static save(userInfo) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO users(id, name, psword) VALUES (?, ?, ?);';
            db.query(query, [userInfo.id, userInfo.name, userInfo.psword], (err) => {  // insert는 저장하는거기 때문에 data를 받을게 없음
                if (err) reject(`${err}`);
                else resolve({ success: true, msg: '아이디 생성 완료' });
            });
        });
    }
}

module.exports = UserStorage;