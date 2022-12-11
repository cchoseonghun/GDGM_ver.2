'use strict';

const app = require('../app');
const logger = require('../src/config/logger');

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    logger.info('     _______. _______ .______      ____    ____  _______ .______              ______   .__   __. ');
    logger.info('    /       ||   ____||   _  \\     \\   \\  /   / |   ____||   _  \\            /  __  \\  |  \\ |  | ');
    logger.info('   |   (----`|  |__   |  |_)  |     \\   \\/   /  |  |__   |  |_)  |          |  |  |  | |   \\|  | ');
    logger.info('    \\   \\    |   __|  |      /       \\      /   |   __|  |      /           |  |  |  | |  . `  | ');
    logger.info('.----)   |   |  |____ |  |\\  \\----.   \\    /    |  |____ |  |\\  \\----.      |  `--`  | |  |\\   | ');
    logger.info('|_______/    |_______|| _| `._____|    \\__/     |_______|| _| `._____|       \\______/  |__| \\__| ');
    logger.info(`                                                                                       PORT=${PORT}`);
});