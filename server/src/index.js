const mysql=require('mysql')
const express=require('express')
const formidable=require('formidable')
const axios=require('axios')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '19950403',
  database : 'cAuth'
});

var app=express()
connection.connect()
app.post('/api/test',function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
    var url=`https://api.weixin.qq.com/sns/jscode2session?appid=wxbeb053de6b55dda0&secret=a3ca8922801e4dbedbb430b94580f8a0&js_code=${fields.code}&grant_type=authorization_code`
        axios.get(url).then(function(resp){
            res.json({third_Session:resp.data.session_key+'_logined_'+resp.data.openid})
        })
        
    });
})
app.post('/api/info',function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        res.send('success')
        console.log(fields)
    });
})
app.listen(4000)