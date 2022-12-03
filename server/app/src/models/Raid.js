'use strict';

const RaidStorage = require('./RaidStorage');

class Raid {
    constructor(body) {
        this.body = body;
    }

    async create() {
        const client = this.body;
        try {
            return await RaidStorage.save(client);
        } catch (err) {
            return { success: false, err };
        }
    }

    async list() {
        const client = this.body;
        try {
            const raids = await RaidStorage.getRaids(client);
            return { success: true, data: raids};
        } catch (err) {
            return { success: false, err };
        }
    }

    async updateMemberState() {
        const client = this.body;
        try {
            return await RaidStorage.updateMemberState(client);
        } catch (err) {
            return { success: false, err };
        }
    }

    async delete() {
        const client = this.body;
        
        try {
            return await RaidStorage.deleteRaid(client);
        } catch (err) {
            return { success: false, err };
        }
    }

    async addMembers() {
        const client = this.body;
        try {
            return await RaidStorage.addMembers(client);
        } catch (err) {
            return { success: false, err };
        }
    }
}

module.exports = Raid;