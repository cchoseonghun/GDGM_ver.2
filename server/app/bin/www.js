'use strict';

const app = require('../app');
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`${PORT} 포트로 서버 실행`);
});