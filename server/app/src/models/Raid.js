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
}

module.exports = Raid;