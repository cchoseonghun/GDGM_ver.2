'use strict';

const logger = require('../../config/logger');
const Raid = require('../../models/Raid');

const output = {
    list: async (req, res) => {
        const raid = new Raid(req.query);
        const response = await raid.list();

        const url = {
            method: 'GET', 
            path: '/raid', 
            body: JSON.stringify(req.query), 
            status: response.err ? 400 : 200, 
        };
        log(response, url);
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
        log(response, url);
        return res.status(url.status).json(response);
    }, 

    updateMemberState: async (req, res) => {
        const raid = new Raid(req.body);
        const response = await raid.updateMemberState();
        
        const url = {
            method: 'PATCH', 
            path: '/raid/members/state', 
            body: JSON.stringify(req.body), 
            status: response.err ? 400 : 200, 
        };
        log(response, url);
        return res.status(url.status).json(response);
    }, 

    delete: async (req, res) => {
        const raid = new Raid(req.body);
        const response = await raid.delete();
        
        const url = {
            method: 'DELETE', 
            path: '/raid', 
            body: JSON.stringify(req.body), 
            status: response.err ? 400 : 200, 
        };
        log(response, url);
        return res.status(url.status).json(response);
    }, 

    addMembers: async (req, res) => {
        const raid = new Raid(req.body);
        const response = await raid.addMembers();
        
        const url = {
            method: 'POST', 
            path: '/raid/members', 
            body: JSON.stringify(req.body), 
            status: response.err ? 400 : 200, 
        };
        log(response, url);
        return res.status(url.status).json(response);
    }, 

    excludeMembers: async (req, res) => {
        const raid = new Raid(req.body);
        const response = await raid.excludeMembers();
        
        const url = {
            method: 'DELETE', 
            path: '/raid/members', 
            body: JSON.stringify(req.body), 
            status: response.err ? 400 : 200, 
        };
        log(response, url);
        return res.status(url.status).json(response);
    }, 
}

module.exports = {
    output, 
    process, 
}

const log = (response, url) => {
    if (response.err) {
        logger.error(`${url.method} ${url.path} ${url.status} Request: ${url.body} Response: ${response.success} ${response.err}`);
    } else {
        logger.info(`${url.method} ${url.path} ${url.status} Request: ${url.body} Response: ${response.success} ${response.msg || ""}`);
    }
}