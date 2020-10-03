var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var conn = mysql.createConnection({
  host: 'jaehwanrho.chop25b5mxib.ap-northeast-2.rds.amazonaws.com',
  user: 'jack8023',
  password: 'jack2799',
  database: 'project'
});

conn.connect();

/*
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const isLoggedin = require('../utils/isLoggedin')
*/

/*
const mysql = require('mysql2'); 
const connection = mysql.createConnection({
  host: 'jaehwanrho.chop25b5mxib.ap-northeast-2.rds.amazonaws.com',
  user: 'jack8023',
  password: 'jack2799',
  database: 'project'
})
*/

/*
const mysql = require('mysql2/promise');
let connection
mysql.createConnection({
  host: 'jaehwanrho.chop25b5mxib.ap-northeast-2.rds.amazonaws.com',
  user: 'jack8023',
  password: 'jack2799',
  database: 'project'
})
.then((results) => {
  connection = results;
})
*/


const mysql2 = require('mysql2/promise');
const pool = mysql2.createPool({
  host: 'jaehwanrho.chop25b5mxib.ap-northeast-2.rds.amazonaws.com',
  user: 'jack8023',
  password: 'jack2799',
  database: 'project'
})


/*
const pool = require('../utils/mysql');
*/

/*
const pool_1 = pool.pool;
*/

/* 
GET users listing.

router.get('/', function(req, res, next) {
  try{
    connection.query('SELECT * FROM new_table', function hello (err, results) {
      let sum = 0;
      for (let user of results) {
        sum += user.money
      }
      const avg = sum / results.length;
      connection.query('SELECT * FROM new_table WHERE money > ?', [avg], (err, results2) => {
        console.log(results2);
        res.json({ status: 200, arr: results2 });
      });
    })
  } catch (err) {
    console.log(err);
    res.json({ status: 500, msg: '알 수 없는 에러입니다!' });
  }
});
*/

/* 
promise 함수

router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM new_table', function hello (err, results) {
    .then(results => {
      console.log(results)
      res.json({ status: 200, arr: results })
    })
  }
*/

/*
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host: 'jaehwanrho.chop25b5mxib.ap-northeast-2.rds.amazonaws.com',
  user: 'jack8023',
  password: 'jack2799',
  database: 'project'
})
*/


router.get('/', async function(req, res, next) {
  try{
    const connection = await pool.getConnection();
    const [results] = await connection.query('SELECT * FROM reservation');
    connection.release();
    res.json({ status: 200, arr: results });
  } catch (err) {
    console.log(err);
    res.json({ status: 500, msg: '테이블명 오타로 인한 서버 에러입니다!' });
  }
});

router.post('/', async function(req, res, next) {
  try{
    const { name, restaurant, number_of_people, time } = req.body;
    const connection = await pool.getConnection();
    await connection.query('INSERT INTO reservation(name, restaurant, number_of_people, time) VALUES(?, ?, ?, ?)', [name, restaurant, number_of_people, time]);
    connection.release();
    res.json({ status: 201, msg: '예약이 접수되었습니다!' });
  } catch (err) {
    console.log(err);
    res.json({ status: 500, msg: '알 수 없는 문제' });
  }
});

router.get('/:id/edit', async function(req, res, next) {
  try{
    const connection = await pool.getConnection();
    const userId = req.params.id;
    const [results] = await connection.query('SELECT * FROM reservation WHERE id =?', [userId]);
    connection.release();
    res.json({ status: 200, arr: results });
  } catch (err) {
    console.log(err);
    res.json({ status: 500, msg: '테이블명 오타로 인한 서버 에러입니다!' });
  }
});

/*
router.post('/', async function(req, res, next) {
  try{
    const { name, restaurant, number_of_people, time, pwd } = req.body;
    const connection = await pool_1.getConnection();
    const pwdSalt = (await crypto.randomBytes(64)).toString('base64');
    const hashedPwd = (crypto.pbkdf2Sync(pwd, pwdSalt, 100000, 64, 'SHA512')).toString('base64')
    await connection.query('INSERT INTO reservation(name, restaurant, number_of_people, time, hashed_pwd, pwd_salt) VALUES(?, ?, ?, ?, ?, ?)', [name, restaurant, number_of_people, time, hashedPwd, pwdSalt]);
    connection.release();
    res.json({ status: 201, msg: '저장 성공!' });
  } catch (err) {
    console.log(err);
    res.json({ status: 500, msg: '알 수 없는 문제!' });
  }
});
*/

/*
router.put('/', async function(req, res, next) {
  const connection = await pool.getConnection();
  const [results] = await connection.query('UPDATE * FROM new_table')
  res.json({ status: 200, arr: results })
});
router.delet('/', async function(req, res, next) {
  const connection = await pool.getConnection();
  const [results] = await connection.query('SELECT * FROM new_table')
  res.json({ status: 200, arr: results })
});
*/

/*
const pool_2 = pool.pool_2;

router.get('/', async function(req, res, next) {
  try{
    const connection = await pool_2.getConnection();
    const [results] = await connection.query('SELECT * FROM reservation');
    connection.release();
    res.json({ status: 200, arr: results });
  } catch (err) {
    console.log(err);
    res.json({ status: 500, msg: '테이블명 오타로 인한 서버 에러입니다!' });
  }
});
*/

/*
require('dotenv').config();

router.post('/login', async function(req, res, next) {
  try{
    const { email, pwd } = req.body;
    const connection = await pool_1.getConnection();
    const [users] = await connection.query('SELECT * FROM reservation WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.json({ status: 401, msg: '없는 이메일입니다!' })
    }
    const user = users[0];
    const hashedPwd = (crypto.pbkdf2Sync(pwd, user.pwd_salt, 100000, 64, 'SHA512')).toString('base64');
    if (user.hashed_pwd !== hashedPwd) {
      return res.json({ status: 401, msg: '일치하는 않는 비밀번호에요!' });
    }
    connection.release();
    const token = jwt.sign( { id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.cookie('token', token);
    res.json({ status: 200, token: token });
  } catch (err) {
    console.log(err);
    res.json({ status: 500, msg: '알 수 없는 문제!' });
  }
});
*/

/*
// GET users/4/profile 방식으로 :id 자리에 실제 값 넣어서 호출함
router.get('/:id/profile', async function(req, res, next) {
  try{
    // 토큰은 postman에서 header 사용
    const token = req.headers.authorization;
    const user = jwt.verify(token, process.env.JWT_SECRET);
    // 위 두줄은 모든 API에서 반복되므로 따로 module로서 관리한다
    const userId = req.params.id;
    if (user.id != userId) {
      return res.json( { status: 401, msg: '넌 권한 없어!' } )
    }
    const connection = await pool_1.getConnection();
    const [results] = await connection.query('SELECT * FROM new_table WHERE id =?', [userId]);
    connection.release();
    res.json({ status: 200, arr: results });
  } catch (err) {
    console.log(err);
    res.json({ status: 500, msg: '테이블명 오타로 인한 서버 에러입니다!' });
  }
});
*/

/*
// GET users/4/profile 방식으로 :id 자리에 실제 값 넣어서 호출함
// 가운데 있는 isLoggedin을 미들웨어라 함
router.get('/:id/profile', isLoggedin, async function(req, res, next) {
  try{
    //req는 함수간 공유된 것
    const userId = req.params.id;
    if (req.userId != userId) {
      return res.json( { status: 401, msg: '넌 권한 없어!' } )
    }
    const connection = await pool_1.getConnection();
    const [results] = await connection.query('SELECT * FROM new_table WHERE id =?', [userId]);
    connection.release();
    res.json({ status: 200, arr: results });
  } catch (err) {
    console.log(err);
    res.json({ status: 500, msg: '테이블명 오타로 인한 서버 에러입니다!' });
  }
});
*/

module.exports = router;
