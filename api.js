const express = require('express');

const app = express();

var mysql = require('mysql');
var conn = mysql.createConnection({
    host : 'database-1.c0vugvhjuhqj.ap-northeast-2.rds.amazonaws.com',
    user : 'admin',
    password : 'choi6014#',
    database : 'espa'
});

conn.connect();

const server = app.listen(3001, () => {
    console.log('Start Server : 54.180.1.96:3001');

});

// 콜론이 있으면 어떤값이든 들어올수 있다는 의미임
// app.get('/api/users/:type', async(req, res) => {
//     res.send('connect.');
// });
//

app.get('/api/users/:type', async(req, res) => {

    let {type} = req.params;

    console.log(type);


    conn.query('select * from users', function(err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            console.log('rows', rows);
            console.log('fields', fields);
        }
        
    });


    res.send('ok');


});


conn.end();




