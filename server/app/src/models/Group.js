'use strict';

const GroupStorage = require('./GroupStorage');

class Group {
    constructor(body) {
        this.body = body;
    }

    async create() {
        const client = this.body;
        try {
            return await GroupStorage.save(client);
        } catch (err) {
            return { success: false, err };
        }
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
}

module.exports = Group;