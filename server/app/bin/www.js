'use strict';

const app = require('../app');
const logger = require('../src/config/logger');

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    logger.info(`${PORT} 포트 서버 가동`);
});