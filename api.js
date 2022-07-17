const express = require('express');

const app = express();

const server = app.listen(3001, () => {
    console.log('Start Server : 54.180.1.96:3001');

});

app.get('/api/users/:type', async(req, res) => {
    res.send('connect.');
});






