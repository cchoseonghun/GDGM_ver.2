'use strict';

const GroupStorage = require('./GroupStorage');

class Group {
    constructor(body) {
        this.body = body;
    }

    async list() {
        const client = this.body;
        try {
            const groups = await GroupStorage.getGroups(client.user_id);
            return { success: true, data: groups};
        } catch (err) {
            return { success: false, err };
        }
    }

    async code() {
        const client = this.body;
        try {
            const code = await GroupStorage.getCode(client.group_idx);
            return { success: true, data: code};
        } catch (err) {
            return { success: false, err };
        }
    }

    async create() {
        const client = this.body;
        try {
            return await GroupStorage.save(client);
        } catch (err) {
            return { success: false, err };
        }
    }

    async join() {
        const client = this.body;
        try {
            return await GroupStorage.addMember(client);
        } catch (err) {
            return { success: false, err };
        }
    }
}

module.exports = Group;