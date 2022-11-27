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
}

module.exports = Raid;