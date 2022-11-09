'use strict';

const db = require('../config/db');
const crypto = require('crypto');

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

    static getCode(group_idx) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM invite WHERE expired = false;';
            db.query(query, (err, data) => {
                if (err) reject(`${err}`);
                else {
                    let code = '';
                    let obj = data.find(x => x.group_idx == group_idx);
                    if(obj){  // group_id 로 데이터가 있으면 바로 code 리턴
                        code = obj.code;
                    } else {  // 없으면 code 생성 후 등록
                        do code = crypto.randomBytes(20).toString('hex').slice(0, 5);
                        while (data.find(x => x.code == code));
                        
                        const query = 'INSERT INTO invite (`code`, `group_idx`) VALUES (?, ?);';
                        db.query(query, [code, group_idx], (err) => {
                            if (err) reject(`${err}`);
                        });
                    }
                    resolve(code);
                }
            });
        });
    }
}

module.exports = GroupStorage;