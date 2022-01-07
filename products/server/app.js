const express = require('express');
const app = express();
const session = require('express-session');

app.use(session({
    secret : 'secret code',                //세션에 대한 키
    resave : false,                        //세션을 다시 저장하는 기능
    saveUninitialized : false,             //세션에 저장내역이 없더라고 다시 저장하는 기능
    cookie : {
        secure : false,
        maxAge : 1000 * 60 * 60 //쿠키 유효시간 1시간으로 설정
    }
}));

//웹서버 생성
const server = app.listen(3000, () => {
    console.log("서버시작 포트 : 3000");
});

//db접속정보
const db = {
    database : "dev",
    connectionLimit : 10,
    host : "192.168.0.62",
    user : "local-mariadb",
    password : "mariadb"
};

//db접속
const dbPool = require('mysql').createPool(db);

//로그인
app.post('/api/login', async (request, res) => {
    request.session['email'] = 'email@naver.com';
    res.send('ok');
});

//로그아웃
app.post('/api/logout', async (request, res) => {
    request.session.destroy();      //세션 초기화
    res.send('ok');
});

//sql.js ghcnf
const sql = require('./sql.js');

//이외의 것은 여기를 탐
//로그인유저 조회
app.post('/apirole/:alias', async (request, res) => {

    //로그인 권한체크
    if(!request.session.email){
        return res.status(401).send({
            error: '로그인이 필요합니다.'
        });
    }

    try{
        res.send(await req.db(request.params.alias))
    } catch(err){
        res.status(500).send({
            error: err
        });
    }
});

//일반조회(로그인없이)
app.post('/api/:alias', async (request, res) => {
    try{
        res.send(await req.db(request.params.alias))
    } catch(err){
        res.status(500).send({
            error: err
        });
    }
});

const req = { 
    async db(alias, param = [], where = '' ) {
        return new Promise((resolve, reject) => dbPool.query(sql[alias].query + where , param, (error, rows) => {
            if ( error ) {
                if ( error.code != 'ER_DUP_ENTRY')
                    console.log(error); 
                resolve({
                    error
                });
            } else resolve(rows);
        }));
     } 
};