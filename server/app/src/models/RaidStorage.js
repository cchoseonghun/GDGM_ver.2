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
                    id: raidInfo.id, 
                    name: raidInfo.name, 
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
}

module.exports = RaidStorage;