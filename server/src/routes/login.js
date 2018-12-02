const Spanner=require('./until')
const connection=require('../mysql')
const formidable = require('formidable')
var spanner=new Spanner(connection)
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
async function login(req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        var userInfo = fields.userInfo;
        if (err) {
            console.log(err)
        } else {
            var url = `https://api.weixin.qq.com/sns/jscode2session?appid=wxbeb053de6b55dda0&secret=a3ca8922801e4dbedbb430b94580f8a0&js_code=${fields.code}&grant_type=authorization_code`
            axios.get(url).then(function (resp) {
                var result=await spanner.query({
                    tableName:"userInfo",
                    fields:['count(*) count'],
                    rules:`where openid=${resp.data.openid}`
                })
                if (result[0].count == 0) {
                    await spanner.insert({
                        tableName:'userInfo',
                        fields:['openid','nickName','gender','city','province','country','avatarUrl'],
                        values:[resp.data.openid, userInfo.nickName, userInfo.gender, userInfo.city, userInfo.province, userInfo.country, userInfo.avatarUrl]
                    })
                    res.json({
                        third_Session: resp.data.session_key + '_logined_' + resp.data.openid
                    })
                } else {
                    res.json({
                        third_Session: resp.data.session_key + '_logined_' + resp.data.openid
                    })
                }
            })
        }
    });
}
module.exports=[{
    method:"post",
    path:'/api/login',
    handler:login
}]