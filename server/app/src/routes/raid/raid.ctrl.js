'use strict';

const Raid = require('../../models/Raid');

const output = {
    list: async (req, res) => {
        const raid = new Raid(req.query);
        const response = await raid.list();

        const url = {
            method: 'GET', 
            path: '/raid', 
            body: JSON.stringify(req.body), 
            status: response.err ? 400 : 200, 
        };
        // log(response, url);
        return res.status(url.status).json(response);
    }
}

const process = {
    create: async (req, res) => {
        const raid = new Raid(req.body);
        const response = await raid.create();

        const url = {
            method: 'POST', 
            path: '/raid', 
            body: JSON.stringify(req.body), 
            status: response.err ? 400 : 200, 
        };
        // log(response, url);
        return res.status(url.status).json(response);
    }, 
}

module.exports = {
    output, 
    process, 
}