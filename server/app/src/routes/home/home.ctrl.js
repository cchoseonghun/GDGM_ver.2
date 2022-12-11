'use strict';

const logger = require('../../config/logger');
const User = require('../../models/User');

const output = {
    index: (req, res) => {
        const url = {
            method: 'GET', 
            path: '/', 
            body: JSON.stringify(req.body), 
            status: response.err ? 400 : 200, 
        };
        log(response, url);
        res.sendFile(path.join(__dirname, '../../client/app/build/index.html'));
    }, 
}

const process = {
    login: async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();

        const url = {
            method: 'POST', 
            path: '/login', 
            body: JSON.stringify(req.body), 
            status: response.err ? 400 : 200, 
        };
        log(response, url);
        return res.status(url.status).json(response);
    }, 
    register: async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();

        const url = {
            method: 'POST', 
            path: '/register', 
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