const express = require('express');

const app = express();

var mysql = require('mysql');
var conn = mysql.createConnection({
    host : 'database-1.c0vugvhjuhqj.ap-northeast-2.rds.amazonaws.com',
    user : 'admin',
    password : 'choi6014#',
    database : 'espa'
});

//conn.connect();

const server = app.listen(3001, () => {
    console.log('Start Server : 54.180.1.96:3001');

});




// 콜론이 있으면 어떤값이든 들어올수 있다는 의미임
// app.get('/api/users/:type', async(req, res) => {
//     res.send('connect.');
// });
//



///////////// 테이블의 모든 데이터 불러오기 ///////////////////////////
// app.get('/api/users/:type', async(req, res) => {
//     let {type} = req.params;
//     console.log(type);
//     conn.query('SELECT * FROM users;', function(err, rows, fields) {
//         if (err) {
//             res.send(err);
//         } else {
//             res.send(rows);
//         }
//     });
// });




///////////// id를 지정해서 테이블의 특정 필드 데이터 불러오기 ///////////////////////////
app.get('/api/users/id/:type', async(req, res) => {

    let {type} = req.params;

    console.log(type);

    conn.query('SELECT * FROM users WHERE id = ?;', type, function(err, rows, fields) {
        if (err) {
            res.send(err);
        } else {
            res.send(rows);
        }

    });


});




///////////// customer_id를 지정해서 테이블의 특정 필드 데이터 불러오기 ///////////////////////////
app.get('/api/users/cid/:type', async(req, res) => {

    let {type} = req.params;

    console.log(type);
    
    conn.query('SELECT id FROM users WHERE customer_id = ?;', type, function(err1, rows1, fields1) {
        if (err1) {
            console.log(err1);
        } else {
            console.log(rows1);
            let data_id = rows1.params;
            
            conn.query('SELECT * FROM users WHERE id = ?;', type, function(err2, rows2, fields2) {
                console.log(data_id);
                console.log(rows2);
                if (err2) {
                    res.send(err2);
                } else {
                    res.send(rows2);
                }

            });
        }

    });

    


});
    





//conn.end();
