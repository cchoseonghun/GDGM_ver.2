'use strict';

const Group = require('../../models/Group');

const output = {
    list: async (req, res) => {
        const group = new Group(req.query);
        const response = await group.list();

        const url = {
            method: 'GET', 
            path: '/group/list', 
            body: JSON.stringify(req.body), 
            status: response.err ? 400 : 200, 
        };
        // log(response, url);
        return res.status(url.status).json(response);
    }, 

    code: async (req, res) => {
        const group = new Group(req.query);
        const response = await group.code();

        const url = {
            method: 'GET', 
            path: '/group/code', 
            body: JSON.stringify(req.body), 
            status: response.err ? 400 : 200, 
        };
        // log(response, url);
        return res.status(url.status).json(response);
    }, 
}

const process = {
    create: async (req, res) => {
        const group = new Group(req.body);
        const response = await group.create();

        const url = {
            method: 'POST', 
            path: '/group', 
            body: JSON.stringify(req.body), 
            status: response.err ? 400 : 200, 
        };
        // log(response, url);
        return res.status(url.status).json(response);
    }, 

    join: async (req, res) => {
        const group = new Group(req.body);
        const response = await group.join();

        const url = {
            method: 'POST', 
            path: '/group/member', 
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