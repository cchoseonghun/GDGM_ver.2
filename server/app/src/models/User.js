'use strict';

const logger = require('../config/logger');
const UserStorage = require('./UserStorage');
const bcrypt = require('bcrypt');

class User {
    constructor(body) {
        this.body = body;
    }

    async #checkPsword(beforePassword, afterPassword) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(beforePassword, afterPassword, (err, result)=>{
                if (err) reject(`${err}`);
                else resolve(result);
            });
        });
    }

    async #encryptPsword(userInfo) {
        const saltRounds = 10;
        return new Promise((resolve, reject) => {
            bcrypt.hash(userInfo.psword, saltRounds, (err, hash)=>{
                if (err) reject(`${err}`);
                else {
                    userInfo.psword = hash;
                    resolve(userInfo);
                }
            });
        });
    }

    async login() {
        const client = this.body;
        try {
            const user = await UserStorage.getUserInfo(client.id);
            if(user) {
                if(user.id === client.id && await this.#checkPsword(client.psword, user.psword)) {
                    return { success: true};
                }
                return { success: false, msg: '비밀번호가 틀렸습니다.' };
            }
            return { success: false, msg: '존재하지 않는 아이디입니다.' };
        } catch (err) {
            return { success: false, err };
        }
    }

    async register() {
        const client = await this.#encryptPsword(this.body);
        const user = await UserStorage.getUserInfo(client.id);
        if(user) {
            return { success: false, msg: '이미 가입된 아이디입니다.' };
        }
        return await UserStorage.save(client);
    }
}

module.exports = User;