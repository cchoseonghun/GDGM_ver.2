'use strict';

const { createLogger, transports, format } = require('winston');
const { combine, colorize, timestamp, simple, printf, label } = format;

const printFormat = printf(({ timestamp, label, level, message }) => {
    return `${timestamp} [${label}] ${level} : ${message}`;
});

const printLogFormat = {
    file: combine(
        label({
            label: 'GDGM node'
        }), 
        timestamp({
            format: 'YYYY-MM-DD HH:mm:dd:ss'
        }), 
        printFormat
    ), 
    console: combine(
        colorize(), 
        simple()
    )
}

const opts = {
    // 요청에 대해서는 access.log
    // 쿼리에 대해서는 어떻게?
    // 어떤식으로 로그를 하는게 안전한지 자문 구하기
    file: new transports.File({
        filename: 'access.log', 
        dirname: './logs', 
        level: 'info', 
        format: printLogFormat.file, 
    }), 
    console: new transports.Console({
        level: 'info', 
        format: printLogFormat.console, 
    })
}

const logger = createLogger({
    transports: [opts.file], 
});

if(process.env.NODE_ENV !== 'production') {
    logger.add(opts.console);
}

logger.stream = {
    write: (message) => logger.info(message), 
}

module.exports = logger;