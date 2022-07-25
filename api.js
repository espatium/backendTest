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


///////////// 특정 테이블 데이터를 모두 가져와서 특정 key 값만 출력하기 /////////////
/*
var sql = 'SELECT * FROM topic';
conn.query(sql, function(err, rows, fields) {
    if(err) {
        console.log(err);
    } else {
        for(var i=0; i<rows.length; i++) {
            console.log(rows[i].author);
        }
    }
});
*/



///////////// customer_id를 지정해서 테이블의 특정 row 데이터 불러오기 ///////////////////////////
app.get('/api/users/cid/:type', async(req, res) => {

    let {type} = req.params;

    console.log(type);
    
    // customer_id를 지정해서 id 가져오고, 그 아이디를 이용해서 특정 row 데이터 가져오기
    conn.query('SELECT id FROM users WHERE customer_id = ?;', type, function(err1, rows1, fields) {
        if (err1) {
            console.log(err1);
        } else {
            console.log(rows1);
            let data_id = rows1[0].id;
            
            conn.query('SELECT * FROM users WHERE id = ?;', data_id, function(err2, rows2, fields) {
                if (err2) {
                    res.send(err2);
                } else {
                    res.send(rows2);
                }
            });
        }
    });
});
    


///////////// DB에 값 추가하기 ///////////////////////////
app.post('/api/users/add', function(req, res) {
    var customer_id = req.body.customer_id;
    var nickname = req.body.nickname;
    var email = req.body.email;
    var join_date = req.body.join_date;
    var last_login_date = req.body.last_login_date;

    var sql = 'INSERT INTO users (customer_id, nickname, email, join_date, last_login_date) VALUES (?, ?, ?, ?, ?)';
    conn.query(sql, [customer_id, nickname, email, join_date, last_login_date], function(err, rows, fields) {
        if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            consel.log(rows);
            res.send(rows);
        }
    });
});


//conn.end();
