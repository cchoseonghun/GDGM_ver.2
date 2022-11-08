'use strict';

const db = require('../config/db');

class GroupStorage {
    static save(groupInfo) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO `groups`(`name`, `members`) VALUES (?, ?);'
            db.query(query, [groupInfo.name, JSON.stringify({"id": groupInfo.user_id, "rank": 0})], (err) => {
                if(err) reject(`${err}`);
                else resolve({ success: true, msg: `[${groupInfo.name}] 공격대 생성 완료` });
            });
        });
    }

    static getGroups(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM `groups` WHERE json_unquote(json_extract(members, "$.id")) = ?;';
            db.query(query, [id], (err, data) => {
                if (err) reject(`${err}`);
                else resolve(data);
            });
        });
    }
}

module.exports = GroupStorage;