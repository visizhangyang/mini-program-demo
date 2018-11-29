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
        var userInfo = fields.userInfo;
        if (err) {
            console.log(err)
        } else {
            var url = `https://api.weixin.qq.com/sns/jscode2session?appid=wxbeb053de6b55dda0&secret=a3ca8922801e4dbedbb430b94580f8a0&js_code=${fields.code}&grant_type=authorization_code`
            axios.get(url).then(function (resp) {
                var sql = 'select count(*) count from userInfo where openid=?'
                connection.query(sql, [resp.data.openid], function (err, result) {
                    if (result[0].count == 0) {
                        var sql = 'insert into userInfo (openid,nickName,gender,city,province,country,avatarUrl) values(?,?,?,?,?,?,?)';
                        connection.query(sql, [resp.data.openid, userInfo.nickName, userInfo.gender, userInfo.city, userInfo.province, userInfo.country, userInfo.avatarUrl], function (err, result) {
                            if (err) {
                                console.log(err)
                            } else {
                                res.json({
                                    third_Session: resp.data.session_key + '_logined_' + resp.data.openid
                                })
                            }
                        })
                    } else {
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
    var sql = 'select * from love where publish=1'
    connection.query(sql, function (err, result) {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})//获取表白信息
app.post('/api/writeLove', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var params = [fields.openid,fields.nickName, fields.gender, fields.avatarUrl, fields.toWho, fields.content,
             fields.watchCount, fields.commentCount, fields.thumpCount,fields.writeTime];
        var sql = 'insert into love (openid,nickName,gender,avatarUrl,toWho,content,watchCount,commentCount,thumpCount,writeTime) values(?,?,?,?,?,?,?,?,?,?)';
        connection.query(sql, params, function (err, result) {
            if (err) {
                console.log(err)
            } else {
                res.json('success')
            }
        })
    });
})//写表白信息
app.post('/api/addLoveVisitor', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var params = [fields.nickName, fields.avatarUrl, fields.id];
        var sql = 'insert into love_visitor (nickName,avatarUrl,id) values(?,?,?)';
        connection.query(sql, params, function (err, result) {
            if (err) {
                console.log(err)
            } else {
                res.json('success')
            }
        })
    });
})//添加访客
app.post('/api/getLoveVisitor', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var sql = 'select distinct nickName,avatarUrl from love_visitor where id=?'
        connection.query(sql, [fields.id], function (err, result) {
            if (err) {
                console.log(err)
            } else {
                res.json(result)
            }
        })
    });

})//获取访客
app.post('/api/addLoveComment', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var params = [fields.nickName, fields.avatarUrl, fields.id, fields.content, fields.commentTime];
        var sql = 'insert into love_comment (nickName,avatarUrl,id,content,commentTime) values(?,?,?,?,?)';
        connection.query(sql, params, function (err, result) {
            if (err) {
                console.log(err)
            } else {
                res.json('success')
            }
        })
    });
})//添加评论
app.post('/api/getLoveComment', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var sql = 'select * from love_comment where id=?'
        connection.query(sql, [fields.id], function (err, result) {
            if (err) {
                console.log(err)
            } else {
                res.json(result)
            }
        })
    });

})//获取评论
app.post('/api/addThumpCount',function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var sql = 'update publish_love set thumpCount=?  where id=?'
        connection.query(sql, [fields.count,fields.id], function (err, result) {
            if (err) {
                console.log(err)
            } else {
                res.json(result)
            }
        })
    });
})//点赞

app.get('/api/getAppoint', function (req, res) {
    var sql = 'select * from appoint where publish=1'
    connection.query(sql, function (err, result) {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})//获取邀约
app.post('/api/writeAppoint', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var params = [fields.openid,fields.nickName, fields.avatarUrl, fields.theme, fields.want,
             fields.detail, fields.appointTime, fields.appointLocation,fields.writeTime];
        var sql = 'insert into appoint (openid,nickName,avatarUrl,theme,want,detail,appointTime,appointLocation,writeTime) values(?,?,?,?,?,?,?,?,?)';
        connection.query(sql, params, function (err, result) {
            if (err) {
                console.log(err)
            } else {
                res.json('success')
            }
        })
    });
})//写邀约
app.post('/api/getMes', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var sql = 'select * from mes where toWho in (?,"all")'
        connection.query(sql, [fields.id], function (err, result) {
            if (err) {
                console.log(err)
            } else {
                res.json(result)
            }
        })
    });
})//获取信息
app.post('/api/addMes', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var params = [fields.nickName, fields.avatarUrl, fields.toWho, fields.content,fields.writeTime];
        var sql = 'insert into mes (nickName,avatarUrl,toWho,content,writeTime) values(?,?,?,?,?)';
        connection.query(sql, params, function (err, result) {
            if (err) {
                console.log(err)
            } else {
                res.json('success')
            }
        })
    });
})//添加信息
app.post('/api/getMyLove', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var sql = 'select * from love where openid=?'
        connection.query(sql, [fields.id], function (err, result) {
            if (err) {
                console.log(err)
            } else {
                res.json(result)
            }
        })
    });
})//获取个人表白
app.post('/api/getMyAppoint', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var sql = 'select * from appoint where openid=?'
        connection.query(sql, [fields.id], function (err, result) {
            if (err) {
                console.log(err)
            } else {
                res.json(result)
            }
        })
    });
})//获取个人邀约
app.listen(4000)