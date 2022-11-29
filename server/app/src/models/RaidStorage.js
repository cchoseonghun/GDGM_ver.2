'use strict';

const { ObjectId } = require('mongodb');

const Raid = require('../mongoose/Raid');

class RaidStorage {
    static save(raidInfo) {
        return new Promise((resolve, reject) => {
            Raid.create({
                name: raidInfo.name, 
                d_date: raidInfo.d_date, 
                d_time: raidInfo.d_time, 
                members: {
                    _id: ObjectId(raidInfo._id_master), 
                    id: raidInfo.id_master, 
                    name: raidInfo.name_master, 
                    rank: 0, 
                    state: 0, 
                }, 
                group_id: raidInfo._id_group, 
                group_name: raidInfo.name_group, 
            }, (err, result) => {
                if (err) reject(`${err}`);
                else resolve({ success: true, msg: `[${raidInfo.name}] 레이드 생성 완료` });
            });
        });
    };

    static getRaids(info) {
        return new Promise((resolve, reject) => {
            Raid.find({ group_id: ObjectId(info._id_group), members: { $elemMatch: { _id: ObjectId(info._id_user) } } }, (err, data) => {
                if (err) reject(`${err}`);
                else resolve(data);
            })
        })
    }

    static updateState(client) {
        return new Promise((resolve, reject) => {
            Raid.updateOne(
                { 
                    _id: ObjectId(client._id_raid), 
                    'members._id': ObjectId(client._id_user)
                }, 
                {
                    $set: {
                        'members.$.state': client.state_user
                    }
                }, (err, data) => {
                    if (err) reject(`${err}`);
                    else resolve({ success: true, msg: '일정 확인 상태 변경 완료' });
                }
            );
        })
    }

    static deleteRaid(client) {
        return new Promise((resolve, reject) => {
            Raid.find({ _id: ObjectId(client._id_raid), 'members._id': ObjectId(client._id_user) }, (err, data)=>{
                if (err) reject(`${err}`);
                else {
                    if (data.length > 0) {
                        Raid.deleteOne(
                            {
                                _id: ObjectId(client._id_raid), 
                                'members._id': ObjectId(client._id_user)
                            }, (err, data) => {
                                if (err) reject(`${err}`);
                                else resolve({ success: true, msg: '레이드 삭제 완료' });
                            }
                        )
                    } else {
                        resolve({ success: false, msg: '레이드 정보를 찾을 수 없음' });
                    }

                }
            })
            
        })
    }
}

module.exports = RaidStorage;