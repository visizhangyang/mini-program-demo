const mysql = require('mysql')
const express = require('express')
const formidable = require('formidable')
const axios = require('axios')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '19950403',
    database: 'cAuth'
});

var app = express()
connection.connect()
app.post('/api/login', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var userInfo=fields.userInfo;
        if (err) {
            console.log(err)
        } else {
            var url = `https://api.weixin.qq.com/sns/jscode2session?appid=wxbeb053de6b55dda0&secret=a3ca8922801e4dbedbb430b94580f8a0&js_code=${fields.code}&grant_type=authorization_code`
            axios.get(url).then(function (resp) {
                var sql='select count(*) count from userInfo where openid=?'
                connection.query(sql,[resp.data.openid],function(err,result){
                    if(result[0].count==0){
                        var sql='insert into userInfo (openid,nickName,gender,city,province,country,avatarUrl) values(?,?,?,?,?,?,?)';
                        connection.query(sql,[resp.data.openid,userInfo.nickName,userInfo.gender,userInfo.city,userInfo.province,userInfo.country,userInfo.avatarUrl],function(err,result){
                            if(err){
                                console.log(err)
                            }else{
                                res.json({
                                    third_Session: resp.data.session_key + '_logined_' + resp.data.openid
                                })
                            }
                        })
                    }else{
                        res.json({
                            third_Session: resp.data.session_key + '_logined_' + resp.data.openid
                        })
                    }
                    
                })
                
            })
        }
    });
})
app.get('/api/getLove', function (req, res) {
    var sql='select * from love'
    connection.query(sql,function(err,result){
        if(err){
            console.log(err)
        }else{
            res.json(result)
        }
    })
})
app.post('/api/writeLove', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var params=[fields.nickName,fields.gender,fields.avatarUrl,fields.toWho
        ,fields.content,fields.watchCount,fields.commentCount,fields.thumpCount];
        var sql='insert into love (nickName,gender,avatarUrl,toWho,content,watchCount,commentCount,thumpCount) values(?,?,?,?,?,?,?,?)';
        connection.query(sql,params,function(err,result){
            if(err){
                console.log(err)
            }else{
                res.json('success')
            }
        })
    });
})
app.listen(4000)