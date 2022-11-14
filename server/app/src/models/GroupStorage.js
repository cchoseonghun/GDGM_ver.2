'use strict';

const crypto = require('crypto');
const { ObjectId } = require('mongodb');

const Group = require('../mongoose/Group');
const Invite = require('../mongoose/Invite');

class GroupStorage {
    static save(groupInfo) {
        return new Promise((resolve, reject) => {
            Group.create({ 
                name: groupInfo.name, 
                members: {
                    _id: ObjectId(groupInfo._id_user), 
                    id: groupInfo.id_user, 
                    name: groupInfo.name_user, 
                    rank: 0
                } 
            }, (err, result) => {
                    if (err) reject(`${err}`);
                    else resolve({ success: true, msg: `[${groupInfo.name}] 공격대 생성 완료` });
            });
        });
    };

    static getGroups(_id) {
        return new Promise((resolve, reject) => {
            Group.find({ members: { $elemMatch: { _id: ObjectId(_id) } } }, (err, data) => {
                if (err) reject(`${err}`);
                else resolve(data);
            });
        });
    };

    static getCode(group_id) {
        return new Promise((resolve, reject) => {
            Invite.find({ expired: false }, (err, data) => {
                if (err) reject(`${err}`);
                else {
                    let code = '';
                    let obj = data.find(x => x.group_id.equals(ObjectId(group_id)));
                    if(obj){  // group_id 로 데이터가 있으면 바로 code 리턴
                        code = obj.code;
                    } else {  // 없으면 code 생성 후 등록
                        do code = crypto.randomBytes(20).toString('hex').slice(0, 5);
                        while (data.find(x => x.code == code));
                        
                        Invite.create({ code: code, group_id: ObjectId(group_id), created_date: new Date(), expired: false }, (err, data) => {
                            if (err) reject(`${err}`);
                        });
                    }
                    resolve(code);
                }
            });
        });
    }

    static addMember(client) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM invite WHERE expired = false AND code = ?;';
            db.query(query, [client.code], (err, data) => {
                if (err) reject(`${err}`);
                else {
                    if (data) {
                        const group_idx = data[0].group_idx;
                        const query = 'SELECT COUNT(*) AS cnt FROM `groups` WHERE json_unquote(json_extract(members, "$[0].id")) = ? AND idx = ?;';
                        db.query(query, [client.user_id, group_idx], (err, data) => {
                            if (err) reject(`${err}`);
                            else {
                                if (data[0].cnt > 0) {
                                    resolve({ success: false, msg: '이미 그룹에 속해있습니다.' });
                                } else {
                                    // update
                                    const query = 'UPDATE `groups` SET members = json_array_append(members, ?, ?) WHERE idx = ?';
                                    db.query(query, ['$', JSON.stringify({"id": client.user_id, "rank": 1}), group_idx], (err, data) => {
                                        if (err) reject(`${err}`);
                                        else {
                                            resolve({ success: true, msg: '공격대 추가 완료.' });
                                        }
                                    });

                                }
                            }
                        });
                    } else resolve({ success: false, msg: '유효하지 않은 초대코드 입니다.' });
                }
            });
        });
    }
}

module.exports = GroupStorage;