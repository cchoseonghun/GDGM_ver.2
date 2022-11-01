'use strict';

const logger = require('../../config/logger');

const output = {
    index: (req, res) => {
        res.sendFile(path.join(__dirname, '../../client/app/build/index.html'));
    }, 
}

const process = {
    login: (req, res) => {
        const response = { success: true, msg: 'hi' };

        const url = {
            method: 'POST', 
            path: '/login', 
            body: JSON.stringify(req.body), 
            // status: response.err ? 400 : 200, 
            status: 200, 
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